const path = require('path');

module.exports = {
    entry: [
      'webpack-dev-server/client?http://localhost:8080/',
      "./src/index.ts"
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
      path: path.resolve(__dirname, 'dist'),
      filename: "bundle.js"
    },
    devServer: {
      liveReload: true,
      hot: true,
      static: "./"
    },
  };