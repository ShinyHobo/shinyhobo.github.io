const path = require('path');

module.exports = {
    entry: [
      "./src/"
    ],
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
    },
    output: {
      filename: "bundle.js"
    },
    devServer: {
      liveReload: true,
      static: "./",
      devMiddleware: {
        writeToDisk: true
      },
      historyApiFallback: true,
    },
  };