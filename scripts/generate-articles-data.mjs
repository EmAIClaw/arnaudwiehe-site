import fs from 'node:fs/promises'
import path from 'node:path'

const workspaceRoot = path.resolve(process.cwd(), '..', '..', '..')
const publishedRoot = path.join(workspaceRoot, 'memory', 'content', 'published')
const outputPath = path.join(process.cwd(), 'app', 'articles', 'data.generated.ts')
const websiteImagesDir = path.join(process.cwd(), 'public', 'images', 'articles')

const fallbackAuthor = 'Arnaud Wiehe'
const fallbackAuthorBio = 'Author of “Emerging Tech, Emerging Threats” and “AI Governance Guide”.'

function escapeTemplateLiteral(value) {
  return value
    .replace(/\\/g, '\\\\')
    .replace(/`/g, '\\`')
    .replace(/\$\{/g, '\\${')
}

function titleCaseWord(part) {
  const lower = part.toLowerCase()
  if (['ai', 'api', 'cve', 'cisso', 'llm', 'llms', 'gdpr'].includes(lower)) {
    return lower.toUpperCase()
  }
  return lower.charAt(0).toUpperCase() + lower.slice(1)
}

function toDisplayCategory(value) {
  if (!value) return 'Article'
  return value
    .split(/[-_]/g)
    .filter(Boolean)
    .map(titleCaseWord)
    .join(' ')
}

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  })
}

function normalizeTag(tag) {
  return tag
    .split(/[-_]/g)
    .filter(Boolean)
    .map(titleCaseWord)
    .join(' ')
}

function stripFrontmatter(markdown) {
  if (!markdown.startsWith('---\n')) return markdown
  const end = markdown.indexOf('\n---\n', 4)
  if (end === -1) return markdown
  return markdown.slice(end + 5)
}

function markdownToHtml(markdown) {
  const lines = stripFrontmatter(markdown).replace(/\r\n/g, '\n').split('\n')
  const blocks = []
  let paragraph = []
  let list = []

  const flushParagraph = () => {
    if (!paragraph.length) return
    blocks.push(`<p>${inline(paragraph.join(' '))}</p>`)
    paragraph = []
  }

  const flushList = () => {
    if (!list.length) return
    blocks.push(`<ul>${list.map(item => `<li>${inline(item)}</li>`).join('')}</ul>`)
    list = []
  }

  const inline = (text) => {
    const escaped = text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')

    return escaped
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/\[(.+?)\]\((.+?)\)/g, (_, text, url) => {
        const safe = url.trim().toLowerCase()
        if (safe.startsWith('https:') || safe.startsWith('http:') || safe.startsWith('mailto:') || safe.startsWith('/')) {
          return `<a href="${url}">${text}</a>`
        }
        return `[${text}](${url})`
      })
  }

  for (const rawLine of lines) {
    const line = rawLine.trim()

    if (!line) {
      flushParagraph()
      flushList()
      continue
    }

    if (line === '---' || line.startsWith('**Status:**') || line.startsWith('**Created:**') || line.startsWith('**Updated:**') || line.startsWith('**Topic:**') || line.startsWith('**Agent:**') || line.startsWith('**Published URL:**') || line === '## Hashtags' || line === '## Performance Metrics' || line === '## Related Content') {
      flushParagraph()
      flushList()
      continue
    }

    if (line.startsWith('# ')) {
      flushParagraph()
      flushList()
      blocks.push(`<h1>${inline(line.slice(2).trim())}</h1>`)
      continue
    }

    if (line.startsWith('## ')) {
      flushParagraph()
      flushList()
      const heading = line.slice(3).trim()
      if (heading === 'Full Article') continue
      blocks.push(`<h2>${inline(heading)}</h2>`)
      continue
    }

    if (line.startsWith('### ')) {
      flushParagraph()
      flushList()
      blocks.push(`<h3>${inline(line.slice(4).trim())}</h3>`)
      continue
    }

    if (line.startsWith('- ')) {
      flushParagraph()
      list.push(line.slice(2).trim())
      continue
    }

    if (line.startsWith('#')) {
      flushParagraph()
      flushList()
      continue
    }

    paragraph.push(line)
  }

  flushParagraph()
  flushList()

  return blocks
    .join('\n\n')
    .replace(/<p><strong>(.+?)<\/strong><\/p>/g, '<p><strong>$1</strong></p>')
}

async function fileExists(filePath) {
  try {
    await fs.access(filePath)
    return true
  } catch {
    return false
  }
}

