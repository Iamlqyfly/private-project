const path = require("path")
const ExtractTextPlugin = require("extract-text-webpack-plugin")
// import "pixi.js";
module.exports = {
  entry: {
    app: "./src/app.js"
  },
  output: {
    publicPath: __dirname + "/dist/",
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js",
    chunkFilename: "[name].chunk.js"
  },
  module: {
    rules: [{
      test: /\.scss$/,
      use: ExtractTextPlugin.extract({
        fallback: {
          loader: "style-loader" // 应用与css没有被提取
        },
        use: [{
            loader: "css-loader",
            options: {
              minimize: true
            }
          },
          {
            loader: "sass-loader"
          }
        ]
      })
    }]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: "[name].min.css",
      allChunks: false // 只包括初始化css, 不包括异步加载的CSS
    })
  ]
}