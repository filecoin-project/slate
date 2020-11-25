import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import json from "@rollup/plugin-json";

import { terser } from "rollup-plugin-terser";

const input = "./components/system/index.js";

const generateOutput = (outputPath) => {
  return {
    input,
    output: {
      file: outputPath,
      format: "cjs",
    },
    external: ["react", "react-dom"],
    plugins: [
      json({ exclude: ["node_modules/**"], compact: true }),
      babel({
        exclude: ["node_modules/**", "**/*.json"],
        runtimeHelpers: true,
      }),
      resolve({ preferBuiltins: true }),
      commonjs({
        // NOTE(jim): Solution here fixed it.
        // https://github.com/styled-components/styled-components/issues/1654
        namedExports: {
          "node_modules/@emotion/core/dist/core.browser.cjs.js": ["css"],
          "node_modules/react/index.js": [
            "cloneElement",
            "createContext",
            "Component",
            "createElement",
            "forwardRef",
            "useContext",
            "Fragment",
            "useRef",
            "useLayoutEffect",
            "PureComponent",
          ],
          "node_modules/react-dom/index.js": ["render", "hydrate"],
        },
      }),
      terser(),
    ],
  };
};

export default [
  generateOutput("dist/index.js"),
  generateOutput("../slate-react-system/src/index.js"),
];
