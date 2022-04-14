const path = require("path");
const merge = require("webpack-merge");
const common = require("./webpack.config");

module.exports = merge.merge(common, {
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  devServer: {
    compress: true,
    port: 9090,
  },
});
