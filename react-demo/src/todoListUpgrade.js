import React, { Component } from 'react';
// import { Input, Button, List } from 'antd'
import { CHANGE_INPUT_VALUE, CHANGE_ADD_VALUE, CHANGE_DELETE_VALUE, INIT_LIST_ACTION } from './store/actionTypes'
import store from './store'
import axios from 'axios'
import { getInputChangeAction, initListAction } from './store/actionCreators'
import TodoListUpgradeUI from './todoListUpgradeUI'

class TodoListUpgrade extends Component{
  constructor(props) {
    super(props)
    this.state = store.getState()
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleStoreChange = this.handleStoreChange.bind(this)
    this.handleBtnClick = this.handleBtnClick.bind(this)
    this.handleDeleteItem = this.handleDeleteItem.bind(this)
    store.subscribe(this.handleStoreChange)
  }
  componentDidMount() {
    // const action = getTodoList()
    // console.log(action) // 返回的是一个函数
    // store.dispatch(action)
    axios.get('/todolist.json').then((res) => {
      const action = initListAction(res.data)
      console.log(action)
      store.dispatch(action)
    })
  }
  handleInputChange(e) {
    // const action = {
    //   type: CHANGE_INPUT_VALUE,
    //   value: e.target.value
    // }
    const action = getInputChangeAction(e.target.value)
    store.dispatch(action) // store将当前数据+action数据传递给reducer
  }
  handleStoreChange() {
    this.setState(store.getState())
  }
  handleBtnClick() {
    const action = {
      type: CHANGE_ADD_VALUE
      // value: this.s 
    }
    store.dispatch(action)
  }
  handleDeleteItem(index) {
    const action = {
      type: CHANGE_DELETE_VALUE,
      index
    }
    store.dispatch(action) // 把action发送给store 由reducer接受store传来的值
  }
  render() {
    return (
      <TodoListUpgradeUI 
        inputValue={this.state.inputValue} 
        list={this.state.list}
        handleInputChange={this.handleInputChange}
        handleBtnClick={this.handleBtnClick}
        handleDeleteItem={this.handleDeleteItem}
      />
    )
    // return (
    //   <div style={{marginTop: '10px', marginLeft: '10px'}}>
    //     <div>
    //       <Input 
    //         value={this.state.inputValue}
    //         placeholder='todo info' 
    //         style={{width: '300px'}}
    //         onChange={this.handleInputChange}
    //       />
    //       <Button type="primary" onClick={this.handleBtnClick}>提交</Button>
    //     </div>
    //     <List
    //       bordered
    //       dataSource={this.state.list}
    //       renderItem={(item, index) => (<List.Item onClick={this.handleDeleteItem.bind(this, index)}>{item}</List.Item>)}
    //     />
    //   </div>
    // )
  }
}

export default TodoListUpgrade