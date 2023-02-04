import { defineConfig, splitVendorChunkPlugin } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    splitVendorChunkPlugin(),
    svelte(),
    VitePWA({
      devOptions: {
        enabled: true,
        type: 'module',
      },
      injectRegister: 'auto',
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,jpeg,jpg,svg}'],
      },
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'board-bg.png', 'dice/*.png'],
      manifest: {
        name: 'Three Shields',
        short_name: 'Three Shields',
        description: 'digital dice for Three Shields game',
        theme_color: '#151208',
        background_color: '#151208',
        orientation: 'portrait',
        icons: [
          {
            src: 'android-chrome-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'android-chrome-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
    }),
  ],
})
