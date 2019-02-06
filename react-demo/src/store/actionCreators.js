import { CHANGE_INPUT_VALUE, INIT_LIST_ACTION } from './actionTypes'
import axios from 'axios'

export const getInputChangeAction = (value) => ({
  type: CHANGE_INPUT_VALUE,
  value
})

export const initListAction = (data) => ({
  type: INIT_LIST_ACTION,
  data
})
//使用actionCreator统一管理页面上的action

// 使用了redux-thunk后  使得action支持返回一个函数了
// export const getTodoList = () => {
//   return (dispatch) => {
//     axios.get('/todolist.json').then((res) => {
//       const action = initListAction(res.data)
//       console.log(action, 'ac')
//       dispatch(action)
//     })
//   }
// }