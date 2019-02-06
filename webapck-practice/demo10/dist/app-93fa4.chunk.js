(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[1],[
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _vendor_sum__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
console.log("This is entry js"); // ES6


console.log("sum(1, 2) = ", Object(_vendor_sum__WEBPACK_IMPORTED_MODULE_0__["sum"])(1, 2)); // CommonJs

var minus = __webpack_require__(2);

console.log("minus(1, 2) = ", minus(1, 2));

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sum", function() { return sum; });
function sum(a, b) {
  return a + b;
}

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = function (a, b) {
  return a - b;
};

/***/ })
],[[0,0]]]);