function mixins(...list) {
  return function(target) {
    Object.assign(target.prototype, ...list)
  }
}
const Foo = {
  foo(){
    alert('foo')
  }
}
// 装饰 MyClass
@mixins(Foo)
class MyClass {}
let obj = new MyClass();
obj.foo() // 'foo'


function readonly(target, name, descriptor){
  // descriptor对象原来的值如下
  // {
  //   value: specifiedFunction,
  //   enumerable: false,
  //   configurable: true,
  //   writable: true
  // };
  descriptor.writable = false;
  return descriptor;
}

class Person {
    constructor() {
        this.first = 'A'
        this.last = 'B'
    }

    @readonly // 装饰方法
    name() { return `${this.first} ${this.last}` }
}

var p = new Person()
console.log(p.name())
p.name = function () {} // 这里会报错，因为 name 是只读属性

/**
 * 扩展功能，原有功能不变且可直接使用
 */