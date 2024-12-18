import { defineConfig } from 'vite'
import path from 'node:path'
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import Icons from 'unplugin-icons/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { glob }  from 'glob'
import { watch } from 'node:fs'
import { build } from 'vite'
import chokidar from 'chokidar'



chokidar.watch(path.resolve(__dirname, 'project'), {

})


// watch('project/**/index.ts', () => {
//   console.log('index.ts changed, reloading vite config')
//   Object.assign(require.cache[require.resolve('vite.config.ts')], {
//     exports: null,
//     parent: null,
//     filename: require.resolve('vite.config.ts'),
//     loaded: false,
//   })
//   delete require.cache[require.resolve('vite.config.ts')]
//   require('vite.config.ts')
// })



const getAllModules = ( ) => {
 return  glob.sync('project/**/index.ts').reduce((entries: any, file: any) => {
  const module = file.split('/').pop().replace('.ts', '')
  entries[module] = path.resolve(__dirname, file)
  return entries
 }, {}) 
}


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
