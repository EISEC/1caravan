/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    swcMinify: true,
    optimizeFonts: true,
    trailingSlash: false,
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
    async rewrites() {
        return [
            {
                source: '/tavary',
                destination: '/tavary',
            },
        ]
    },
}

module.exports = nextConfig
