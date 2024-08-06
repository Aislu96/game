/** @type {import('next').NextConfig} */
const nextConfig = {
  return() {
    source: "/";
    destination: "/account";
    permanent: false;
  },

  images: {
    domains: ["api.telegram.org"],
  },
};

export default nextConfig;

// reactStrictMode: true,
// swcMinify: true,
// output: "export",
// images: {
//   unoptimized: true,
// },
// env: {
//   TELEGRAM_BOT_TOKEN: process.env.TELEGRAM_BOT_TOKEN,
// },
// experimental: {
//   appDir: true,
// },
// api: {
//   bodyParser: false,
// },

// next.config.js
// module.exports = {
//   output: 'export',
//   images: {
//     unoptimized: true,
//   },
// };
