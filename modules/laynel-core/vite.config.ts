import { defineConfig } from 'vite'
import path from 'node:path'
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import Icons from 'unplugin-icons/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import UnoCSS from 'unocss/vite';

import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url))


const config = defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    Icons({
      compiler: 'vue3', // 根据项目使用的 Vue 版本设置
      autoInstall: true, // 自动安装图标
    }),
    Components({
      resolvers: [
        ElementPlusResolver({
          importStyle: true,
        }),
      ],
    }),
    UnoCSS(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
  build: {
    // 在 outDir 中生成 .vite/manifest.json
    minify: false, // 压缩代码
    // 在 outDir 中生成 .vite/assets 目录
    outDir: 'dist',
    rollupOptions: {
      // 覆盖默认的 .html 入口
      input: 'index.ts',
      // external: [ 'element-plus','vue],
      watch: {
        buildDelay: 1200, // 延迟编译，解决某些情况下热更新失效的问题
        exclude: ['node_modules/**', 'dist/**'], // 不监听 dist 目录
        include: ['./**'], // 只监听 project 目录
        clearScreen: false, // 编译过程中不清屏
      },
      cache: true,
      treeshake: {   // 开启 treeshake 优化, 减少 bundle 体积
        moduleSideEffects: false, // 允许模块有副作用,不能设置为false,不然会影响postcss的处理
      },
      output: {
        manualChunks: {
          'vue-extends': ['pinia', 'vue-i18n'],
          // vue: ['vue'],
          common: ['dayjs', 'lodash', 'axios'],
          icons:['@iconify/vue']
        }
      }
    }
  },
})

export default config
