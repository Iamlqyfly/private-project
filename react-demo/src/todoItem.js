import React, { Component , Fragment} from 'react';
import PropTypes from 'prop-types'

class TodoItem extends Component {
  // 当组件的state或者props发生改变时，render函数就会重新执行 页面是由render函数渲染出来的，所以数据一改变，那么页面就会得到渲染
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    // 节约一些性能 cha
  }
  // 一个组件从父组件接受参数，只要父组件的render函数重新被执行了， 子组件的这个生命周期函数就会被执行 
  // 如果这个组件第一次存在于父组件中，不会执行
  // 如果这个组件之前已经存在于父组件中，才会执行
  componentWillReceiveProps() {
    console.log(' child componentWillReceiveProps')
  }
  // 可以提升性能，如果父组件content没有改变，那么子组件就不需要更新 直接return false，就不会调用componentWillUpdate 生命周期组件
  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.content != this.props.content) {
      return true
    } else {
      return false
    }

  }
  // 组件被移除页面
  componentWillUnmount() {
    console.log('child componentWillUnmount')
  }
  render() {
    const { content } = this.props
    return (
      <div 
        onClick={this.handleClick}    
      >
       {/* {this.props.content} */}
       {content}
      </div>  
    )  
    // 接受父组件传来的值
  }
  handleClick() {
    console.log(this, 'this') // 
    const { deleteItem, index } = this.props
    deleteItem(index)
    // this.props.deleteItem(this.props.index)
    // this.props.deleteItem 等价于 this.handleItemDelete 
  }
}
TodoItem.PropTypes = {
  content: PropTypes.string.isRequired, // 必须传递
  deleteItem: PropTypes.func,
  index: PropTypes.arrayOf(PropTypes.number, PropTypes.string)
}
// 如果父组件没有传值过来，但是子组件又必须得传值，那么可以给一个默认值
TodoItem.defaultProps = {
  content: 'hello'
}
export default TodoItem