#### 图片处理汇总

- url-loader 的工作流程如下：

获取 limit 参数
如果 文件大小在 limit 之类，则直接返回文件的 base64 编码后内容
如果超过了 limit ，则调用 `file-loader

- img-loader --- 压缩配置
  图片压缩需要使用 img-loader，除此之外，针对不同的图片类型，还要引用不同的插件。比如，我们项目中使用的是 png 图片，因此，需要引入 imagemin-pngquant，并且指定压缩率
