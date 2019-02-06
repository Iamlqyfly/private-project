const marked = require('marked')
const loaderUtils = require('loader-utils')

module.exports = function(markdown) {
  // 使用loaderUtils 来获取loader的配置项 this是构建运行时的一些上下文信息
  // 可以通过this访问loader api this是由webpack提供的，可以直接使用
  const options = loaderUtils.getOptions(this)
  this.cacheable()
  // 把配置项直接传递给marked
  marked.setOptions(options) 
  // 使用marked处理markdown 字符串，然后返回
  const result = marked(markdown)
  return result
}