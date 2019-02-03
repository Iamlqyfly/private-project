import Vue from 'vue'
import Router from 'vue-router'
const Star = () => import('../components/star/star')
const Goods = () => import('../components/goods/goods')
const Ratings = () => import('../components/ratings/ratings')
const Seller = () => import('../components/seller/seller')
// const Ratingselect = () => import('../components/ratingselect/ratingselect')

Vue.use(Router)


const routes = [
  {
    path: '/',
    redirect: '/Goods'  // 默认进入app页面的首页展示
  },{
    path: '/goods',
    component: Goods
  },{
    path: '/ratings',
    component: Ratings
  },{
    path: '/seller',
    component: Seller
  },{
    path: '/star',
    component: Star
  }
];

export default new Router({
  linkActiveClass: 'active',
  routes
})
