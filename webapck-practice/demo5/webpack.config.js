const path = require("path");

module.exports = {
  entry: {
    app: "./src/app.js"
  },
  output: {
    publicPath: "./dist/",
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js"
  },
  module: {
    rules: [{
      test: /\.css$/,
      //css 处理为style标签
      use: [{
          loader: "style-loader",
          options: {
            singleton: true, // 处理为单个style标签
            transform: "./css.transform.js"
          }
        },
        {
          loader: "css-loader",
          options: {
            minimize: true // css代码压缩
          }
        }
      ]
      // css 处理为link标签 <link type="text/css" href="./dist..">
      // use: [{
      //     loader: "style-loader/url"
      //   },
      //   {
      //     loader: "file-loader"
      //   }
      // ],
      // css 卸载和加载样式
      // use: [{
      //     loader: "style-loader/useable"
      //   },
      //   {
      //     loader: "css-loader"
      //   }
      // ]
    }]
  }
}