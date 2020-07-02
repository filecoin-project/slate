import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";

const input = "./components/system/index.js";

export default [
  {
    input,
    output: {
      file: "dist/index.js",
      format: "cjs",
    },
    external: ["@emotion/react", "react", "react-dom"],
    plugins: [
      babel({
        exclude: "node_modules/**",
        runtimeHelpers: true,
      }),
      resolve(),
      commonjs({
        // NOTE(jim): Solution here fixed it.
        // https://github.com/styled-components/styled-components/issues/1654
        namedExports: {
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
          "node_modules/react-tippy/dist/react-tippy.js": ["Tooltip"],
        },
      }),
    ],
  },
];
