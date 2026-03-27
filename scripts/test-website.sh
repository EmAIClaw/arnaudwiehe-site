#!/bin/bash
#
# Website Test Suite for arnaudwiehe.com
# Run this after making changes to verify functionality, security, and performance
#

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
BASE_URL="http://localhost:3000"
if [ -n "$1" ]; then
  BASE_URL="$1"
fi

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}  Website Test Suite - arnaudwiehe.com${NC}"
echo -e "${BLUE}  Target: $BASE_URL${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# Track results
TESTS_PASSED=0
TESTS_FAILED=0

# Function to report test results
pass() {
  echo -e "${GREEN}✓ PASS:${NC} $1"
  ((TESTS_PASSED++))
}

fail() {
  echo -e "${RED}✗ FAIL:${NC} $1"
  ((TESTS_FAILED++))
}

warn() {
  echo -e "${YELLOW}⚠ WARN:${NC} $1"
}

# Function to check HTTP status
check_http() {
  local url="$1"
  local expected="$2"
  local description="$3"
  local follow_redirects="${4:-no}"
  
  local curl_opts="-s -o /dev/null -w %{http_code}"
  if [ "$follow_redirects" == "yes" ]; then
    curl_opts="-s -L -o /dev/null -w %{http_code}"
  fi
  
  local status
  status=$(curl $curl_opts --connect-timeout 10 --max-time 30 "$url" || echo "000")
  
  if [ "$status" == "$expected" ]; then
    pass "$description (HTTP $status)"
    return 0
  else
    fail "$description (expected HTTP $expected, got $status)"
    return 1
  fi
}

# Function to check response time
check_performance() {
  local url="$1"
  local threshold_ms="$2"
  local description="$3"
  
  local response_time
  response_time=$(curl -s -o /dev/null -w "%{time_total}" --connect-timeout 10 --max-time 30 "$url" | awk '{printf "%.0f", $1 * 1000}')
  
  if [ "$response_time" -lt "$threshold_ms" ]; then
    pass "$description (${response_time}ms < ${threshold_ms}ms threshold)"
    return 0
  else
    fail "$description (${response_time}ms > ${threshold_ms}ms threshold)"
    return 1
  fi
}

# Function to check if string exists in page
check_content() {
  local url="$1"
  local pattern="$2"
  local description="$3"
  
  if curl -s --connect-timeout 10 --max-time 30 "$url" | grep -q "$pattern"; then
    pass "$description"
    return 0
  else
    fail "$description (pattern not found: $pattern)"
    return 1
  fi
}

# Function to check image existence
check_image() {
  local image_path="$1"
  local description="$2"
  
  if [ -f "public/$image_path" ]; then
    local file_size
    file_size=$(stat -f%z "public/$image_path" 2>/dev/null || stat -c%s "public/$image_path" 2>/dev/null || echo "0")
    if [ "$file_size" -gt 100 ]; then
      pass "$description ($(numfmt --to=iec $file_size 2>/dev/null || echo "${file_size}b"))"
      return 0
    else
      fail "$description (file too small: ${file_size}b)"
      return 1
    fi
  else
    fail "$description (file not found: public/$image_path)"
    return 1
  fi
}

echo -e "${BLUE}┌────────────────────────────────────────┐${NC}"
echo -e "${BLUE}│ 1. BASIC AVAILABILITY TESTS            │${NC}"
echo -e "${BLUE}└────────────────────────────────────────┘${NC}"

check_http "$BASE_URL" "200" "Homepage loads"
check_http "$BASE_URL/articles" "200" "Articles page loads"
check_http "$BASE_URL/books" "200" "Books page loads"
check_http "$BASE_URL/speaking" "200" "Speaking page loads"
check_http "$BASE_URL/this-page-does-not-exist" "404" "404 page works for invalid URLs"

echo ""
echo -e "${BLUE}┌────────────────────────────────────────┐${NC}"
echo -e "${BLUE}│ 2. PERFORMANCE TESTS                   │${NC}"
echo -e "${BLUE}└────────────────────────────────────────┘${NC}"

check_performance "$BASE_URL" "3000" "Homepage loads under 3 seconds"
check_performance "$BASE_URL/articles" "3000" "Articles page loads under 3 seconds"

echo ""
echo -e "${BLUE}┌────────────────────────────────────────┐${NC}"
echo -e "${BLUE}│ 3. CONTENT & SEO TESTS                 │${NC}"
echo -e "${BLUE}└────────────────────────────────────────┘${NC}"

check_content "$BASE_URL" "Arnaud Wiehe" "Name appears on homepage"
check_content "$BASE_URL" "AI & Emerging Tech Strategist" "Title tagline present"
check_content "$BASE_URL" "cybersecurity" "Cybersecurity mentioned"
check_content "$BASE_URL" "articles" "Articles link present"

echo ""
echo -e "${BLUE}┌────────────────────────────────────────┐${NC}"
echo -e "${BLUE}│ 4. ARTICLE INTEGRITY TESTS             │${NC}"
echo -e "${BLUE}└────────────────────────────────────────┘${NC}"

# Get list of articles from the data file
if [ -f "app/articles/data.generated.ts" ]; then
  ARTICLES=$(grep -o 'slug: "[^"]*"' app/articles/data.generated.ts | sed 's/slug: "\([^"]*\)"/\1/')
  
  echo "Testing individual article pages..."
  for slug in $ARTICLES; do
    check_http "$BASE_URL/articles/$slug" "200" "Article: $slug"
  done
else
  warn "Article data file not found"
