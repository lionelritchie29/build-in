const withPWA = require('next-pwa');

/** @type {import('next').NextConfig} */
const nextConfig = withPWA({
  reactStrictMode: true,
  images: {
    domains: ['i.pravatar.cc'],
  },
  pwa: {
    dest: 'public',
  },
  disable: process.env.NEXT_PUBLIC_NODE_ENV === 'development',
});

module.exports = nextConfig;
