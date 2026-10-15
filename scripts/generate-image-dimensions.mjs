import { readdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const publicDir = path.join(root, 'public')

async function collect(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  const files = await Promise.all(entries.map(entry => entry.isDirectory()
    ? collect(path.join(dir, entry.name))
    : /\.(avif|gif|jpe?g|png|svg|webp)$/i.test(entry.name) ? [path.join(dir, entry.name)] : []))
  return files.flat()
}

const dimensions = {}
for (const file of (await collect(path.join(publicDir, 'images'))).sort()) {
  const { width, height } = await sharp(file).metadata()
  if (!width || !height) throw new Error(`Cannot measure sharing image: ${file}`)
  dimensions[`/${path.relative(publicDir, file).split(path.sep).join('/')}`] = { width, height }
}
await writeFile(path.join(root, 'app/image-dimensions.generated.json'), `${JSON.stringify(dimensions, null, 2)}\n`)
console.log(`Measured ${Object.keys(dimensions).length} image files for sharing metadata`)
