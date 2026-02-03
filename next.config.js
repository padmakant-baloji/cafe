/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false, // Disabled to prevent double renders that could cause crashes
  output: 'export',
  images: {
    unoptimized: true, // Required for static export
  },
  // basePath will be set via environment variable for GitHub Pages
  // If your repo is username.github.io, leave basePath empty
  // Otherwise, set it to your repo name (e.g., '/cafe')
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH || '',
  trailingSlash: true,
}

module.exports = nextConfig
