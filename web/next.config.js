/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['i.pravatar.cc', 'iteam-s.mg'],
  },
  env: {
    API_IMG: 'https://pocket.iteam-s.mg/api/files/',
    API_URL: 'https://pocket.iteam-s.mg/api/collections/',
  },
};

module.exports = nextConfig;
