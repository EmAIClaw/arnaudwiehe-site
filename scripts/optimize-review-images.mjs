// Explicit, local-only image maintenance. Original bytes stay outside public/.
import { mkdir, access, copyFile, writeFile, stat, rename } from 'node:fs/promises'
import sharp from 'sharp'

const slugs = ['future-crimes', 'prompt-injection-runtime-controls', 'ai-induced-misconfiguration', 'ai-vendor-questionnaire-obsolete', 'ai-governance-is-about-visibility', 'agent-governance-kill-switch', 'export-control-ai-models', 'ai-agent-debt']
const backup = '.hermes/image-originals'
await mkdir(backup, { recursive: true })
await mkdir('content', { recursive: true })
const exists = path => access(path).then(() => true, () => false)
const manifest = {}
const measurements = []
for (const slug of slugs) {
  const extension = slug === 'export-control-ai-models' ? 'png' : 'webp'
  const original = `${backup}/${slug}.${extension}`
  if (!await exists(original)) await copyFile(`public/images/articles/${slug}.${extension}`, original)
  const destination = `public/images/articles/${slug}.webp`
  const { info } = await sharp(original).rotate().resize({ width: 1280, withoutEnlargement: true }).webp({ quality: 78, effort: 6 }).toBuffer({ resolveWithObject: true })
  await sharp(original).rotate().resize({ width: 1280, withoutEnlargement: true }).webp({ quality: 78, effort: 6 }).toFile(destination)
  for (const width of [640, 960]) {
    await sharp(original).rotate().resize({ width, withoutEnlargement: true }).webp({ quality: 78, effort: 6 }).toFile(`public/images/articles/${slug}-${width}.webp`)
  }
  const url = `/images/articles/${slug}.webp`
  manifest[url] = { width: info.width, height: info.height, srcSet: `/images/articles/${slug}-640.webp 640w, /images/articles/${slug}-960.webp 960w, ${url} ${info.width}w` }
  measurements.push({ slug, originalBytes: (await stat(original)).size, optimizedBytes: (await stat(destination)).size, width: info.width, height: info.height })
  if (extension === 'png' && await exists(`public/images/articles/${slug}.png`)) {
    await rename(`public/images/articles/${slug}.png`, `${backup}/${slug}.retired.png`)
  }
}
await writeFile('content/article-images.json', JSON.stringify(manifest, null, 2) + '\n')
await writeFile(`${backup}/measurements.json`, JSON.stringify(measurements, null, 2) + '\n')
console.table(measurements)
