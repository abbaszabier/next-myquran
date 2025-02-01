import withPWA from "next-pwa";

const withPWAConfig = withPWA({
  dest: "public",
  disable: process.env.NODE_ENV === "development",
  register: true,
  skipWaiting: true,
  mode: "production",
  sw: "sw.js",
});

module.exports = withPWAConfig({
  reactStrictMode: true,
});
