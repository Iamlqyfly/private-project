import React from 'react';
import Router from './router'
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import TodoList from './todoList';
import TodoListUpgrade from './todoListUpgrade';

import ReactReduxTodoList from './reactReduxTodoList';
import { Provider } from 'react-redux'
import store from './storeReactRedux'

import registerServiceWorker from './registerServiceWorker';

// const App = (
//   // <Provider store={store}>
//   //   <ReactReduxTodoList />
//   // </Provider>
// )
// 这样写报错说得到了一个对象
ReactDOM.render(
  <Provider store={store}>
    <ReactReduxTodoList />
  </Provider>, 
  document.getElementById('root'));
registerServiceWorker();
