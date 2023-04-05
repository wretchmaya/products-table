const withLess = require('next-with-less');
const withPlugins = require('next-compose-plugins');
/** @type {import('next').NextConfig} */

const plugins = [
    [
        withLess,
        {
            lessLoaderOptions: {},
        },
    ],
];

module.exports = withPlugins(plugins, {
    reactStrictMode: true,
    swcMinify: true,
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'i.dummyjson.com',
                port: '',
                // pathname: '/account123/**',
            },
        ],
    },
});
