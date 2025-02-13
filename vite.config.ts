import { defineConfig } from "vite";
import path from "node:path";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import Icons from "unplugin-icons/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import { Plugin as importToCDN } from "vite-plugin-cdn-import";
import { glob } from "glob";
import UnoCSS from "unocss/vite";
import AutoImport from "unplugin-auto-import/vite";

import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

const loadAllLibs = () => {
  return glob.sync("project/*/index.ts").reduce((entries: any, file: any) => {
    const module = path
      .dirname(file)
      .replace("project", "")
      .replace("/", "")
      .replace("\\", "");
    entries[module] = path.resolve(__dirname, file);
    return entries;
  }, {});
};

const config = defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    Icons({
      compiler: "vue3", // 根据项目使用的 Vue 版本设置
      autoInstall: true, // 自动安装图标
    }),
    Components({
      resolvers: [
        ElementPlusResolver({
          importStyle: true,
        }),
      ],
    }),

    importToCDN({
      modules: [
        {
          name: "vue",
          var: "Vue",
          path: "/static/libs/vue/vue@3.5.13.min.js",
        },
        {
          name: "element-plus",
          var: "ElementPlus",
          path: "/static/libs/element-plus/element-plus@2.9.1.min.js",
          css: "/static/libs/element-plus/element-plus@2.9.1.min.css",
        },
        // ...其他依赖
      ],
    }),
    AutoImport({
      imports: ["vue", "vue-i18n", "@vueuse/core", "pinia", 'vue-router'],
      dts: "auto-imports.d.ts", // 使用typescript，需要指定生成对应的d.ts文件或者设置为true,生成默认导入d.ts文件
      dirs: ["@laynel-ui/hooks", "@laynel-ui/store", "@laynel-ui/utils"],
    }),
    UnoCSS(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./project"),
    },
  },
  build: {
    // 在 outDir 中生成 .vite/manifest.json
    manifest: true,
    minify: false, // 压缩代码
    // sourcemap: true, // 生成 sourcemap
    // 在 outDir 中生成 .vite/assets 目录
    outDir: "dist",
    lib: {
      entry: loadAllLibs(),
      fileName: (_, entryName) => `assets/${entryName}-[hash].js`,
      // cssFileName: '[name]-[hash].css',
      formats: ["es"],
    },

    rollupOptions: {
      // 覆盖默认的 .html 入口
      // input: getAllModules(),
      // input: path.resolve(__dirname, './project/base/index.ts'),
      // external: [ 'element-plus','vue],
      watch: {
        buildDelay: 1200, // 延迟编译，解决某些情况下热更新失效的问题
        exclude: ["node_modules/**", "dist/**"], // 不监听 dist 目录
        include: ["project/**"], // 只监听 project 目录
        clearScreen: false, // 编译过程中不清屏
      },
      cache: true,
      // treeshake: {   // 开启 treeshake 优化, 减少 bundle 体积
      //   moduleSideEffects: false, // 允许模块有副作用,不能设置为false,不然会影响postcss的处理
      // },
      output: {
        manualChunks: {
          "vue-extends": ["pinia", "vue-i18n", "@iconify/vue", "@iconify/vue", "@vueuse/core", "vue-router"],
          common: ["dayjs", "lodash", "axios"],
          laynel: [
            "@laynel-ui/components",
            "@laynel-ui/layout",
            "@laynel-ui/hooks",
            "@laynel-ui/i18n",
            "@laynel-ui/store",
          ],
        },
      },
    },
  },
  // 环境变量注入依赖
  define: {
    "process.env": {
      NODE_ENV: "production",
    },
  },
});

export default config;
