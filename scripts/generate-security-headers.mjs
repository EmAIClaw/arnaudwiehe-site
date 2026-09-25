import { readdir, readFile, writeFile } from 'node:fs/promises'
import { join, relative } from 'node:path'
import { createHash } from 'node:crypto'

const root = 'out'
const base = (await readFile('public/_headers', 'utf8')).trim()
const policy = base.match(/Content-Security-Policy: (.+)/)[1]
const blocks = [base, '/_next/static/*\n  Cache-Control: public, max-age=31536000, immutable']
async function walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) await walk(path)
    else if (entry.name.endsWith('.html')) {
      const html = await readFile(path, 'utf8')
      const hashes = [...new Set([...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)]
        .filter(m => !/\bsrc\s*=/i.test(m[1]) && m[2])
        .map(m => `'sha256-${createHash('sha256').update(m[2]).digest('base64')}'`))]
      const strict = policy.replace(/script-src [^;]+;/, `script-src 'self' ${hashes.join(' ')}; script-src-attr 'none';`)
      const fileRoute = '/' + relative(root, path).split('\\').join('/')
      const route = fileRoute.replace(/index\.html$/, '')
      // Keep enforcement unchanged; evaluate the tighter policy in report-only first.
      blocks.push(`${route}\n  Content-Security-Policy-Report-Only: ${strict}`)
      if (route !== fileRoute) blocks.push(`${fileRoute}\n  Content-Security-Policy-Report-Only: ${strict}`)
      if (Buffer.byteLength(strict) > 7500) throw new Error(`CSP header exceeds conservative budget: ${route}`)
    }
  }
}
await walk(root)
await writeFile(join(root, '_headers'), blocks.join('\n\n') + '\n')
console.log(`Generated security headers: ${blocks.length - 2} page rules; strict CSP staged in report-only.`)
