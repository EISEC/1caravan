/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    swcMinify: true,
    optimizeFonts: true,
    output: 'standalone',
    images: {
        formats: ['image/avif', 'image/webp'],
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
