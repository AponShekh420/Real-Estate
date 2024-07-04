/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5000',
        pathname: '/assets/**', // Adjust the path as necessary
      },
    ],
  },
};

module.exports = nextConfig;
