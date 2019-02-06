import base from "./base.css";

var app = document.getElementById("app");
var div = document.createElement("div");
div.className = "box";
app.appendChild(div);

// 验证JS Tree Shaking
// import {
//   funcA
// } from './util'
// console.log(funcA())