class jQuery {
  constructor(selector) {
    let slice = Array.prototype.slice
    // to array
    let dom = slice.call(document.querySelector(selector))
    let len = dom ? dom.length : ''
    for (let i = 0; i < len; i++) {
      this[i] = dom[i]
    }
    this.length = len
    this.selector = selector || ''
  }
  append(node) {}
  addClass(name) {}
}

// 工厂模式
window.$ = function (selector) {
  return new jQuery(selector)
}

// test code

let p = $('p')
console.log(p)
