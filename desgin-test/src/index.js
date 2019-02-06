// 主题，接收状态变化，触发每个观察者
class Subject {
  constructor() {
    console.log(this,'this')
    this.state = 0
    this.observers = []
  }
  getState() {
    return this.state
  }
  setState(state) {
    this.state = state
    this.notifyAllObservers()
  }
  attach(observer) {
    this.observers.push(observer)
  }
  notifyAllObservers() {
    this.observers.forEach(observer => {
      observer.update()
    })
  }
}
//观察者，等待被触发
class observer {
  constructor(name, subject) {
    console.log(this, '2')
    this.name = name
    this.subject = subject
    this.subject.attach(this)
  }
  update() {
    console.log(`${this.name} update, state: ${this.subject.getState()}`)
  }
}

let s = new Subject()
let o1 = new observer('01', s)
let o2 = new observer('02', s)

s.setState(1)