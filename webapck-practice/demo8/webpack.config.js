/**  * 1. url-loader: 处理图片, Base64编码
 * 2. img-loader: 压缩图片. 不同类型的图片配合不同的插件, 例如: png配合imagemin-pngquant
 * 3. postcss-loader 与 postcss-sprites: 合成雪碧图, 减小HTTP请求. 注意合成后的图片文件大小
 */
const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const autoprefixer = require('autoprefixer');

let extractTextPlugin = new ExtractTextPlugin({
  filename: "[name].min.css",
  allChunks: false
})

let spritesConfig = {
  spritePath: "./dist/static"
}

module.exports = {
  mode: 'production',
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
            loader: "style-loader"
          },
          use: [{
              loader: "css-loader",
              // options: {
              //   minimize: true
              // }
            },
            {
              loader: "postcss-loader",
              options: {
                ident: "postcss",
                // retina: true, // 支持ratina，把图片格式改为如 1@2x.png...
                plugins: [
                  require("autoprefixer")("last 100 versions"),
                  require("postcss-sprites")(spritesConfig)
                  // {
                  //   spritePath: "./dist/static/img/sprites"
                  // }
                  // require("postcss-cssnext")()
                ]
              }
            }
          ]
        })
      },
      {
        test: /\.(eot|woff2?|ttf|svg)$/,
        use: [{
          loader: "url-loader",
          options: {
            name: "[name]-[hash:5].min.[ext]",
            limit: 5000, // fonts file size <= 5KB, use 'base64'; else, output svg file
            publicPath: "fonts/",
            outputPath: "fonts/",
            useRelativePath: true
          }
        }]
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: [{
          loader: 'file-loader',
          options: {
            // publicPath: '', // 根目录，如果打包出来css引入路径有问题，加上这个
            outputPath: 'dist/',
            useRelativePath: true
          }
        }]
      }
      // {
      //   // 打包成6、base64编码
      //   test: /\.(png|jpg|jpeg|gif)$/,
      //   use: [{
      //       loader: "url-loader",
      //       options: {
      //         name: "[name]-[hash:5].min.[ext]",
      //         limit: 1000, // size <= 1KB
      //         publicPath: "static/",
      //         outputPath: "static/"
      //       }
      //     },
      //     { // img-loader for zip img
      //       loader: "img-loader",
      //       options: {
      //         plugins: [
      //           require("imagemin-pngquant")({
      //             quality: "80" // thie quality of zip
      //           })
      //         ]
      //       }
      //     }
      //   ]
      // }

    ]
  },
  plugins: [extractTextPlugin]
}