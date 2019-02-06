const path = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require("clean-webpack-plugin");


module.exports = {
  entry: {
    main: './src/foo.js',
    vendor: ['vue']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[chunkhash].js' // 改为chunkhash之后vendor的hash值与main的就不一样啦
    // filename: '[name].[hash].js'
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        common: {
          name: "common",
          chunks: "all",
          minSize: 1,
          priority: 0
        },
        vendors: {
          name: "vendor",
          test: /[\\/]node_modules[\\/]/,
          chunks: "all",
          priority: 10
        }
      }
    },
    runtimeChunk: "single"
      // 等价于
      // runtimeChunk: {
      //   name: "manifest"
      // }  
  },
  plugins: [
    new CleanWebpackPlugin(["dist"]),
    new webpack.NamedChunksPlugin()
  ]
}