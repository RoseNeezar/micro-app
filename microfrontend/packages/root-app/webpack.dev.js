const { merge } = require("webpack-merge");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const commonConfig = require("./webpack.common");
const deps = require("./package.json").dependencies;
const { SourceMapDevToolPlugin } = require("webpack");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const ExternalTemplateRemotesPlugin = require("external-remotes-plugin");

const devConfig = {
  entry: "./src/index.ts",
  mode: "development",
  output: {
    publicPath: "/",
    clean: true,
  },
  devServer: {
    port: 3000,
    historyApiFallback: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "rootApp",
      filename: "remoteEntry.js",
      remotes: {
        kanban: "kanban@[kanbanUrl]/remoteEntry.js",
        // game: "game@[gameUrl]/remoteEntry.js",
      },
      exposes: {
        "./State": "./src/app/store/module/global/global.remote",
      },
      shared: {
        ...deps,
        react: { singleton: true, eager: true, requiredVersion: deps.react },
        "react-dom": {
          singleton: true,
          eager: true,
          requiredVersion: deps["react-dom"],
        },
      },
    }),
    new ExternalTemplateRemotesPlugin(),
    // new ReactRefreshWebpackPlugin({
    //   exclude: [/node_modules/, /bootstrap\.tsx$/],
    // }),
    new SourceMapDevToolPlugin({
      filename: "[file].map",
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);
