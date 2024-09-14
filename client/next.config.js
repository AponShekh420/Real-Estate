/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // domains: ['assets-upload.nyc3.digitaloceanspaces.com'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5000',
        pathname: '/assets/**', // Adjust the path as necessary
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com', // Corrected
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'assets-upload.nyc3.digitaloceanspaces.com',
        pathname: '/**', // Wildcard pattern for all assets
      },
    ],
  },

  experimental: {
    forceSwcTransforms: true,
  }
};

module.exports = nextConfig;
