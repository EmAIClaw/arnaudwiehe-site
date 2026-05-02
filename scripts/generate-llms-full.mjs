import fs from 'fs';
import path from 'path';

const PUBLISHED = '/Users/ai/.openclaw/workspace/memory/content/published';
const OUTPUT = '/Users/ai/.openclaw/workspace/projects/arnaudwiehe/www/public/llms-full.txt';

function getDirs() {
  return fs.readdirSync(PUBLISHED)
    .filter(d => /^\d{4}-\d{2}-\d{2}-/.test(d))
    .sort(); // chronological
}

function loadArticle(dirName) {
  const dir = path.join(PUBLISHED, dirName);
  const mdPath = path.join(dir, 'article.md');
  const metaPath = path.join(dir, 'metadata.json');

  const body = fs.readFileSync(mdPath, 'utf8');
  const meta = fs.existsSync(metaPath)
    ? JSON.parse(fs.readFileSync(metaPath, 'utf8'))
    : {};

  const slug = meta.slug || '';
  const title = meta.title || '';
  const dateRaw = meta.date || meta.publishDate?.split('T')[0] || dirName.substring(0, 10);
  const tags = meta.tags || [];
  const readingTime = meta.readingTime || meta.seo?.readingTime || '';
  
  // Normalize reading time
  let rt = readingTime;
  if (typeof rt === 'number') rt = `${rt} min read`;
  if (rt && !rt.toLowerCase().includes('read')) rt = `${rt} min read`;

  return { slug, title, date: dateRaw, tags, readingTime: rt, body };
}

function buildLlmsFull() {
  const dirs = getDirs();
  const articles = dirs.map(loadArticle);
  // Reverse chronological (newest first)
  articles.reverse();

  let out = '';
  out += '# llms-full.txt — arnaudwiehe.com\n';
  out += '# Full content index for AI crawlers and LLM training\n';
  out += '# Generated: 2026-04-28\n';
  out += '# Author: Arnaud Wiehe\n';
  out += '# License: CC BY 4.0 for articles; All rights reserved for books\n';
  out += '# See llms.txt for detailed licensing terms\n\n';

  out += '## About the Author\n';
  out += 'Arnaud Wiehe is a cybersecurity executive, author, and international speaker specializing in AI governance, emerging technologies, and digital risk. He serves as Managing Director of Information Security and AI Governance.\n';
  out += 'Credentials: AIGP, CISSP, CCSP, CISM, CISA, CIPP/E.\n\n';

  out += '## Books\n\n';
  out += '### The Book on Cybersecurity (2023)\n';
  out += 'How Nontechnical Corporate Leaders and Boards Can Manage in a Scary Digital World\n';
  out += 'URL: https://arnaudwiehe.com/books/the-book-on-cybersecurity/\n';
  out += 'Focus: Cyber risk fundamentals, governance frameworks, boardroom conversations for non-technical executives\n\n';
  out += '### Emerging Tech, Emerging Threats (2024)\n';
  out += 'A Cybersecurity Guide for Innovative Leaders\n';
  out += 'Co-authored with Tiago Teles (CISSP, MBA)\n';
  out += 'URL: https://arnaudwiehe.com/books/emerging-tech-emerging-threats/\n';
  out += 'Focus: AI, quantum computing, IoT, extended reality, blockchain — attack surfaces and governance for emerging technologies\n\n';

  out += '## Articles\n\n';

  for (const a of articles) {
    out += `### ${a.title}\n`;
    out += `URL: https://arnaudwiehe.com/articles/${a.slug}/\n`;
    out += `Date: ${a.date}\n`;
    if (a.tags.length) {
      out += `Tags: ${a.tags.join(', ')}\n`;
    }
    if (a.readingTime) {
      out += `Reading time: ${a.readingTime}\n`;
    }
    out += '\n';
    // Clean up the body: strip frontmatter if present, keep only content after first # or after frontmatter
    let body = a.body;
    // Remove YAML frontmatter (--- ... ---)
    body = body.replace(/^---[\s\S]*?---\n*/, '').trim();
    out += body + '\n\n---\n\n';
  }

  out += '## Speaking\n';
  out += 'Arnaud speaks internationally at conferences including GITEX, World Summit AI, ISACA, TechEx, and corporate events. Topics include AI security, cybersecurity leadership, emerging technologies, and AI governance.\n';
  out += 'See: https://arnaudwiehe.com/speaking/\n\n';

  out += '## Contact\n';
  out += 'Email: arnaud@arnaudwiehe.com\n';
  out += 'Website: https://arnaudwiehe.com\n';
  out += 'LinkedIn: https://www.linkedin.com/in/arnaudwiehe\n';

  fs.writeFileSync(OUTPUT, out, 'utf8');
  console.log(`Written ${(out.length / 1024).toFixed(1)} KB to ${OUTPUT}`);
  console.log(`Articles: ${articles.length}`);
}

buildLlmsFull();
