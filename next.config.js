/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify:true,
  optimizeFonts:true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '1caravan.ru',
      },
    ],
    minimumCacheTTL:1500000,
  },
}

module.exports = nextConfig
