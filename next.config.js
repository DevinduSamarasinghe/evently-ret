/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['utfs.io'],
        remotePatterns: [{
            protocol: 'https',
            hostname: "utfs.io",
            port: ''
        }]
    },
    async headers() {
        return [
            {
                source: '/(.*)', // Apply headers to all routes
                headers: [
                    // {
                    //     // More relaxed Content-Security-Policy for development
                    //     key: 'Content-Security-Policy',
                    //     value: "default-src 'self'; script-src 'self' https://example.com; img-src 'self' https://example.com; style-src 'self' https://fonts.googleapis.com;"
                    // },
                    {
                        key: 'Strict-Transport-Security',
                        value: 'max-age=31536000; includeSubDomains; preload',
                    },
                    {
                        key: 'X-Frame-Options',
                        value: 'DENY',
                    },
                    {
                        key: 'X-Content-Type-Options',
                        value: 'nosniff',
                    },
                    {
                        key: 'X-XSS-Protection',
                        value: '1; mode=block',
                    },
                    {
                        key: 'Cache-Control',
                        value: 'no-store, no-cache, must-revalidate, proxy-revalidate',
                    },
                    {
                        key: 'X-Powered-By',
                        value: 'Next.js',
                    }
                ]
            }
        ];
    },
    webpack: (config, { isServer }) => {

        config.cache = false;
        if (!isServer) {
            // Prevent fs, path, os, and other Node.js built-ins from being included in client-side bundles
            config.resolve.fallback = {
                fs: false,
                path: false,
                os: false,
                crypto: false,
                http: false,
                https: false,
                stream: false,
                buffer: false,
            };
        }
        return config;
    }
};

module.exports = nextConfig;
