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
    webpack: (config, { isServer }) => {
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
