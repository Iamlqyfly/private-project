var baseConfig = {
  entry: {
   react: ['react']
  },
  output: {}
}

//  生成每一个入口的配置入口函数
const generatePage = function({
  title = '',
  entry = '',
  template = './src/index.html',
  name = '',
  chunks = []
} = {}) {
  return {
    entry,
    plugins: [
      new HtmlWebpackPlugin({
        chunks,
        title,
        template,
        filename: name + '.html'
      })
    ]
  }
}

const pages = [
  generatePage({
    title: 'page A',
    entry: {
      a: './src/pages/a'
    },
    name: 'a',
    // 公用代码react+ self 
    chunks: ['react','a']
  }),

  generatePage({
    title: 'page b',
    entry: {
      b: './src/pages/b'
    },
    name: 'b',
    // 公用代码react+ self 
    chunks: ['react','b']
  }),

  generatePage({
    title: 'page c',
    entry: {
      c: './src/pages/c'
    },
    name: 'c',
    // 公用代码react+ self 
    chunks: ['react','c']
  }),
]

module.exports = pages.map(
  page => merge(baseConfig,page)
)
 // 多页面合并

 // 单页面配置
 module.exports = merge([baseConfig].concat(pages))
