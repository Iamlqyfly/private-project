class ReadImg {
  constructor(fileName) {
    this.fileName = fileName
    // 初始化即从硬盘中加载,模拟
    this.loadFromDisk() 
  }
  dispaly() {
    console.log('dispaly..' + this.fileName)
  }
  loadFromDisk() {
    console.log('loading...' + this.fileName)
  }
}

class ProxyImg {
  constructor(fileName) {
    this.realImg = new ReadImg(fileName)
  }
  dispaly() {
    this.realImg.dispaly()
  }
}

//test

let proxyImg = new ProxyImg('1.png') 
proxyImg.dispaly()

/**
 * gainian: 代理模式
    使用者无权访问目标对象
    中间加代理，通过代理做授权和控制
 * scene
 * es6 proxy
 * 网页事件代理
 * div.addEventListener('click', function(e){
 *  var target = e.target
 *  if (target.nodeName.toLowerCase() === 'a') {
 *     alert(target.innerHTML)
 *  }
 * })
 */

 let star = {
   name: 'li**',
   age: 25,
   phone: '15115212345'
 }
  let agent = new Proxy(star, {
    get: function(target, key) {
      if (key === 'phone') {
        return '18580208122'
      } 
      if (key === 'price') {
        return 12300
      }
      return target[key]
    },
    set: function(target, key, val) {
      if (key === 'customPrice') {
        if (val < 100000) {
          throw new Error('the price is too low')
        } else {
          target[key] = val
          return true
        }
      }
    }
 })


// 主办方
console.log(agent.name)
console.log(agent.age)
console.log(agent.phone)
console.log(agent.price)

// 想自己提供报价（砍价，或者高价争抢）
agent.customPrice = 150000
// agent.customPrice = 90000  // 报错：价格太低
console.log('customPrice', agent.customPrice)