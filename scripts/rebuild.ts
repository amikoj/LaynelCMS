import { build } from 'vite'
import chokidar from 'chokidar'
import lodash from 'lodash'
import path from 'path'
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import Icons from 'unplugin-icons/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { fileURLToPath } from 'url';


const __dirname = fileURLToPath(new URL('.', import.meta.url))

// 监听文件变化，自动重新构建
const watcher = chokidar.watch(path.resolve(__dirname, 'project'), {
    ignored: /dist|node_modules/,
    persistent: true,        // 是否持续监听
    ignoreInitial: true,     // 是否忽略初始扫描事件
    followSymlinks: true,     // 是否跟踪符号链
  })


  
const _rebuild = async (filePath: any) => {
    console.log('rebuild ', filePath, '...')
    try {
      const baseFilePath = path.resolve(__dirname, './project') + path.sep
      console.log('baseFilePath:', baseFilePath)
      const a = filePath.substring(baseFilePath.length, filePath.indexOf(path.sep, baseFilePath.length))
      const module = a
      await build({
        root: __dirname,
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
          manifest: true,
          // 在 outDir 中生成 .vite/assets 目录
          outDir: 'dist',
          rollupOptions: {
            external: ['vue', 'pinia', 'element-plus', 'dayjs', 'lodash', 'axios'],
            input: path.resolve(__dirname, `./project/${module}/index.ts`),
          },
        },
      })
      console.log('rebuild done')
    } catch (e) {
      console.log('rebuild error:', e)
    }
  }
  
  const rebuild = lodash.debounce(_rebuild, 2000)


  watcher.on('all', (_, filePath: any) => {
    console.log('file changed:', filePath)
    rebuild(filePath)
  })