const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output: {
    path: __dirname,
    filename: './release/bundle.js'
  },
  plugins: [
    new htmlWebpackPlugin({
      // 指定你生成的文件所依赖哪一个html文件模板
      template: './index.html'
    })
  ],
  // module: {
  //   rules: [{
  //       test: /\.js?$/,
  //       exclude: /(node_modules)/,
  //       loader: 'babel-loader'
  //   }]
  // },
  devServer: {
    contentBase: path.join(__dirname, './release'), // 根目录
    open: true, // 自动打开浏览器
    port: 9000
  }
}