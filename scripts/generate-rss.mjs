import fs from 'node:fs/promises'
import path from 'node:path'

const BASE_URL = 'https://arnaudwiehe.com'
const SITE_TITLE = 'Arnaud Wiehe | AI & Emerging Tech Strategist'
const SITE_DESC = 'Cybersecurity executive, author, and international speaker specializing in AI, emerging technologies, and digital risk.'

const workspaceRoot = path.resolve(process.cwd(), '..', '..', '..')
const publishedRoot = path.join(workspaceRoot, 'memory', 'content', 'published')
const rssPath = path.resolve('public/rss.xml')
const atomPath = path.resolve('public/atom.xml')

async function extractArticles() {
  let dirs
  try {
    const entries = await fs.readdir(publishedRoot, { withFileTypes: true })
    dirs = entries
      .filter(e => e.isDirectory() && /^\d{4}-\d{2}-\d{2}-/.test(e.name))
      .map(e => e.name)
      .sort()
      .reverse()
  } catch {
    console.log('Published directory not found, skipping RSS.')
    return []
  }

  const articles = []
  for (const dirName of dirs) {
    const metadataPath = path.join(publishedRoot, dirName, 'metadata.json')
    const excerptPath = path.join(publishedRoot, dirName, 'excerpt.txt')
    try {
      const [metaRaw, excerptRaw] = await Promise.all([
        fs.readFile(metadataPath, 'utf8'),
        fs.readFile(excerptPath, 'utf8'),
      ])
      const meta = JSON.parse(metaRaw)
      if (meta.status && meta.status !== 'published') continue
      articles.push({
        slug: meta.slug,
        title: meta.title,
        date: meta.publishDate?.slice(0, 10) || dirName.slice(0, 10),
        excerpt: excerptRaw.trim(),
        category: meta.category || 'Article',
      })
    } catch {
      // Skip broken articles
    }
  }
  return articles
}

function escapeXml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;')
}

function rfc822Date(dateStr) {
  const d = new Date(dateStr + 'T00:00:00Z')
  return isNaN(d.getTime()) ? new Date().toUTCString() : d.toUTCString()
}

function isoDate(dateStr) {
  const d = new Date(dateStr + 'T00:00:00Z')
  return isNaN(d.getTime()) ? new Date().toISOString() : d.toISOString()
}

async function main() {
  const articles = await extractArticles()
  if (articles.length === 0) {
    console.log('No published articles found — skipping RSS generation.')
    await fs.writeFile(rssPath, '<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>' + escapeXml(SITE_TITLE) + '</title><link>' + BASE_URL + '</link><description>' + escapeXml(SITE_DESC) + '</description></channel></rss>')
    return
  }

  const rssItems = articles.map(a => `    <item>
      <title>${escapeXml(a.title)}</title>
      <link>${BASE_URL}/articles/${a.slug}/</link>
      <guid isPermaLink="true">${BASE_URL}/articles/${a.slug}/</guid>
      <pubDate>${rfc822Date(a.date)}</pubDate>
      <description>${escapeXml(a.excerpt)}</description>
      <category>${escapeXml(a.category)}</category>
    </item>`).join('\n')

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_TITLE)}</title>
    <link>${BASE_URL}</link>
    <description>${escapeXml(SITE_DESC)}</description>
    <language>en</language>
    <lastBuildDate>${rfc822Date(new Date().toISOString().slice(0, 10))}</lastBuildDate>
    <atom:link href="${BASE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
${rssItems}
  </channel>
</rss>`

  const atomItems = articles.map(a => `    <entry>
      <title>${escapeXml(a.title)}</title>
      <link href="${BASE_URL}/articles/${a.slug}/" rel="alternate" type="text/html"/>
      <id>${BASE_URL}/articles/${a.slug}/</id>
      <published>${isoDate(a.date)}</published>
      <updated>${isoDate(a.date)}</updated>
      <summary type="html">${escapeXml(a.excerpt)}</summary>
      <category term="${escapeXml(a.category)}"/>
    </entry>`).join('\n')

  const atom = `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>${escapeXml(SITE_TITLE)}</title>
  <link href="${BASE_URL}" rel="alternate" type="text/html"/>
  <link href="${BASE_URL}/atom.xml" rel="self" type="application/atom+xml"/>
  <id>${BASE_URL}/</id>
  <updated>${isoDate(new Date().toISOString().slice(0, 10))}</updated>
  <subtitle>${escapeXml(SITE_DESC)}</subtitle>
${atomItems}
</feed>`

  await fs.writeFile(rssPath, rss)
  await fs.writeFile(atomPath, atom)
  console.log(`RSS feed generated: ${rssPath} (${articles.length} articles)`)
  console.log(`Atom feed generated: ${atomPath} (${articles.length} articles)`)
}

main().catch(error => {
  console.error(error)
  process.exit(1)
})
