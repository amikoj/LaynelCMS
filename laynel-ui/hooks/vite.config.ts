import { defineConfig } from 'vite'
import path from 'node:path'
import vue from '@vitejs/plugin-vue';

import { fileURLToPath } from 'node:url';

const __dirname = fileURLToPath(new URL('.', import.meta.url))


const config = defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: 'src/index.ts',
      cache: true,
      treeshake: {   // 开启 treeshake 优化, 减少 bundle 体积
        moduleSideEffects: false, // 允许模块有副作用,不能设置为false,不然会影响postcss的处理
      },
    }
  },
})

export default config
