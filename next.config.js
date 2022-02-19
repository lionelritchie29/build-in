const withPWA = require('next-pwa');

/** @type {import('next').NextConfig} */
// const nextConfig = withPWA({
//   reactStrictMode: true,
//   images: {
//     domains: ['i.pravatar.cc'],
//   },
//   pwa: {
//     dest: 'public',
//   },
//   disable: process.env.NODE_ENV === 'development',
// });

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['i.pravatar.cc'],
  },
};

module.exports = nextConfig;
