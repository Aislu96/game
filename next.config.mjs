/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: "export",
  images: {
    unoptimized: true,
  },
  env: {
    TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN,
  },
  // experimental: {
  //   appDir: true,
  // },
};

export default nextConfig;

// next.config.js
// module.exports = {
//   output: 'export',
//   images: {
//     unoptimized: true,
//   },
// };
