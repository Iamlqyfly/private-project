<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link :to="{path:'seller'}">商家</router-link>
      </div>
    </div>
    <keep-alive>
      <router-view :seller="seller"></router-view>
    </keep-alive>
    
  </div>
</template>

<script>
// vue-cli 里使用了 vue-loader，vue-loader会将 *.vue 的文件转换成 CommonJS 模块
// 上面这些内容会全部通过vue-loader解析,然后转化为vue能够使用的对象供vue使用
// vue-loader会利用postcss来自动补全浏览器的css差异,所以写一次css就可以支持其他浏览器差异
import header from 'components/header/header'
import axios from 'axios'

const ERR_OK = 0
export default{ // 导出默认输出一个对象
  data() {
    return {
      seller: {}
    }
  },
  components: {
    'v-header': header
  },
  created() {
    axios.get('static/data.json').then( res => {
      this.seller = res.data.seller
      console.log(this.seller)
    })
  },
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
// @import 'common/stylus/index'
.tab
  display: flex
  height: 2.5rem
  width: 100%
  font-size: .625rem
  color: rgb(77,85,93)
  border-bottom: 1px solid rgba(7,17,27,0.1)
  .tab-item 
    flex:1
    line-height: 2.5rem
    text-align: center
    a 
      display: block
      font-size: .875rem
      color: rgb(77,85,93)
      &.active
        color: rgb(240,20,20)  

</style>
