const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: [
      "./src/"
    ],
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: /node_modules/
        }
      ]
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js"]
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
      historyApiFallback: true
    },
    devtool: 'inline-source-map',
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/assets/index-templates/dev.html',
        filename: 'index.html'
      })
    ]
  };