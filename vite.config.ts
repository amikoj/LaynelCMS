import { defineConfig } from 'vite'
import path from 'node:path'
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import Icons from 'unplugin-icons/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'


// https://vite.dev/config/
export default defineConfig({
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
    // 在 outDir 中生成 .vite/manifest.json
    manifest: true,
    // 在 outDir 中生成 .vite/assets 目录
    outDir: 'dist',
    rollupOptions: {
      // 覆盖默认的 .html 入口
      input:  {
        base: path.resolve(__dirname, 'project/base/index.ts'),
        user: path.resolve(__dirname, 'project/user/index.ts'),
        role: path.resolve(__dirname, 'project/role/index.ts'),
        plugin: path.resolve(__dirname, 'project/plugin/index.ts')
      },
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
