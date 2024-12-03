const { watch } = require('fs');
const plugins = require('./plugins')
const path = require('path')

const mode = process.env.NODE_ENV || 'development';
const isDev = mode=== 'development';

module.exports = {
    input: 'src/index.tsx',    // 入口文件
    onwarn: (warning, onwarn) => {
        if (warning.code === 'THIS_IS_UNDEFINED' || warning.code === "MODULE_LEVEL_DIRECTIVE") {
            return;
        }
        onwarn(warning);
    },
    output: {
        dir: 'dist',    // 输出目录
        format: 'esm',  // 输出格式 
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
                        const name =  path.parse(dependentEntryPoints[0]).name
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
    plugins,
    treeshake: {   // 开启 treeshake 优化, 减少 bundle 体积
        moduleSideEffects: false, // 允许模块有副作用,不能设置为false,不然会影响postcss的处理
    },
    // 开发环境下开启缓存
    cache: isDev,
    watch: {
        include: ['src/**', 'plugins/**','.env.development'],
    }

};