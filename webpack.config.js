const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  //entry: ["./src/index.ts", "./src/DOMFunctions/manipulate.ts", "bootstrap/dist/js/bootstrap"],
  //src\asset\bootstrap-dependencies\bootstrap.min.js
  entry: {
    bootstrap: "./src/asset/bootstrap-dependencies/bootstrap.min.js",
    main: ["./src/index.ts", "./src/DOMFunctions/manipulate.ts"],
  },
  mode: "development",
  output: {
    filename: "js/[name]-[contenthash].js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.html$/,
        use: ["html-loader"],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        type: "asset/resource",
        generator: {
          filename: `img/[name][ext]`,
        },
      },

      //   {
      //     test: /manifest.json$/,
      //     generator: {
      //       filename: `manifest.json`,
      //     },
      //   },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
