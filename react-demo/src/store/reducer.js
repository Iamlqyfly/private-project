import { CHANGE_INPUT_VALUE, CHANGE_ADD_VALUE, CHANGE_DELETE_VALUE, INIT_LIST_ACTION  } from './actionTypes'

const defaultState = {
  inputValue: '111',
  list: [1,2]
}
//reducer 负责管理应用的数据 可以接受state，但是不能修改state
export default (state = defaultState, action) => {
  // state  所有存储的数据
  if (action.type === CHANGE_INPUT_VALUE) {
    const newState = JSON.parse(JSON.stringify(state)) //  拷贝之前的数据
    newState.inputValue = action.value
    return newState
  }
  if (action.type === INIT_LIST_ACTION ) { // 异步获取数据
    const newState = JSON.parse(JSON.stringify(state)) //  拷贝之前的数据
    newState.list = action.data
    return newState
  }
  if (action.type === CHANGE_ADD_VALUE) {
    const newState = JSON.parse(JSON.stringify(state))
    newState.list.push(newState.inputValue)
    newState.inputValue = ''
    return newState
  }
  if (action.type === CHANGE_DELETE_VALUE) {
    const newState = JSON.parse(JSON.stringify(state))
    newState.list.splice(action.index, 1)
    console.log(newState.list, 'new')
    return newState
  }
  return state
  
}