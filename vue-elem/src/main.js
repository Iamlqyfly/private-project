// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue' // 导入内置的vue模块(npm的node_module里面)
import App from './App'  // 导入当前目录的App文件为App
import VueResource from 'vue-resource';
import router from './router/index.js';
import 'common/stylus/index.styl'
import '../static/css/reset.css';
import 'common/js/filter.js';
Vue.use(VueResource)


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  //components: { App }  vue1.0的写法
  render: h => h(App),   //vue2.0的写法
  template: '<App/>' //主组件的模板 App其实就是App.vue
})
