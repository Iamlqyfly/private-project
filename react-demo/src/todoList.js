import React, { Component , Fragment} from 'react';
import TodoItem from './todoItem'
class TodoList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inputValue: 'hello',
      list: []
    }
  }
  handleInputChange(e) {
    const value = this.input.value
    // this.input 指向inputdom元素 等价于e.target
    // const value = e.target.value
    this.setState(() => ({
      inputValue: value
    }))
    // this.setState({
    //   inputValue: e.target.value
    // })
  }
  handleBtnClick() {
    this.setState((preState) => ({
      list: [...preState.list, preState.inputValue],
      inputValue: ''
    }),() => {
      console.log(this.ul.querySelectorAll('div').length)
    })
    console.log(this.ul.querySelectorAll())
    // 等价与 避免不小心改变state的状态
    // this.setState({
    //   list: [...this.state.list, this.state.inputValue],
    //   inputValue: ''
    // })
  }
  handleItemDelete(index) {
    // 不推荐这种方式修改数据
    // this.state.list.splice(index, 1)
    // this.setState({
    //   list: this.state.list
    // })
    // immutable  state 不允许我们做任何的改变，如果需要改变，将值拷贝出来，进行修改--- 考虑后面性能优化
    // const list = [...this.state.list]
    // list.splice(index, 1)
    // this.setState({
    //   list: list
    // })
    // 等价与
    this.setState((preState) => {
      const list = [...preState.list]
      list.splice(index, 1)
      return {list}
    })
  }
 
  componentWillMount() {
    console.log('componentWillMount')
  }
  componentDidMount() {
    console.log('componentDidMount')
  }
   // 组件被更新之前，会自动被执行  return boolean   return false 告知页面不需要被更新
  shouldComponentUpdate() {
    console.log('shouldComponentUpdate ')
    return true
  }
  //组件被更新之前，会被自动执行，在shouldComponentUpdate之后执行，
  //如果shouldComponentUpdate return false那么不会被执行，只有返回true才会被执行
  componentWillUpdate() {
    console.log('componentWillUpdate')
  }
  // 组件更新完成后会被更新
  componentDidUpdate() {
    console.log('componentDidUpdate')
  }
  // 当组件从父组件接受参数，只要父组件的render函数重新被执行了，子组件的这个生命周期函数就会被执行 
  componentWillReceiveProps() {
    console.log('componentWillReceiveProps')
  }
  render() {
    console.log('render')
    return (
      <Fragment>
        <div>
          {/* 当用户选择该标签时，浏览器就会自动将焦点转到和标签相关的表单控件上 */}
          <label htmlFor="insertArea"> 输入内容</label>
          <input 
            id="insertArea"
            value={this.state.inputValue}
            onChange={this.handleInputChange.bind(this)}
          />
          <button onClick={this.handleBtnClick.bind(this)}>提交</button>
        </div>
        <ul ref={(ul) => this.ul = ul}>
          {this.getToDoItem()}
        </ul>
        {/* <ul>
          {
            this.state.list.map((item, index) => {
              return (
                <div>
                // 版本1
                  <TodoItem 
                    content={item} 
                    index={index} 
                    deleteItem={this.handleItemDelete.bind(this)}
                  />
                  //  版本2
                  <li 
                      key={index}
                      onClick={this.handleItemDelete.bind(this, index)}
                      dangerouslySetInnerHTML={{__html: item}}
                     >
                     dangerouslySetInnerHTML={{__html: item}}
                      不自动被转译 用这个属性 同时下面{item} 可以不用写了
                      {item}
                  </li>
                </div>
              )
            })
          }
        </ul> */}
      </Fragment>
    )
  }
  getToDoItem() {
    return this.state.list.map((item, index) => {
      return (
        <div key={index}>
          <TodoItem 
            content={item} 
            index={index} 
            deleteItem={this.handleItemDelete.bind(this)}
            ref={(input) => {this.input = input}}
          />
        </div>
      )
    })
  }
}

export default TodoList