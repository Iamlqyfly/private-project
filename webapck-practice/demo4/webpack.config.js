/**
 * 1. 针对单页应用提取公共代码需要通过代码分割和懒加载
 * 2. 代码分割和懒加载是通过代码写法来实现，并不是通过webpack配置来实现。更多请见: ./src/page.js
 */
const webpack = require("webpack");
const path = require("path");

module.exports = {
  entry: {
    page: "./src/page.js" //
    // subPageA: "./src/subPageA.js",
    // subPageB: "./src/subPageB.js",
  },
  output: {
    publicPath: __dirname + "/dist/",
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js",
    chunkFilename: "[name].chunk.js"
  }
};
// require.include("./module.js"); // 将subPageA和subPageB共用的module.js打包在此page中
//
// require.ensure(
//   ["./subPageA.js", "./subPageB.js"],
//   function () {
//     var subPageA = require("./subPageA");
//     var subPageB = require("./subPageB");
//   },
//   "subPage"
// );
//
// require.ensure(
//   ["lodash"],
//   function () {
//     var _ = require("lodash");
//     _.join(["1", "2"]);
//   },
//   "vendor"
// );