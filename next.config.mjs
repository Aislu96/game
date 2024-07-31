/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

// next.config.js
// module.exports = {
//   output: 'export',
//   images: {
//     unoptimized: true,
//   },
// };
