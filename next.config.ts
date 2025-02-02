import withPWA from "@ducanh2912/next-pwa";

const withPWAConfig = withPWA({
  dest: "public",
  register: true,
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
      {
        urlPattern:
          /^https:\/\/equran\.nos\.wjv-1\.neo\.id\/audio-full\/.*\.mp3$/,
        handler: "CacheFirst",
        options: {
          cacheName: "audioCache",
          expiration: {
            maxEntries: 50,
            maxAgeSeconds: 60 * 60 * 24 * 30,
          },
          cacheableResponse: {
            statuses: [200],
          },
        },
      },
    ],
  },
  fallbacks: {
    document: "/offline",
  },
});

module.exports = withPWAConfig({});
