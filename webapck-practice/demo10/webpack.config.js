const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const InlineChunkWebpackPlugin = require("html-webpack-inline-chunk-plugin");

module.exports = {
  mode: "none",
  entry: {
    app: "./src/app.js"
  },
  output: {
    publicPath: __dirname + "/dist/",
    path: path.resolve(__dirname, "dist"),
    filename: "[name]-[hash:5].bundle.js",
    chunkFilename: "[name]-[hash:5].chunk.js"
  },
  module: {
    rules: [{
        test: /\.html$/,
        use: [{
          loader: "html-loader", // 打包从index.html文件提取出的img
          options: {
            attrs: ["img:src", "img:data-src"]
          }
        }]
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: [{
          loader: "url-loader",
          options: {
            name: "[name]-[hash:5].min.[ext]",
            limit: 10000,
            publicPath: "static/",
            outputPath: "static/"
          }
        }]
      },
      {
        test: /\.js$/,
        loader: 'babel-loader?',
      },
    ]
  },
  optimization: {
    splitChunks: {},
    runtimeChunk: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./index.html",
      // chunks: ["app"], // enrty 中的app入口才会被打包
      minify: {
        // 压缩选项
        collapseWhitespace: true
      }
    }),
    new InlineChunkWebpackPlugin({
      inlineChunks: ["manifest"]
    }),
    new CleanWebpackPlugin(["dist"])
  ]
};