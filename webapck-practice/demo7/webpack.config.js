const path = require("path")
const PurifyCSS = require("purifycss-webpack");
const glob = require("glob-all");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

let extractTextPlugin = new ExtractTextPlugin({
  filename: "[name].min.css",
  allChunks: false
});

let purifyCSS = new PurifyCSS({
  // glob-all 的作用就是帮助 PurifyCSS 进行路径处理，定位要做 Tree Shaking 的路径文件。
  paths: glob.sync([
    // 要做CSS Tree Shaking的路径文件
    path.resolve(__dirname, "./*.html"),
    path.resolve(__dirname, "./src/*.js")
  ])
})
module.exports = {
  mode: 'production', // 使用 -p(production) 这个 webpack 编译标记，来启用 UglifyJSPlugin 插件
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
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: {
          loader: "style-loader", // 应用与css没有被提取
          options: {
            singleton: true
          }
        },
        use: [{
          loader: "css-loader",
          options: {
            minimize: true
          }
        }]
      })
    }]
  },
  plugins: [extractTextPlugin, purifyCSS]
}