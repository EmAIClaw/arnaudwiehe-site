import { execSync } from 'child_process'
import fs from 'fs'

const BASE_URL = 'https://arnaudwiehe.com'

// Extract slugs from data files
function extractSlugs(filePath, pattern) {
  const content = fs.readFileSync(filePath, 'utf-8')
  return [...content.matchAll(pattern)].map(m => m[1])
}

const articleSlugs = extractSlugs(
  'app/articles/data.generated.ts',
  /slug:\s*['"]([^'"]+)['"]/g
)

const speakingSlugs = extractSlugs(
  'app/speaking/data.ts',
  /slug:\s*['"]([^'"]+)['"]/g
)

const staticPages = [
  { url: '/', priority: 1.0, changefreq: 'monthly' },
  { url: '/books', priority: 0.8, changefreq: 'monthly' },
  { url: '/speaking', priority: 0.8, changefreq: 'monthly' },
  { url: '/articles', priority: 0.8, changefreq: 'weekly' },
  { url: '/music', priority: 0.7, changefreq: 'monthly' },
]

const today = new Date().toISOString().split('T')[0]

const urls = [
  ...staticPages.map(p => `  <url>
    <loc>${BASE_URL}${p.url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`),
  ...articleSlugs.map(slug => `  <url>
    <loc>${BASE_URL}/articles/${slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.6</priority>
  </url>`),
  ...speakingSlugs.map(slug => `  <url>
    <loc>${BASE_URL}/speaking/${slug}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.7</priority>
  </url>`),
]

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>`

fs.writeFileSync('public/sitemap.xml', sitemap)
console.log(`Sitemap generated with ${urls.length} URLs`)