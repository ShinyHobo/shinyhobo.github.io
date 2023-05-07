const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

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
      hot: false,
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
    ],
    devtool: "inline-source-map",
    optimization: {
      'minimize': false,
      minimizer: [new TerserPlugin({
          terserOptions: { 
              compress: { 
                  pure_funcs: [
                      'console.log'
                  ] 
              } 
           }
      })]
    }
  };