const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
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
      historyApiFallback: true
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/assets/index-templates/prod.html',
        filename: 'index.html'
      })
    ]
  };