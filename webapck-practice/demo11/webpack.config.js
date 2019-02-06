const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path")

module.exports = {
  entry: {
    app: "./app.js"
  },
  output: {
    publicPath: "/",
    path: path.resolve(__dirname, "dist"),
    filename: "[name]-[hash:5].bundle.js",
    chunkFilename: "[name]-[hash:5].chunk.js"
  },
  resolve: {
    alias: {
      jQuery$: path.resolve(__dirname, "src/vendor/jquery.min.js")
    }
  },
  mode: "development",
  devtool: "source-map",
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 8000,
    hotOnly: true, // 在没有页面刷新的情况下启用热模块替换
    hot: true, //  热重载
    overlay: true, // 
    proxy: {
      "/comments": {
        target: "https://m.weibo.cn",
        changeOrign: true,
        logLevel: "debug",
        headers: {
          Cookie: ""
        }
      }
    },
    historyApiFallback: {
      rewrites: [{
        // from: /^\/([a-zA-Z0-9]+\/?)([a-zA-Z0-9]+)/,
        // to: function(context){
        //   return '/'+context.match[1] + context.match[2]+'.html'
        // }

        from: /.*/,
        to: "/index.html"
      }]
    }
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery", // npm
      jQuery: "jQuery" // 本地Js文件
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./index.html",
      chunks: ["app"]
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin() //在热加载时直接返回更新文件名，而不是文件的id
  ]
}