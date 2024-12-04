const path = require('path');

// pulgins 配置
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const typescript = require('@rollup/plugin-typescript');
// 压缩代码
const terser = require('@rollup/plugin-terser');
// 处理scss
const postcss = require('rollup-plugin-postcss');
// 处理组件引入的图片
const image = require('@rollup/plugin-image');
const json = require('@rollup/plugin-json');
const babel = require('@rollup/plugin-babel');
const gzipPlugin = require('rollup-plugin-gzip').default; // gzip压缩
const livereload = require('rollup-plugin-livereload'); // 热更新
const autoImport = require('unplugin-auto-import/rollup').default; // 自动导入



const mode = process.env.NODE_ENV || 'development';

module.exports = {
    input: 'src/index.tsx', // 入口文件
    output: {
        dir: 'dist', // 输出目录
        format: 'esm', // 输出格式 
        entryFileNames: '[name].[hash].js', // 输出文件名
        chunkFileNames: 'libs/[name].js', // 输出分块文件名
        manualChunks: (id, { getModuleInfo, getModuleIds }) => {
            if (id.includes('node_modules') && id.includes('.js')) {
                const moduleInfo = getModuleInfo(id);
                const dependentEntryPoints = moduleInfo.dynamicImporters;
                if (dependentEntryPoints.length > 0) {
                    if (dependentEntryPoints.length > 1) {
                        return 'shared.utils'
                    } else if (dependentEntryPoints.length === 1) {
                        const name = path.parse(dependentEntryPoints[0]).name
                        return name;
                    }
                }
            }

            if (id.includes(`node_modules${path.sep}react`) || id.includes(`node_modules${path.sep}react-dom`))
                return `react.${mode}`
            else if (id.includes(`node_modules${path.sep}axios`))
                return `axios.${mode}`
            else if (id.includes(`node_modules${path.sep}redux`) || id.includes(`node_modules${path.sep}react-redux`) || id.includes(`node_modules${path.sep}redux-persist`))
                return `redux.${mode}`

        },
    },
    plugins: [
        nodeResolve({
            browser: true, // 告诉插件要解析浏览器环境
        }), // 解析 node_modules 中的模块
        commonjs(), // 转换 commonjs 模块
        autoImport({
            imports: ['react'],
            dto: 'typings/auto-import-components.d.ts',
            dirs: ['src/components'],
        }), // 自动导入
        typescript({
            exclude: ['node_modules/**'], // 排除 node_modules
        }), // 编译 ts 文件 
        json(), // 转换 json 文件
        image(), // 处理组件引入的图片
        babel({
            exclude: 'node_modules/**',
            babelHelpers: 'bundled',
            presets: [
                [
                    '@babel/preset-env',
                    {
                        modules: false, // 不将ES6模块转换为其他模块系统
                        // 指定需要支持的浏览器版本
                        targets: '> 0.25%, not dead'
                    }
                ],
                '@babel/preset-react' // 转换JSX
            ],
            plugins: [
                [
                    'import', {
                        libraryName: 'antd',
                        libraryDirectory: 'es',
                        style: true,
                    }
                ]
            ]
        }),
        postcss({
            extensions: ['.css', '.scss'],
            inject: true,
            minimize: true,
            exclude: 'node_modules/**', // 避免转译node_modules
            runtimeHelpers: true,
            extract: true,
        }),
        gzipPlugin(), // gzip压缩
        terser({
            compress: {
                drop_console: true,
                drop_debugger: true,
                pure_funcs: ['console.log'],
                // 移除导入未使用的图标
                dead_code: true,
                module: true,
            },
            output: {
                comments: false,
            },

        }),
        livereload({
            watch: 'dist',
        }),

    ],
    treeshake: { // 开启 treeshake 优化, 减少 bundle 体积
        moduleSideEffects: false, // 允许模块有副作用,不能设置为false,不然会影响postcss的处理
    },
    // 开发环境下开启缓存
    cache: true,
    watch: {
        include: ['src/**', 'plugins/**', '.env.development'],
    }

};