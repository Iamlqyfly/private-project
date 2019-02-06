##### 技术栈
react + redux + redux-thunk（让redux支持异步的中间件） + webpack + react-router + ES6/7/8 + axios + react-transition-group（react动画库）+ react-loadable（使组件按需载） + styled-components（css组件化） + immutable.js

##### immutable.js与redux结合使用
当我们对一个Immutable对象进行操作的时候，ImmutableJS基于哈希映射树(hash map tries)和vector map tries，只clone该节点以及它的祖先节点，其他保持不变，这样可以共享相同的部分，大大提高性能。在对Immutable对象的操作均会返回新的对象，所以使用redux的reducer中就不需要总是想着不能修改原state，因为对Immutable对象的操作返回就是新的对象，且比普通js深拷贝产生的性能消耗要低得多


###### 避免无意义的网络请求
比如在请求热门搜索提示项的时候，只有当size是0的时候我才去发送请求
``` 
  const mapDispathToProps = dispatch => {
  return {
    handleInputFocus(list) {
      list.size === 0 && dispatch(actionCreators.getList());
      dispatch(actionCreators.searchFocus());
    },
  ...
    };
```

##### 使用PureComponent
继承Component的普通组件，使用react-redux的connect连接了store，那么只要store内的数据发生改变就会让所有连接的组件触发render，这样就会产生不必要的渲染开销，当然使用shouldComponentUpdate也可以阻止不必要的渲染，但这样的话每个组件都要写同样的shouldComponentUpdate方法；继承PureComponent的组件正好解决了这一痛点，默认实现的shouldComponentUpdate

###### this绑定优化
当使用bind()绑定时，最好把所有需要绑定的方法都放在构造函数constructor中，这样就仅需要绑定一次就可以，避免每次渲染时都要重新绑定，函数在别处复用时也无需再次绑定。
```
import React, {Component} from 'react'

class Test extends React.Component {
    constructor (props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick (e) {
    }

    render () {
        return (
            <div>
                <button onClick={ this.handleClick }>Say Hello</button>
            </div>
        )
    }
}
```
箭头函数则会捕获其所在上下文的this值，作为自己的this值，使用箭头函数就不用担心函数内的this不是指向组件内部了。可以按下面这种方式使用箭头函数：
```
class Test extends React.Component {
    constructor (props) {
        super(props)
        this.state = {message: 'Allo!'}
    }

    handleClick (e) {
        console.log(this.state.message)
    }

    render () {
        return (
            <div>
                <button onClick={ ()=>{ this.handleClick() } }>Say Hello</button>
            </div>
        )
    }
}
```
使用这个语法有个问题就是每次 Test 渲染的时候都会创建一个不同的回调函数。在大多数情况下，这没有问题。然而如果这个回调函数作为一个属性值传入低阶组件，这些组件可能会进行额外的重新渲染。我们通常建议在构造函数中绑定或像下面代码使用属性初始化器语法来避免这类性能问题。
```
class Test extends React.Component {
    constructor (props) {
        super(props)
        this.state = {message: 'Allo!'}
    }

    handleClick = (e) => {
        console.log(this.state.message)
    }

    render () {
        return (
            <div>
                <button onClick={ this.handleClick }>Say Hello</button>
            </div>
        )
    }
}
```
##### 使用 React-Loadable 动态加载bundle
Loadable 是一个高阶组件（创建组件的function）用来轻易地在组件层面拆分bundle
使用： 把要加载的组件和当你加载组件时的“Loading”组件传入一个方法中
```
import Loadable from 'react-loadable';
function MyLoadingComponent({error}) {
    if (error) {
      return <div>Error!</div>
    } else {
      return <div>Loading...</div>;
    } 
}

const LoadableAnotherComponent = Loadable(
  () => import('./another-component'),
  MyLoadingComponent
);

class MyComponent extends React.Component {
  render() {
    return <LoadableAnotherComponent/>;
  }
}
```

[Immutable 详解及 React 中实践 #3](https://github.com/camsong/blog/issues/3)