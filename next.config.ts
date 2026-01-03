import type { NextConfig } from "next";

const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  cacheOnFrontEndNav: true,
  reloadOnOnline: true,
  disable: process.env.NODE_ENV === 'development',
  runtimeCaching: [
    {
      // Navegación y páginas
      urlPattern: ({ request  }: {request: {mode: string}}) => request.mode === 'navigate',
      handler: 'NetworkFirst',
      options: {
        cacheName: 'pages-cache',
      },
    },
    {
      // JS, CSS, fuentes
      urlPattern: /\.(?:js|css|woff2?|ttf|otf)$/,
      handler: 'CacheFirst',
      options: {
        cacheName: 'static-resources',
      },
    },
    {
      // Imágenes
      urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/,
      handler: 'CacheFirst',
      options: {
        cacheName: 'images',
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 30 * 24 * 60 * 60,
        },
      },
    },
    {
      // APIs (ajusta el patrón si usas backend externo)
      urlPattern: /\/api\/.*$/,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'api-cache',
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 60 * 60,
        },
      },
    },
  ],
});

module.exports = withPWA({
  reactStrictMode: true,
});


const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  output: 'standalone'
};

export default nextConfig;
