import axios from 'axios'
import * as constants from './actionTypes'
// import { dispatch } from 'rxjs/internal/observable/pairs';

const changeLogin = () => ({
  type: constants.CHANGE_LOGIN,
  value: true
})

export const logout = () => ({
  type: constants.LOGOUT,
  value: false
})

export const login = (accout, password) => {
  return (dispatch) => {
    axios.get('/api/login.json?accout=' + accout + '&password=' + password).then(res => {
      const result = res.data.data
      if (result) {
        dispatch(changeLogin())
      } else {
        alert('登录失败')
      }
    })
  }
}