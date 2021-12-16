import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import legacy from '@vitejs/plugin-legacy';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    legacy({
      // targets: ['defaults', 'not IE 11'],
      // additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
      // polyfills: [
      //   'es.promise',
      //   'es.promise.all-settled',
      //   'es.promise.any',
      //   'es.promise.finally',
      // ],
      // modernPolyfills: [
      //   'es.promise',
      //   'es.promise.all-settled',
      //   'es.promise.any',
      //   'es.promise.finally',
      // ],
    }),
  ],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/style/main.scss";',
      },
    },
  },
  server: {
    // open: true,
    fs: {
      // allow: ['path'],
    },
  },
});
