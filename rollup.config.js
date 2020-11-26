import babel from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import json from "@rollup/plugin-json";
import visualizer from "rollup-plugin-visualizer";

import { terser } from "rollup-plugin-terser";

const input = "./components/system/index.js";

const generateOutput = (outputPath) => {
  return {
    input,
    output: {
      file: outputPath,
      format: "cjs",
    },
    external: ["react", "react-dom", "node-fetch"],
    plugins: [
      json({ exclude: ["node_modules/**"], compact: true }),
      babel({
        exclude: ["node_modules/**", "**/*.json"],
        babelHelpers: "runtime",
      }),
      resolve({
        preferBuiltins: false,
      }),
      commonjs(),
      terser({
        format: {
          comments: false,
        },
      }),
      visualizer(),
    ],
  };
};

export default [
  generateOutput("dist/index.js"),
  generateOutput("../slate-react-system/src/index.js"),
];
