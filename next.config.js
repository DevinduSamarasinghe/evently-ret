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
                    //     key: 'Content-Security-Policy',
                    //     value: "default-src 'self'; script-src 'self' http://localhost:3000 picked-corgi-72.clerk.accounts.dev; connect-src 'self' picked-corgi-72.clerk.accounts.dev; img-src 'self' https://utfs.io https://img.clerk.com; style-src 'self' 'nonce-your-nonce-value' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; worker-src 'self' blob:;"
                    // }
                                                    
                                                     
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
