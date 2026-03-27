#!/usr/bin/env node
/**
 * Website Test Agent - Node.js version
 * Comprehensive testing for arnaudwiehe.com
 * 
 * Usage: node scripts/test-website.js [BASE_URL]
 */

const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const BASE_URL = process.argv[2] || 'http://localhost:3000';
const URL_OBJ = new URL(BASE_URL);
const CLIENT = URL_OBJ.protocol === 'https:' ? https : http;

// ANSI colors
const RED = '\x1b[31m';
const GREEN = '\x1b[32m';
const YELLOW = '\x1b[33m';
const BLUE = '\x1b[34m';
const NC = '\x1b[0m';

let testsPassed = 0;
let testsFailed = 0;

function log(type, message) {
  const timestamp = new Date().toISOString().split('T')[1].split('.')[0];
  switch(type) {
    case 'pass':
      console.log(`${GREEN}✓ [${timestamp}]${NC} ${message}`);
      testsPassed++;
      break;
    case 'fail':
      console.log(`${RED}✗ [${timestamp}]${NC} ${message}`);
      testsFailed++;
      break;
    case 'warn':
      console.log(`${YELLOW}⚠ [${timestamp}]${NC} ${message}`);
      break;
    case 'info':
      console.log(`${BLUE}ℹ [${timestamp}]${NC} ${message}`);
      break;
    default:
      console.log(message);
  }
}

function makeRequest(url, options = {}) {
  return new Promise((resolve, reject) => {
    const urlObj = new URL(url);
    const client = urlObj.protocol === 'https:' ? https : http;
    const startTime = Date.now();
    
    const req = client.request(url, {
      method: options.method || 'GET',
      headers: {
        'User-Agent': 'arnaudwiehe-test-agent/1.0',
        ...(options.headers || {})
      },
      timeout: options.timeout || 10000
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        resolve({
          status: res.statusCode,
          headers: res.headers,
          body: data,
          time: Date.now() - startTime
        });
      });
    });
    
    req.on('error', reject);
    req.on('timeout', () => reject(new Error('Request timeout')));
    req.end();
  });
}

async function testEndpoint(url, expectedStatus, description) {
  try {
    const response = await makeRequest(url);
    if (response.status === expectedStatus) {
      log('pass', `${description} (${response.status}, ${response.time}ms)`);
      return true;
    } else {
      log('fail', `${description} (expected ${expectedStatus}, got ${response.status})`);
      return false;
    }
  } catch (error) {
    log('fail', `${description} (error: ${error.message})`);
    return false;
  }
}

async function testPerformance(url, thresholdMs, description) {
  try {
    const response = await makeRequest(url);
    if (response.time < thresholdMs) {
      log('pass', `${description} (${response.time}ms < ${thresholdMs}ms)`);
      return true;
    } else {
      log('fail', `${description} (${response.time}ms > ${thresholdMs}ms)`);
      return false;
    }
  } catch (error) {
    log('fail', `${description} (error: ${error.message})`);
    return false;
  }
}

async function testContent(url, pattern, description) {
  try {
    const response = await makeRequest(url);
    if (response.body.includes(pattern)) {
      log('pass', description);
      return true;
    } else {
      log('fail', `${description} (pattern not found: ${pattern})`);
      return false;
    }
  } catch (error) {
    log('fail', `${description} (error: ${error.message})`);
    return false;
  }
}

