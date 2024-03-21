// rollup.config.js
import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import del from 'rollup-plugin-delete'

export default [
    {
        input: 'src/index.ts',
        output: {
            file: 'lib/index.cjs.js',
            format: 'cjs',
            entryFileNames: '[name].cjs.js'
        },
        plugins: [
            del({
                targets: ['lib/**/*']
            }),
            nodeResolve(),
            commonjs(),
            typescript({
                tsconfig: './tsconfig.json'
            })
        ],
        // external: [...] // 外部引用的库，不要打包，用于处理 peerDependencies
    },
    {
        input: 'src/index.ts',
        output: {
            file: 'lib/index.esm.js',
            format: 'esm',
            entryFileNames: '[name].esm.js'
        },
        plugins: [
            nodeResolve(),
            commonjs(),
            typescript({
                tsconfig: './tsconfig.json'
            })
        ],
        // external: [...]
    }
]