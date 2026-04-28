/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  poweredByHeader: false,
  allowedDevOrigins: ['127.0.0.1'],
  images: {
    unoptimized: true,
  },
  // Performance optimizations
  compress: true,
  generateEtags: true,
  trailingSlash: true,
}

module.exports = nextConfig