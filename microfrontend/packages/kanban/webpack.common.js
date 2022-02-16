const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const srcPath = path.join(__dirname, "src/app");

module.exports = {
  stats: {
    errorDetails: true,
  },
  resolve: {
    // symlinks: false,
    // fallback: {
    //   fs: false,
    //   os: false,
    //   module: false,
    // },
    alias: {
      "@component": path.resolve(srcPath, "component"),
      "@shared-hooks": path.resolve(srcPath, "shared-hooks"),
      "@junbi-shared": path.resolve(srcPath, "junbi-shared"),
      "@api": path.resolve(srcPath, "api"),
      "@pages": path.resolve(srcPath, "pages"),
      "@store": path.resolve(srcPath, "store"),
      "@utils": path.resolve(srcPath, "utils"),
      "@remote": path.resolve(srcPath, "remote"),
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          plugins: [require.resolve("react-refresh/babel")],
        },
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: "url-loader",
        options: {
          limit: 10000,
          name: "assets/[name].[contenthash:8].[ext]",
        },
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: "@svgr/webpack",
          },
          {
            loader: "url-loader",
            options: {
              limit: 10000,
              name: "assets/[name].[contenthash:8].[ext]",
            },
          },
        ],
      },
      {
        test: /\.[jt]sx?$/,
        enforce: "pre",
        use: ["source-map-loader"],
      },
    ],
  },
  plugins: [
    new webpack.ProvidePlugin({
      React: "react",
    }),
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        diagnosticOptions: {
          semantic: true,
          syntactic: true,
        },
        mode: "write-references",
      },
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};
