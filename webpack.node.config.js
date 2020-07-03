const path = require("path");
const nodeExternals = require("webpack-node-externals");

module.exports = {
  resolve: {
    extensions: [".js"],
  },
  entry: "./index.js",
  target: "node",
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  output: {
    libraryTarget: "commonjs",
    path: path.resolve(__dirname, "./nodedistribution"),
    filename: "[name].js",
  },
  externals: [nodeExternals()],
};
