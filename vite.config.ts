import { defineConfig } from 'vite'
import path from 'node:path'
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import Icons from 'unplugin-icons/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { glob } from 'glob'

import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url))

const getAllModules = () => {
  return glob.sync('project/**/index.ts').reduce((entries: any, file: any) => {
    const module = path.dirname(file).replace('project', '').replace('/', '').replace('\\', '')
    entries[module] = path.resolve(__dirname, file)
    return entries
  }, {})
}


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
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './project'),
    },
  },
  build: {
    watch: {
      buildDelay: 1200, // 延迟编译，解决某些情况下热更新失效的问题
      exclude: ['node_modules/**', 'dist/**'], // 不监听 dist 目录
      include: ['project/**'], // 只监听 project 目录
      clearScreen: false, // 编译过程中不清屏
    },
    // 在 outDir 中生成 .vite/manifest.json
    manifest: true,
    // 在 outDir 中生成 .vite/assets 目录
    outDir: 'dist',
    rollupOptions: {
      // 覆盖默认的 .html 入口
      input: getAllModules(),
      output: {
        manualChunks: {
          vue: ['vue', 'pinia'],
          elementPlus: ['element-plus'],
          common: ['dayjs', 'lodash', 'axios']
        }
      }
    }
  },
})

export default config
