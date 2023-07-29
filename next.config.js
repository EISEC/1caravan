/** @type {import('next').NextConfig} */
const nextConfig = {
    pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js'],
    reactStrictMode: false,
    swcMinify: true,
    optimizeFonts: true,
    output: 'standalone',
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '1caravan.ru',
            },
        ],
        minimumCacheTTL: 1500000,
    },
}

module.exports = nextConfig
