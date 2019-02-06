#### JS Tree Shaking

通过设置 mode: 'production',   
使用 -p(production) 这个 webpack 编译标记，来启用 UglifyJSPlugin 插件
或者，也可以在命令行接口中使用 --optimize-minimize 标记，来启用 UglifyJSPlugin。

#### CSS Tree Shaking
npm install glob purifycss-webpack purify-css --save-dev
