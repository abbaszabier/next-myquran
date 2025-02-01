import withPWA from "@ducanh2912/next-pwa";

const withPWAConfig = withPWA({
  dest: "public",
  register: true,
  cacheOnFrontEndNav: true,
  sw: "service-worker.js",
  workboxOptions: {
    skipWaiting: true,
    clientsClaim: true,
    runtimeCaching: [
      {
        urlPattern: /^https?.*/,
        handler: "NetworkFirst",
        options: {
          cacheName: "offlineCache",
          expiration: {
            maxEntries: 20000,
          },
        },
      },
    ],
  },
  fallbacks: {
    document: "/~offline/page.tsx",
  },
});

module.exports = withPWAConfig({});
