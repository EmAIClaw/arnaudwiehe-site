import fs from 'node:fs/promises'
import path from 'node:path'
import { marked } from 'marked'
import sanitizeHtml from 'sanitize-html'

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

function stripGeneratedSections(markdown) {
  return stripFrontmatter(markdown)
    .split('\n')
    .filter((line) => {
      const trimmed = line.trim()
      return !(
        trimmed === '---' ||
        trimmed.startsWith('**Status:**') ||
        trimmed.startsWith('**Created:**') ||
        trimmed.startsWith('**Updated:**') ||
        trimmed.startsWith('**Topic:**') ||
        trimmed.startsWith('**Agent:**') ||
        trimmed.startsWith('**Published URL:**') ||
        trimmed === '## Hashtags' ||
        trimmed === '## Performance Metrics' ||
        trimmed === '## Related Content'
      )
    })
    .join('\n')
}

function markdownToHtml(markdown) {
  const rendered = marked.parse(stripGeneratedSections(markdown), {
    async: false,
    gfm: true,
    breaks: false,
  })

  return sanitizeHtml(rendered, {
    allowedTags: [
      'p', 'br', 'strong', 'em', 'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'blockquote', 'a', 'code', 'pre'
    ],
    allowedAttributes: {
      a: ['href'],
    },
    allowedSchemes: ['http', 'https', 'mailto'],
    allowProtocolRelative: false,
    transformTags: {
      a: sanitizeHtml.simpleTransform('a', { rel: 'noopener noreferrer' }),
    },
  }).replace(/^<h1>.*?<\/h1>\s*/s, '').trim()
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
      const extensions = ['.jpg', '.jpeg', '.png', '.svg', '.webp']
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

    const html = markdownToHtml(articleRaw)

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
      content: html,
    })
  }

  return articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

async function main() {
  const articles = await collectArticles()

  const fileContents = `// AUTO-GENERATED by scripts/generate-articles-data.mjs
// Do not edit manually. Update memory/content/published/* and re-run generation.

export interface Article {
  slug: string
  title: string
  subtitle: string
  date: string
  dateFormatted: string
  category: string
  tags: string[]
  readingTime: string
  excerpt: string
  content: string
  linkedinUrl: string
  author: string
  authorBio: string
  featured: boolean
  heroImage?: string
}

export const articles: Article[] = [
${articles.map(article => `  {
    slug: ${JSON.stringify(article.slug)},
    title: ${JSON.stringify(article.title)},
    subtitle: ${JSON.stringify(article.subtitle)},
    date: ${JSON.stringify(article.date)},
    dateFormatted: ${JSON.stringify(article.dateFormatted)},
    category: ${JSON.stringify(article.category)},
    tags: ${JSON.stringify(article.tags)},
    readingTime: ${JSON.stringify(article.readingTime)},
    featured: ${article.featured},
    ${article.heroImage ? `heroImage: ${JSON.stringify(article.heroImage)},` : ''}
    linkedinUrl: ${JSON.stringify(article.linkedinUrl)},
    author: ${JSON.stringify(article.author)},
    authorBio: ${JSON.stringify(article.authorBio)},
    excerpt: ${JSON.stringify(article.excerpt)},
    content: \
\`${escapeTemplateLiteral(article.content)}\`,
  }`).join(',\n')}
]
`

  await fs.writeFile(outputPath, fileContents)
  console.log(`Generated ${path.relative(process.cwd(), outputPath)} with ${articles.length} articles.`)
}

main().catch(error => {
  console.error(error)
  process.exit(1)
})
