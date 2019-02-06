import sum from './sum' //es6
console.log("sum(1, 2) =", sum(1, 2))

var minus = require('./minus') //commonjs
console.log("sum(1, 2) =", sum(1, 2))


// require(['muti'], function (muti) { //amd 异步加载模块 会形成两个chunk mian he 0 
//   console.log('muti(1,2)=', muti(1, 2))
// })