fi

echo ""
echo -e "${BLUE}┌────────────────────────────────────────┐${NC}"
echo -e "${BLUE}│ 5. IMAGE ASSET TESTS                   │${NC}"
echo -e "${BLUE}└────────────────────────────────────────┘${NC}"

# Check article hero images
if [ -f "app/articles/data.generated.ts" ]; then
  while IFS= read -r line; do
    if echo "$line" | grep -q 'heroImage:'; then
      image_path=$(echo "$line" | grep -o '"/images/[^"]*"' | tr -d '"')
      if [ -n "$image_path" ]; then
        check_image "$image_path" "Hero image: $(basename $image_path)"
      fi
    fi
  done < app/articles/data.generated.ts
fi

# Check other critical images
check_image "images/certifications/cissp.png" "CISSP certification logo"
check_image "images/certifications/ccsp.png" "CCSP certification logo"
check_image "images/certifications/cism.png" "CISM certification logo"
check_image "images/certifications/cisa.png" "CISA certification logo"
check_image "images/certifications/cippe.png" "CIPP/E certification logo"
check_image "images/certifications/aigp.png" "AIGP certification logo"

echo ""
echo -e "${BLUE}┌────────────────────────────────────────┐${NC}"
echo -e "${BLUE}│ 6. SECURITY TESTS                      │${NC}"
echo -e "${BLUE}└────────────────────────────────────────┘${NC}"

# Check for security headers
echo "Checking security headers..."
HEADERS=$(curl -s -I --connect-timeout 10 --max-time 30 "$BASE_URL" 2>/dev/null || echo "")

if echo "$HEADERS" | grep -qi "X-Frame-Options"; then
  pass "X-Frame-Options header present (clickjacking protection)"
else
  warn "X-Frame-Options header missing"
fi

if echo "$HEADERS" | grep -qi "X-Content-Type-Options"; then
  pass "X-Content-Type-Options header present (MIME sniffing protection)"
else
  warn "X-Content-Type-Options header missing"
fi

if echo "$HEADERS" | grep -qi "X-XSS-Protection\|Content-Security-Policy"; then
  pass "XSS protection headers present"
else
  warn "XSS protection headers missing"
fi

echo ""
echo -e "${BLUE}┌────────────────────────────────────────┐${NC}"
echo -e "${BLUE}│ 7. COMPRESSION TESTS                   │${NC}"
echo -e "${BLUE}└────────────────────────────────────────┘${NC}"

# Check if gzip/br is enabled
echo "Checking compression..."
COMPRESSION=$(curl -s -I -H "Accept-Encoding: gzip, br" --connect-timeout 10 --max-time 30 "$BASE_URL" 2>/dev/null | grep -i "content-encoding" || echo "")

if echo "$COMPRESSION" | grep -qi "gzip\|br\|deflate"; then
  pass "Compression enabled ($COMPRESSION)"
else
  warn "Compression may not be enabled"
fi

echo ""
echo -e "${BLUE}┌────────────────────────────────────────┐${NC}"
echo -e "${BLUE}│ 8. LINK VALIDITY TESTS                 │${NC}"
echo -e "${BLUE}└────────────────────────────────────────┘${NC}"

# Extract and test external links
echo "Checking external links..."
EXTERNAL_LINKS=$(curl -s --connect-timeout 10 --max-time 30 "$BASE_URL/articles" 2>/dev/null | grep -oE 'href="https?://[^"]+"' | sed 's/href="//;s/"$//' | sort -u | head -10)

for link in $EXTERNAL_LINKS; do
  # Skip social media and known slow sites in test
  if echo "$link" | grep -qvE "(linkedin|twitter|facebook|instagram|amazon)"; then
    check_http "$link" "200" "External link: $(echo $link | cut -c1-50)..." "yes"
  fi
done

echo ""
echo -e "${BLUE}┌────────────────────────────────────────┐${NC}"
echo -e "${BLUE}│ 9. BUILD & DEPLOY READINESS            │${NC}"
echo -e "${BLUE}└────────────────────────────────────────┘${NC}"

# Check if build exists
if [ -d ".next" ]; then
  pass "Next.js build output exists"
  
  # Check build size
  BUILD_SIZE=$(du -sh .next 2>/dev/null | cut -f1)
  echo "    Build size: $BUILD_SIZE"
  
  # Warn if build is huge
  SIZE_MB=$(du -sm .next 2>/dev/null | cut -f1)
  if [ "$SIZE_MB" -gt 500 ]; then
    warn "Build is larger than 500MB ($SIZE_MB MB) - consider optimization"
  fi
else
  fail "No build output found - run 'npm run build' first"
fi

# Check package.json scripts
if [ -f "package.json" ]; then
  if grep -q "build" package.json && grep -q "start" package.json; then
    pass "Build and start scripts defined"
  else
    warn "Missing build/start scripts in package.json"
  fi
fi

echo ""
echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}           TEST SUMMARY               ${NC}"
echo -e "${BLUE}========================================${NC}"
echo -e "${GREEN}Passed: $TESTS_PASSED${NC}"
echo -e "${RED}Failed: $TESTS_FAILED${NC}"
echo ""

if [ $TESTS_FAILED -eq 0 ]; then
  echo -e "${GREEN}✓ All critical tests passed!${NC}"
  echo ""
  echo "Your website is ready for deployment."
  exit 0
else
  echo -e "${RED}✗ Some tests failed. Please review the issues above.${NC}"
  echo ""
  echo "Fix the failures before deploying."
  exit 1
fi
