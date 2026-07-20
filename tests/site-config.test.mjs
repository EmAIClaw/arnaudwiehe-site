import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

const root = new URL('../', import.meta.url)

async function read(relativePath) {
  return readFile(new URL(relativePath, root), 'utf8')
}

test('WebSite structured data does not advertise a nonexistent search endpoint', async () => {
  const layout = await read('app/layout.tsx')

  assert.doesNotMatch(layout, /SearchAction/)
  assert.doesNotMatch(layout, /search_term_string/)
})

test('sitemap generator includes the public AI assessment page', async () => {
  const generator = await read('scripts/generate-sitemap.mjs')

  assert.match(generator, /url:\s*['"]\/ai-assessment\/['"]/)
})

test('article sitemap entries use article publication dates instead of a shared file timestamp', async () => {
  const generator = await read('scripts/generate-sitemap.mjs')

  assert.match(generator, /article\.date/)
  assert.doesNotMatch(generator, /const articleLastmod = fileLastModified/)
})

test('package manifest excludes unused build dependencies', async () => {
  const manifest = JSON.parse(await read('package.json'))
  const dependencies = { ...manifest.dependencies, ...manifest.devDependencies }

  for (const packageName of ['@netlify/blobs', 'jsdom', 'tailwindcss', 'autoprefixer', 'postcss']) {
    assert.equal(dependencies[packageName], undefined, `${packageName} should not be installed`)
  }

  assert.equal(manifest.overrides?.postcss, '8.5.19')
})

test('CSP config sends legacy and modern reports to the collector', async () => {
  for (const configPath of ['netlify.toml', 'public/_headers']) {
    const config = await read(configPath)

    assert.match(config, /report-uri \/api\/csp-report/)
    assert.match(config, /report-to csp-endpoint/)
    assert.match(config, /Reporting-Endpoints/)
    assert.match(config, /csp-endpoint=.*https:\/\/arnaudwiehe\.com\/api\/csp-report/)
  }
})

test('llms.txt links directly to curated articles and the assessment', async () => {
  const llms = await read('public/llms.txt')
  const directArticleLinks = llms.match(/https:\/\/arnaudwiehe\.com\/articles\/[^\s)]+\//g) || []

  assert.ok(new Set(directArticleLinks).size >= 5, 'expected at least five direct article links')
  assert.match(llms, /https:\/\/arnaudwiehe\.com\/ai-assessment\//)
})

test('obsolete OpenAI plugin manifest is not published', async () => {
  await assert.rejects(read('public/.well-known/ai-plugin.json'), { code: 'ENOENT' })
})

test('backup and legacy artifacts are removed and ignored', async () => {
  const gitignore = await read('.gitignore')

  const ignoredPatterns = new Set(gitignore.split(/\r?\n/))
  for (const pattern of ['*.bak', '*.bak-precompress', '.devserver.pid', '.port', '.hermes/']) {
    assert.ok(ignoredPatterns.has(pattern), `${pattern} should be ignored`)
  }

  for (const artifact of [
    'public/_headers.bak',
    'index.html',
    'assets/photos/speaking/gitex-dubai-2025-1.jpg.bak-precompress',
    'assets/photos/speaking/gitex-dubai-2025-2.jpg.bak-precompress',
    'assets/photos/speaking/world-summit-ai-2023.jpg.bak-precompress',
  ]) {
    await assert.rejects(read(artifact), { code: 'ENOENT' })
  }
})

test('package scripts expose repeatable tests and zero-warning linting', async () => {
  const manifest = JSON.parse(await read('package.json'))

  assert.equal(manifest.scripts.test, 'node --disable-warning=MODULE_TYPELESS_PACKAGE_JSON --test tests/*.test.mjs')
  assert.equal(manifest.scripts.lint, 'eslint . --max-warnings=0')
  await read('eslint.config.mjs')
})
