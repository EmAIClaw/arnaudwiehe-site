import sharp from 'sharp'
import { mkdir } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'

const root = new URL('../', import.meta.url)
await mkdir(new URL('public/images/sharing/', root), { recursive: true })
for (const slug of ['ai-governance-cybersecurity', 'boards-cyber-agenda-2026']) {
  const source = fileURLToPath(new URL(`public/images/articles/${slug}.svg`, root))
  const target = fileURLToPath(new URL(`public/images/sharing/${slug}.png`, root))
  // Rasterize at the original dimensions; no resizing, cropping or redesign.
  await sharp(source).png().toFile(target)
  const original = await sharp(source).ensureAlpha().raw().toBuffer()
  const rendered = await sharp(target).ensureAlpha().raw().toBuffer()
  if (!original.equals(rendered)) throw new Error(`Rasterization verification failed: ${slug}`)
  const { width, height, format } = await sharp(target).metadata()
  console.log(`${slug}: ${format}, ${width} × ${height}; pixels match source rasterization`)
}
