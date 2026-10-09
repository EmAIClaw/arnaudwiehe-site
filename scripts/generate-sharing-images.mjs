import sharp from 'sharp'
import fs from 'node:fs/promises'

// Sharing-only compositions. Approved originals remain unchanged and uncropped.
const dir = 'public/images/sharing'
await fs.mkdir(dir, { recursive: true })
const cards = [
  { name: 'homepage', source: 'public/images/og-default.webp', label: 'AUTHOR · SPEAKER · TECHNOLOGY LEADER', lines: ['Arnaud', 'Wiehe'], sub: ['AI governance. Cybersecurity.', 'Emerging technology.'], width: 360, height: 540, left: 780, top: 45 },
  { name: 'ai-governance-for-leaders', source: 'public/images/books/ai-governance-for-leaders-display.webp', label: 'THE LATEST BOOK', lines: ['AI Governance', 'for Leaders'], sub: ['Arnaud Wiehe'], width: 432, height: 540, left: 708, top: 45 },
  { name: 'export-control-ai-models', source: 'public/images/articles/export-control-ai-models.webp', label: 'WRITING · AI GOVERNANCE', lines: ['Export controls', 'and AI models'], sub: ['Analysis by Arnaud Wiehe'], width: 580, height: 435, left: 580, top: 98 },
]
for (const c of cards) {
  const text = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg"><rect width="1200" height="630" fill="#FAF8F5"/><path d="M60 130 H150" stroke="#806008" stroke-width="4"/><text x="60" y="100" font-family="Arial" font-size="16" letter-spacing="2" fill="#806008">${c.label}</text>${c.lines.map((s,i)=>`<text x="60" y="${230+i*72}" font-family="Georgia" font-size="${c.name==='homepage'?70:54}" fill="#2A2420">${s}</text>`).join('')}${c.sub.map((s,i)=>`<text x="60" y="${390+i*34}" font-family="Arial" font-size="24" fill="#6B635D">${s}</text>`).join('')}<text x="60" y="570" font-family="Arial" font-size="20" fill="#806008">arnaudwiehe.com</text></svg>`
  const art = await sharp(c.source).resize(c.width,c.height,{fit:'inside'}).png().toBuffer()
  await sharp(Buffer.from(text)).composite([{input:art,left:c.left,top:c.top}]).png().toFile(`${dir}/${c.name}.png`)
  const m=await sharp(`${dir}/${c.name}.png`).metadata()
  if(m.width!==1200||m.height!==630)throw Error('Incorrect sharing dimensions')
  console.log(`${c.name}: ${m.width} × ${m.height}`)
}
