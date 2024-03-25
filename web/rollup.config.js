import babel from "@rollup/plugin-babel";
import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import del from "rollup-plugin-delete";
import json from "@rollup/plugin-json";
import { terser } from "rollup-plugin-terser";
import copy from "rollup-plugin-copy";

export default {
  input: "src/index.ts",
  // input: Object.fromEntries(
  //   globSync("src/pages/*.ts").map((file) => [
  //     path.relative(
  //       "src",
  //       file.slice(0, file.length - path.extname(file).length),
  //     ),
  //     // 这里可以将相对路径扩展为绝对路径，例如
  //     // src/nested/foo 会变成 /project/src/nested/foo.js
  //     fileURLToPath(new URL(file, import.meta.url)),
  //   ]),
  // ),
  output: [
    {
      format: "iife",
      dir: "./lib",
      entryFileNames: "[name].bundle.js",
    },
    {
      format: "umd",
      dir: "./lib",
      entryFileNames: "[name].umd.js",
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
    terser(),
    json(),
    copy({
      targets: [{ src: "lib/*.js", dest: "../server/public/js" }],
      hook: "writeBundle",
      verbose: true,
    }),
  ],
  // external: [...] // 外部引用的库，不要打包，用于处理 peerDependencies
};