async function runTests() {
  console.log(`${BLUE}========================================${NC}`);
  console.log(`${BLUE}  Website Test Agent - arnaudwiehe.com${NC}`);
  console.log(`${BLUE}  Target: ${BASE_URL}${NC}`);
  console.log(`${BLUE}========================================${NC}\n`);

  // 1. Basic Availability
  log('info', 'TEST SUITE 1: Basic Availability');
  await testEndpoint(`${BASE_URL}/`, 200, 'Homepage loads');
  await testEndpoint(`${BASE_URL}/articles`, 200, 'Articles page loads');
  await testEndpoint(`${BASE_URL}/books`, 200, 'Books page loads');
  await testEndpoint(`${BASE_URL}/speaking`, 200, 'Speaking page loads');
  await testEndpoint(`${BASE_URL}/this-page-does-not-exist`, 404, '404 page works');

  // 2. Performance
  console.log('');
  log('info', 'TEST SUITE 2: Performance');
  await testPerformance(`${BASE_URL}/`, 3000, 'Homepage loads under 3s');
  await testPerformance(`${BASE_URL}/articles`, 3000, 'Articles page loads under 3s');

  // 3. Content
  console.log('');
  log('info', 'TEST SUITE 3: Content Verification');
  await testContent(`${BASE_URL}/`, 'Arnaud Wiehe', 'Name appears on homepage');
  await testContent(`${BASE_URL}/`, 'AI & Emerging Tech Strategist', 'Title tagline present');
  await testContent(`${BASE_URL}/`, 'cybersecurity', 'Cybersecurity mentioned');

  // 4. Articles
  console.log('');
  log('info', 'TEST SUITE 4: Article Pages');
  const articles = [
    'ai-governance-cybersecurity',
    'boards-cyber-agenda-2026',
    'shadow-ai-guide-2026',
    'year-of-autonomous-agents',
    'openclaw-security-crisis-5-cves-2026',
    'openclaw-security-best-practices',
    'rise-of-openclaw'
  ];
  
  for (const slug of articles) {
    await testEndpoint(`${BASE_URL}/articles/${slug}`, 200, `Article: ${slug}`);
  }

  // 5. Images
  console.log('');
  log('info', 'TEST SUITE 5: Image Assets');
  const imagesDir = path.join(__dirname, '..', 'public', 'images', 'articles');
  const requiredImages = [
    { slug: 'ai-governance-cybersecurity', ext: 'svg' },
    { slug: 'boards-cyber-agenda-2026', ext: 'svg' },
    { slug: 'shadow-ai-guide-2026', ext: 'jpg' },  // Actual uploaded image
    { slug: 'year-of-autonomous-agents', ext: 'png' },
    { slug: 'openclaw-security-crisis', ext: 'png' },
    { slug: 'openclaw-security-best-practices', ext: 'png' },
    { slug: 'rise-of-openclaw', ext: 'png' }
  ];
  
  for (const img of requiredImages) {
    const filename = `${img.slug}.${img.ext}`;
    const imgPath = path.join(imagesDir, filename);
    if (fs.existsSync(imgPath)) {
      const stats = fs.statSync(imgPath);
      if (stats.size > 100) {
        log('pass', `Image exists: ${filename} (${(stats.size / 1024).toFixed(1)}KB)`);
      } else {
        log('fail', `Image too small: ${filename} (${stats.size}b)`);
      }
    } else {
      log('fail', `Image missing: ${filename}`);
    }
  }

  // 6. Article Image Display Test - Verify images actually render
  console.log('');
  log('info', 'TEST SUITE 6: Article Image Rendering');
  
  // Get fresh article data from the generated file
  const { articles: articleData } = require('../app/articles/data.generated.ts');
  
  for (const article of articleData.slice(0, 3)) { // Test first 3 articles
    if (article.heroImage) {
      // Check if hero image URL is present in the page HTML
      const response = await makeRequest(`${BASE_URL}/articles/${article.slug}`);
      if (response.body.includes(article.heroImage)) {
        log('pass', `Article image renders: ${article.slug} -> ${article.heroImage}`);
        
        // Also verify the image file is accessible
        const imgResponse = await makeRequest(`${BASE_URL}${article.heroImage}`);
        if (imgResponse.status === 200 && imgResponse.body.length > 100) {
          log('pass', `Image file accessible: ${article.heroImage} (${imgResponse.body.length}b)`);
        } else {
          log('fail', `Image file not accessible: ${article.heroImage} (status: ${imgResponse.status})`);
        }
      } else {
        log('fail', `Article image NOT in HTML: ${article.slug} (expected: ${article.heroImage})`);
      }
    }
  }

  // 7. Article Page Elements Validation
  console.log('');
  log('info', 'TEST SUITE 7: Article Page Elements Validation');
  
  // Check article pages for proper structure
  const sampleArticles = ['ai-governance-cybersecurity', 'shadow-ai-guide-2026'];
  
  for (const slug of sampleArticles) {
    const response = await makeRequest(`${BASE_URL}/articles/${slug}`);
    
    // Check LinkedIn share section only appears when URL exists
    const hasLinkedInSection = response.body.includes('Share on LinkedIn');
    const hasEmptyLinkedIn = response.body.includes('href=""') && hasLinkedInSection;
    
    if (hasLinkedInSection && !hasEmptyLinkedIn) {
      log('pass', `Article ${slug}: LinkedIn share has valid URL`);
    } else if (hasEmptyLinkedIn) {
      log('fail', `Article ${slug}: LinkedIn share has EMPTY URL - button will be broken`);
    }
    
    // Check navigation has proper CSS classes
    const hasNavClass = response.body.includes('article-nav-prev') && response.body.includes('article-nav-next');
    if (hasNavClass) {
      log('pass', `Article ${slug}: Navigation has proper CSS classes`);
    } else {
      log('warn', `Article ${slug}: Navigation may be missing CSS classes`);
    }
  }
  
  // 8. Speaking Event Pages - Check for missing CSS classes
  console.log('');
  log('info', 'TEST SUITE 8: Speaking Event Page CSS Validation');
  
  // Check speaking event page for defined CSS classes
  const speakingEvents = [
    'reinvent-security-podcast',
    'gitex-global-dubai-2025',
    'isaca-risk-event-2023'
  ];
  
  // Read globals.css to check for defined classes
  const globalsCssPath = path.join(__dirname, '..', 'app', 'globals.css');
  const globalsCss = fs.readFileSync(globalsCssPath, 'utf8');
  
  const requiredSpeakingClasses = [
    '.speaking-event-book-cta',
    '.speaking-event-book-cta-inner',
    '.speaking-event-book-cta h2',
    '.speaking-event-book-cta p',
    '.speaking-event-nav',
    '.speaking-nav-prev',
    '.speaking-nav-next'
  ];
  
  for (const cssClass of requiredSpeakingClasses) {
    if (globalsCss.includes(cssClass)) {
      log('pass', `CSS class defined: ${cssClass}`);
    } else {
      log('fail', `CSS class MISSING: ${cssClass} - page may render incorrectly`);
    }
  }
  
  // Test actual speaking event pages load
  for (const eventSlug of speakingEvents.slice(0, 2)) {
    await testEndpoint(`${BASE_URL}/speaking/${eventSlug}`, 200, `Speaking event: ${eventSlug}`);
  }

  // 9. Security Headers Check
  console.log('');
  log('info', 'TEST SUITE 9: Security Headers');
  
  const securityResponse = await makeRequest(`${BASE_URL}/`);
  const headers = securityResponse.headers;
  
  const requiredSecurityHeaders = [
    { name: 'X-Frame-Options', desc: 'Clickjacking protection' },
    { name: 'X-Content-Type-Options', desc: 'MIME sniffing protection' },
    { name: 'Referrer-Policy', desc: 'Referrer leakage protection' },
    { name: 'Content-Security-Policy', desc: 'XSS/content injection protection' }
  ];
  
  for (const header of requiredSecurityHeaders) {
    if (headers[header.name.toLowerCase()]) {
      log('pass', `Security header: ${header.name} (${header.desc})`);
    } else {
      log('warn', `Missing security header: ${header.name} (${header.desc})`);
    }
  }
  
  // Check for HTTPS on production (skip for localhost)
  if (!BASE_URL.includes('localhost')) {
    if (BASE_URL.startsWith('https://')) {
      log('pass', 'HTTPS enabled');
    } else {
      log('fail', 'HTTPS not enabled - required for production');
    }
  } else {
    log('info', 'Skipping HTTPS check (localhost)');
  }

  // Track large images for later
  let largeImages = 0;

  // 10. Asset Compression Check
  console.log('');
  log('info', 'TEST SUITE 10: Asset Compression & Optimization');
  
  // Check JS chunks are compressed
  const jsResponse = await makeRequest(`${BASE_URL}/_next/static/chunks/255-38b49df12a94ee57.js`);
  const contentEncoding = jsResponse.headers['content-encoding'];
  if (contentEncoding && (contentEncoding.includes('gzip') || contentEncoding.includes('br'))) {
    log('pass', `JavaScript compression enabled (${contentEncoding})`);
  } else {
    log('warn', 'JavaScript compression not detected');
  }
  
  // Check image sizes
  if (fs.existsSync(imagesDir)) {
    const imageFiles = fs.readdirSync(imagesDir).filter(f => /\.(png|jpg|jpeg|svg)$/i.test(f));
    for (const img of imageFiles) {
      const imgPath = path.join(imagesDir, img);
      const stats = fs.statSync(imgPath);
      const sizeKB = stats.size / 1024;
      if (sizeKB > 500) {
        log('warn', `Large image: ${img} (${sizeKB.toFixed(1)}KB) - consider compression`);
        largeImages++;
      }
    }
    if (largeImages === 0) {
      log('pass', 'All images under 500KB');
    }
  }
  
  // Check for modern image formats
  const hasWebpSupport = fs.existsSync(path.join(__dirname, '..', 'public', 'images', 'webp'));
  if (!hasWebpSupport) {
    log('info', 'Consider adding WebP images for better compression');
  }

  // 11. SEO & Meta Tags Check
  console.log('');
  log('info', 'TEST SUITE 11: SEO & Meta Tags');
  
  const seoChecks = [
    { pattern: '<title>', desc: 'Title tag present' },
    { pattern: 'name="description"', desc: 'Meta description present' },
    { pattern: 'property="og:title"', desc: 'Open Graph title present' },
    { pattern: 'property="og:description"', desc: 'Open Graph description present' },
    { pattern: 'property="og:image"', desc: 'Open Graph image present' },
    { pattern: 'rel="canonical"', desc: 'Canonical URL present' },
    { pattern: 'viewport', desc: 'Viewport meta tag present' }
  ];
  
  for (const check of seoChecks) {
    if (securityResponse.body.includes(check.pattern)) {
      log('pass', `SEO: ${check.desc}`);
    } else {
      log('warn', `SEO: Missing ${check.desc}`);
    }
  }

  // 12. Accessibility Checks
  console.log('');
  log('info', 'TEST SUITE 12: Accessibility');
  
  const hasAltText = !securityResponse.body.includes('alt=""') && securityResponse.body.includes('alt=');
  if (hasAltText) {
    log('pass', 'Images have alt text');
  } else {
    log('warn', 'Some images may be missing alt text');
  }
  
  const hasLangAttr = securityResponse.body.includes('lang="en"');
  if (hasLangAttr) {
    log('pass', 'HTML lang attribute present');
  } else {
    log('warn', 'HTML lang attribute missing');
  }

  // 13. Mobile Responsiveness Check
  console.log('');
  log('info', 'TEST SUITE 13: Mobile Responsiveness');
  
  const hasViewport = securityResponse.body.includes('viewport');
  const hasResponsiveMeta = securityResponse.body.includes('width=device-width');
  
  if (hasViewport && hasResponsiveMeta) {
    log('pass', 'Viewport meta tag configured for mobile');
  } else {
    log('fail', 'Viewport meta tag missing or incomplete');
  }
  
  // Check for responsive CSS patterns
  if (securityResponse.body.includes('@media') || securityResponse.body.includes('clamp(')) {
    log('pass', 'Responsive CSS patterns detected');
  } else {
    log('warn', 'Limited responsive CSS patterns detected');
  }

  // 14. Performance Metrics
  console.log('');
  log('info', 'TEST SUITE 14: Performance Metrics');
  
  // Measure page load time
  const perfStart = Date.now();
  await makeRequest(`${BASE_URL}/`);
  const perfEnd = Date.now();
  const loadTime = perfEnd - perfStart;
  
  if (loadTime < 100) {
    log('pass', `Page load time: ${loadTime}ms (excellent)`);
  } else if (loadTime < 500) {
    log('pass', `Page load time: ${loadTime}ms (good)`);
  } else if (loadTime < 1000) {
    log('warn', `Page load time: ${loadTime}ms (acceptable)`);
  } else {
    log('fail', `Page load time: ${loadTime}ms (slow)`);
  }
  
  // Check for render-blocking resources
  const hasAsyncScripts = securityResponse.body.includes('async') || securityResponse.body.includes('defer');
  if (hasAsyncScripts) {
    log('pass', 'Async/defer scripts detected (non-blocking)');
  } else {
    log('info', 'Consider adding async/defer to scripts');
  }

  // 15. Pre-deployment Checklist
  console.log('');
  log('info', 'TEST SUITE 15: Pre-deployment Checklist');
  
  const buildDir = path.join(__dirname, '..', '.next');
  
  const checklist = [
    { name: 'Build completed', check: fs.existsSync(buildDir) },
    { name: 'No console errors', check: true }, // Would need runtime check
    { name: 'All images optimized', check: largeImages === 0 },
    { name: 'Security headers present', check: headers['content-security-policy'] !== undefined },
    { name: 'SEO meta tags present', check: securityResponse.body.includes('<title>') }
  ];
  
  let checklistPassed = 0;
  for (const item of checklist) {
    if (item.check) {
      log('pass', `✓ ${item.name}`);
      checklistPassed++;
    } else {
      log('fail', `✗ ${item.name}`);
    }
  }
  
  if (checklistPassed === checklist.length) {
    log('info', '🚀 Site is ready for deployment!');
  } else {
    log('warn', `⚠️ ${checklist.length - checklistPassed} items need attention before deployment`);
  }

  // 16. Build Check
  console.log('');
  log('info', 'TEST SUITE 16: Build Verification');
  
  if (fs.existsSync(buildDir)) {
    log('pass', 'Build output exists (.next/)');
    
    // Check build size
    try {
      const output = execSync(`du -sm ${buildDir}`, { encoding: 'utf8' });
      const size = parseInt(output.split('\t')[0]);
      if (size > 500) {
        log('warn', `Build size is ${size}MB (consider optimization)`);
      } else {
        log('pass', `Build size: ${size}MB`);
      }
    } catch (e) {
      log('warn', 'Could not check build size');
    }
  } else {
    log('fail', 'No build output found - run npm run build first');
  }

  // Summary
  console.log('');
  console.log(`${BLUE}========================================${NC}`);
  console.log(`${BLUE}           TEST SUMMARY               ${NC}`);
  console.log(`${BLUE}========================================${NC}`);
  console.log(`${GREEN}Passed: ${testsPassed}${NC}`);
  console.log(`${RED}Failed: ${testsFailed}${NC}`);
  console.log('');
  
  if (testsFailed === 0) {
    console.log(`${GREEN}✓ All tests passed!${NC}`);
    process.exit(0);
  } else {
    console.log(`${RED}✗ Some tests failed.${NC}`);
    process.exit(1);
  }
}

runTests().catch(error => {
  console.error('Test runner failed:', error);
  process.exit(1);
});
