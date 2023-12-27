/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cms.maspreparacion.com',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'stg.cms.maspreparacion.com',
        pathname: '/uploads/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1338',
        pathname: '/uploads/**',
      }
    ],
  },
}

module.exports = nextConfig
