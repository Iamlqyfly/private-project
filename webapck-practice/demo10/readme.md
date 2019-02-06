#### 自动生成 HTML

##### 为什么要自动生成 HTML

每次执行 webpack 打包生成 js 文件后，都必须在 index.html 中手动插入打包好的文件的路径。但在真实生产环境中，一次运行 webpack 后，完整的 index.html 应该是被自动生成的。例如静态资源、js 脚本都被自动插入了。为了实现这个功能，需要借助 HtmlWebpackPlugin 根据指定的 index.html 模板生成对应的 html 文件，还需要配合 html-loader 处理 html 文件中的<img>标签和属性

webpack 打包之后，可以在/dist/中查看自动生成的 index.html 文件

##### html 中引入的图片

html-loader
options
attrs: [img:src]

html 中引入的图片 打包出来的文图片会在与 index.html 同级的 src 目录下，这个 src 文件在 dist 文件夹下 与其他引用 css 文件中的图片存放的路径不一样

#### 什么是 Clean Plugin 和 Watch Mode？

在实际开发中，由于需求变化，会经常改动代码，然后用 webpack 进行打包发布。由于改动过多，我们/dist/目录中会有很多版本的代码堆积在一起，乱七八糟。

为了让打包目录更简洁，这时候需要 Clean Plugin，在每次打包前，自动清理/dist/目录下的文件
除此之外，借助 webpack 命令本身的命令参数，可以开启 Watch Mode：监察你的所有文件,任一文件有所变动,它就会立刻重新自动打包

##### 开启 Watch Mode

直接在 webpack 命令后加上--watch 参数即可：webpack --watch

想看到详细的打包过程，可以使用：webpack -w --progress --display-reasons --color。控制台就会以花花绿绿的形式展示出打包过程

##### 配合优化

cnpm i babel-core babel-preset-env bable-loader
公共代码提取出来
提前载入 webpack 加载代码 打包<script/> 插入到index.html文件中
html-webpack-inline-chunk-plugin inline-manifest-webpack-plugin