async function collectArticles() {
  const entries = await fs.readdir(publishedRoot, { withFileTypes: true })
  const articleDirs = entries
    .filter(entry => entry.isDirectory() && /^\d{4}-\d{2}-\d{2}-/.test(entry.name))
    .map(entry => entry.name)
    .sort()

  const articles = []

  for (const dirName of articleDirs) {
    const articleDir = path.join(publishedRoot, dirName)
    const metadataPath = path.join(articleDir, 'metadata.json')
    const articlePath = path.join(articleDir, 'article.md')
    const excerptPath = path.join(articleDir, 'excerpt.txt')

    const [metadataRaw, articleRaw, excerptRaw] = await Promise.all([
      fs.readFile(metadataPath, 'utf8'),
      fs.readFile(articlePath, 'utf8'),
      fs.readFile(excerptPath, 'utf8'),
    ])

    const metadata = JSON.parse(metadataRaw)
    if (metadata.status && metadata.status !== 'published') continue

    const slug = metadata.slug
    const publishDate = metadata.publishDate || `${dirName.slice(0, 10)}T00:00:00Z`
    const date = publishDate.slice(0, 10)
    const heroCandidates = [
      slug,
      slug.replace(/-\d+-cves-\d{4}$/, ''),
    ].filter((value, index, array) => array.indexOf(value) === index)

    let heroImage = null
    for (const candidate of heroCandidates) {
      // Check for common image formats: jpg/jpeg, png, svg
      const extensions = ['.jpg', '.jpeg', '.png', '.svg']
      for (const ext of extensions) {
        if (await fileExists(path.join(websiteImagesDir, `${candidate}${ext}`))) {
          heroImage = `/images/articles/${candidate}${ext}`
          break
        }
      }
      if (heroImage) break
    }
    const readingTime = metadata?.seo?.readingTime
      ? metadata.seo.readingTime.replace(/minutes?/i, 'min read')
      : '5 min read'

    let html = markdownToHtml(articleRaw)
    html = html.replace(/^<h1>.*?<\/h1>\s*/s, '')

    articles.push({
      slug,
      title: metadata.title,
      subtitle: metadata.subtitle || '',
      date,
      dateFormatted: formatDate(date),
      category: toDisplayCategory(metadata.category),
      tags: Array.isArray(metadata.tags) ? metadata.tags.map(normalizeTag) : [],
      readingTime,
      featured: Boolean(metadata?.seo?.featured),
      heroImage,
      linkedinUrl: metadata.linkedinUrl || '',
      author: metadata.author || fallbackAuthor,
      authorBio: metadata.authorBio || fallbackAuthorBio,
      excerpt: excerptRaw.trim(),
      content: html.trim(),
    })
  }

  return articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

async function main() {
  const articles = await collectArticles()

  const fileContents = `// AUTO-GENERATED by scripts/generate-articles-data.mjs\n// Do not edit manually. Update memory/content/published/* and re-run generation.\n\nexport interface Article {\n  slug: string\n  title: string\n  subtitle: string\n  date: string\n  dateFormatted: string\n  category: string\n  tags: string[]\n  readingTime: string\n  excerpt: string\n  content: string\n  linkedinUrl: string\n  author: string\n  authorBio: string\n  featured: boolean\n  heroImage?: string\n}\n\nexport const articles: Article[] = [\n${articles.map(article => `  {\n    slug: ${JSON.stringify(article.slug)},\n    title: ${JSON.stringify(article.title)},\n    subtitle: ${JSON.stringify(article.subtitle)},\n    date: ${JSON.stringify(article.date)},\n    dateFormatted: ${JSON.stringify(article.dateFormatted)},\n    category: ${JSON.stringify(article.category)},\n    tags: ${JSON.stringify(article.tags)},\n    readingTime: ${JSON.stringify(article.readingTime)},\n    featured: ${article.featured},\n    ${article.heroImage ? `heroImage: ${JSON.stringify(article.heroImage)},` : ''}\n    linkedinUrl: ${JSON.stringify(article.linkedinUrl)},\n    author: ${JSON.stringify(article.author)},\n    authorBio: ${JSON.stringify(article.authorBio)},\n    excerpt: ${JSON.stringify(article.excerpt)},\n    content: \`\n${escapeTemplateLiteral(article.content)}\n    \`,\n  }`).join(',\n')}\n]\n` 

  await fs.writeFile(outputPath, fileContents)
  console.log(`Generated ${path.relative(process.cwd(), outputPath)} with ${articles.length} articles.`)
}

main().catch(error => {
  console.error(error)
  process.exit(1)
})
