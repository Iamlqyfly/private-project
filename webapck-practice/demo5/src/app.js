let clicked = false
window.addEventListener("click", function () {
  if (!clicked) {
    import("./base.css")
  }
})

// style-loader/useable 可以直接使用use（） 或者unuse()方法来加载/卸载css样式
// import base from "./base.css"
// var flag = false
// setInterval(function () {
//   if (flag) {
//     base.unuse()
//   } else {
//     base.use()
//   }
//   flag = !flag
// }, 500)