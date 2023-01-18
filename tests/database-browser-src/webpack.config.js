const path = require('path');

module.exports = {
    entry: [
      'webpack-dev-server/client?http://localhost:8080/',
      "./src"
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
      filename: "dist/bundle.js"
    },
    devServer: {
      liveReload: true,
      static: "./"
    },
  };