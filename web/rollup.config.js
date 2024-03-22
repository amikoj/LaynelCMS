import babel from "@rollup/plugin-babel";
import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import del from "rollup-plugin-delete";
import postcss from "rollup-plugin-postcss";
import autoprefixer from "autoprefixer";
import json from "@rollup/plugin-json";
import { terser } from "rollup-plugin-terser";

export default {
  input: "src/index.ts",
  output: [
    // {
    //   file: "lib/index.cjs.js",
    //   format: "cjs",
    //   entryFileNames: "[name].cjs.js",
    // },
    {
      file: "lib/index.esm.js",
      format: "esm",
      entryFileNames: "[name].esm.js",
    },
    // {
    //   file: "lib/index.umd.js",
    //   format: "umd",
    //   name: "laynelcms",
    // },
    {
      file: "../server/public/js/laynelcms.umd.js",
      format: "umd",
      name: "LaynelCMS",
    },
  ],
  plugins: [
    del({
      targets: ["lib/**/*"],
    }),

    nodeResolve({
      browser: true,
    }),
    babel({
      babelHelpers: "bundled",
      exclude: "node_modules/**",
    }),
    commonjs(),
    typescript({
      tsconfig: "./tsconfig.json",
    }),
    postcss({
      plugins: [autoprefixer()],
    }),
    terser(),
    json(),
  ],
  // external: [...] // 外部引用的库，不要打包，用于处理 peerDependencies
};
