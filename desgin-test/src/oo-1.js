class Person {
  constructor(name) {
    this.name = name
  }
  saysomething() {

  }
}
class A extends Person {
  constructor(name) {
    super(name)
  }
  saysomething() {

  }
}

let a = new A('a')
a.saysomething()
let b = new B('b')
b.saysomething()