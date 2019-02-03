#### 饿了么点餐系统
技术栈: vue2.0 + vuex + vue-router + axios+ webpack + better-scroll

#### 组件
-  商品列表页面
-  店铺评价页面
-  商家介绍页面
-  优惠活动页面
-  商品详情页面
-  评价star组件
-  商品添加、删除组件
-  优惠图标组件
-  目录、列表联动滚动
-  评论内容筛选
-  购物车
-  购买物品小球飞入动画
 
#### 接口请求
在vue1.x的时候，vue的官方推荐HTTP请求工具是vue-resource，但是在vue2.0的时候将推荐工具改成了axios
使用方式如下
```
axios.get(url).then((res)=>{
  this.seller = res.data
})
```
注意: 用axios请求本地json文件
记得要把json文件放到static里面去，否则请求接口报404 

使用方式
```
axios.get('static/data.json').then((res) => {
      this.seller = res.data.seller
    })
```    

##### 项目来源
项目来源与慕课网黄毅大牛的课程，对原项目代码进行了部分重构


## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```
