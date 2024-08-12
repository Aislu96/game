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
  i18n: {
    locales: ["en", "ru", "zh", "es", "ar", "hi", "fr", "pt", "tr"], // Add all languages you want to support
    defaultLocale: "en",
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
