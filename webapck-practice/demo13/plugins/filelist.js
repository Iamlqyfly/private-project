class FileListPlugin {
  constructor(options) {}

  apply(compiler) {
    compiler.hooks.emit.tap('FileListPlugin', (compilation) => {
       // 在生成的文件中，创建一个头部字符串
      var fileList = 'In this build\n\n'
      // 遍历所有编译过的资源文件 对于每个文件名称，都添加一行内容
      for (var filename in compilation.assets) {
        fileList += ('-' + filename + '\n')
      }
       // 将这个列表作为一个新的文件资源，插入到webpack构建中
      compilation.assets['fileList.md'] => {
        source: function() {
          return fileList
        },
        size: function() {
          return fileList.length
        }
      }
    })
  }
}

module.exports = FileListPlugin