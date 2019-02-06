import { createStore, applyMiddleware, compose } from 'redux'
import reducer from './reducer' // 
// import thunk from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'
import todoSagas from './sagas'

const sagaMiddleware = createSagaMiddleware()

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const enhancer = composeEnhancers(
  // applyMiddleware(thunk),
  applyMiddleware(sagaMiddleware),
  // other store enhancers if any
);  
const store = createStore(reducer, enhancer)
sagaMiddleware.run(todoSagas)

export default store

/**
 * createStore 接受两个参数，一个是表示应用程序状态的 state；
 * 另外一个是 stateChanger，它来描述应用程序状态会根据 action 发生什么变化
 * createStore 会返回一个对象，对象包含两个方法getState和dispatch
 * getState 用于获取state数据
 * dispatch 用于修改数据，和以前一样会接受 action，然后它会把 state 和 action 一并传给 stateChanger，
 * 那么 stateChanger 就可以根据 action 来修改 state 了
 * store是唯一的，只有store能够改变自己的内容，reducer改变不了store的内容 

 */