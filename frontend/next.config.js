const process = require('process');
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  publicRuntimeConfig: {
    API_BASE_URL: '/api',
  },

  redirects: async () => {
    return [
      {
        source: '/',
        destination: '/single-inn',
        permanent: true,
      },
    ];
  },

  async rewrites() {
    return process.env.API_BASE_URL
      ? [
          {
            source: '/api/:path*',
            destination: `${process.env.API_BASE_URL}/:path*`, // Proxy to Backend
          },
        ]
      : [];
  },
};

module.exports = nextConfig;
