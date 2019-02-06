const path = require('path')
// const FileListPlugin = require('./plugins/filelist')

module.exports = {
  entry: './src/index.js',
  
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  
  module: {
    rules: [
      {
        test: /\.js?/,
        include: [
          path.resolve(__dirname, 'src'),
        ],
        use: 'babel-loader',
      },
      {
        test: /\.md$/,
        use: [
          {
            loader: 'html-loader'
          },
          path.resolve('./loaders/markdown.js')
        ]
      }
    ]
  },

  plugins: [
    // new FileListPlugin()
  ]
}