module.exports = {
  entry: {
    app: './app.js'
  },
  output: {
    // filename: '[name].[hash:5].js'
    filename: 'bundle.js'
  }
}
// webpack --config webpack.conf.js  指定打包配置文件