/* eslint-disable camelcase */
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import legacy from '@vitejs/plugin-legacy';
// import { nodeResolve } from '@rollup/plugin-node-resolve';

//读取【开发可选配置】（此文件根据命令行的选择自动生成）
const { url } = require('./project_modules/dev-tools/dev-optional-config');

if (!url) {
  throw new Error('请配置本地开发服务的代理地址');
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    /**
     * 为打包后的文件提供传统浏览器兼容性支持
     *
     * @see https://cn.vitejs.dev/plugins/#vitejsplugin-legacy
     */
    legacy({
      targets: ['defaults', 'not IE 11'],
      additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
      polyfills: [
        'es.promise',
        'es.promise.all-settled',
        'es.promise.any',
        'es.promise.finally',
      ],
      modernPolyfills: [
        'es.promise',
        'es.promise.all-settled',
        'es.promise.any',
        'es.promise.finally',
      ],
    }),

    /**
     * 类似 webpack resolve.modules 添加模块目录
     *
     * @see https://github.com/rollup/plugins/tree/master/packages/node-resolve#moduledirectories
     */
    // nodeResolve({
    //   moduleDirectories: [path.resolve(__dirname, 'core_modules')],
    // }),
  ],

  /**
   * 文件系统路径的别名
   *
   * @see https://cn.vitejs.dev/config/#resolve-alias
   */
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },

  /**
   * 强制预构建链接的包
   *
   * @see https://cn.vitejs.dev/config/#optimizedeps-include
   */
  optimizeDeps: {
    // entries: [],
    // include: [],
  },

  /**
   *  指定传递给 CSS 预处理器的选项
   *
   * @see https://cn.vitejs.dev/config/#css-preprocessoroptions
   */
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/style/variables.scss";',
      },
    },
  },

  /**
   * 开发服务器选项
   *
   * @see https://cn.vitejs.dev/config/#server-options
   */
  server: {
    // host: 'localhost',
    // 开发服务器端口
    port: 3000,
    // 开发服务器启动时自动在浏览器打开
    open: 'firefox',
    // 为开发服务器配置自定义代理规则
    proxy: {
      '^/api/.*': {
        target: url,
        // target: 'http://localhost:8888',
        rewrite: (path) => path.replace(/^\/api/, ''),
        // changeOrigin: true, //是否跨域
      },
    },
    // 跨域
    cors: true,
    fs: {
      // allow: ['path'],
    },
  },

  /**
   * 构建选项
   *
   * @see https://cn.vitejs.dev/config/#build-options
   */
  build: {
    // 生产环境打包配置
    //去除 console debugger
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    // url https://rollupjs.org/guide/en/#big-list-of-options
    rollupOptions: {
      // external: [/core_modules/],
    },
  },
});
