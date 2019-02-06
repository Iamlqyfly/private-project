#### 长缓存优化
##### 1.场景 
  改变app代码，vendor变化
  
解决
-   提取vendor
-   hash -> chunkhash
-   提取 webpack runtime
  webpack 4  以下用CommonsChunkPlugin 
  ```
  new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity
  })
  
  new webpack.optimize.CommonsChunkPlugin({
      name: 'minifest' //提取 webpack runtime
  })
  ```
  
 ##### 2. 场景
  引入新模块，模块顺序变化，vendor hash变化


  解决  不使用随机生产的id，使用命名的方式解决
  ```
  new webpack.NamedChunksPlugin()
  new webpack.NamedModulesPlugin(),
  ```
 ##### 3.场景 
  动态引入模块 ，vendor hash变化
  
  新版的webpack这个功能已经解决了，老版本可以使用 定义动态模块的chunkname解决
  ```
  import(/*webpackChunkName: 'async'*/,'./async').then(function(){})
  ```
  #### 总结
-   独立打包vendor
-   抽出manifest--webpack.runtime
-   使用NamedChunksPlugin + NamedModulesPlugin
-   动态模块给定  模块名称