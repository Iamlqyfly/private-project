<template>
  <div class="seller-wrapper" ref="sellerWrapper">
    <div class="seller-content">
      <div class="info">
        <div class="title">
          <div class="text">{{seller.name}}</div>
          <div class="star-wrapper">
            <star :size="36" :score="seller.score"></star>
            <span class="rate-count">{{seller.ratingCount}}</span>
            <span class="sell-count">月售{{seller.sellCount}}单</span>
          </div>
          <div class="collect" @click="toggleFavorite">
            <span class="icon-favorite" :class="{'active': favorite}"></span>
            <span class="text">{{favorite ? '已收藏' : '收藏'}}</span>
          </div>
        </div>
        <div class="remark">
          <div class="block">
            <h2>起送价</h2>
            <div class="content">
              <span class="num">{{seller.minPrice}}</span>元
            </div>
          </div>
          <div class="block">
            <h2>商家配送</h2>
            <div class="content">
              <span class="num">{{seller.deliveryPrice}}</span>元
            </div>
          </div>
          <div class="block">
            <h2>平均配送时间</h2>
            <div class="content">
              <span class="num">{{seller.deliveryTime}}</span>元
            </div>
          </div>
        </div>
      </div>  
      <split></split>
        <div class="bulletin">
          <h1 class="title">公告与活动</h1>
          <div class="content">{{seller.bulletin}}</div>
        </div>
        <div class="supports">
          <ul>
            <li class="item" v-for="item in seller.supports" :key="item.id">
              <iconMap :iconType="item.type"></iconMap>
              <span class="text">{{item.description}}</span>
            </li>
          </ul>
        </div>
        <split></split>
        <div class="seller-pic">
          <h1 class="title">商家实景</h1>
          <div class="pic-wrapper" ref="picWrapper">
            <ul class="pic-list" ref="picList">
              <li class="pic-item" v-for="pic in seller.pics" :key="pic.id">
                <img :src="pic" width="120" height="90">
              </li>
            </ul>
          </div>
        </div>
        <split></split>
        <div class="seller-info">
          <h1 class="title border-1px">商家信息</h1>
          <ul>
            <li class="info-item" v-for="info in seller.infos" :key="info.id">{{info}}</li>
          </ul>
        </div> 
    </div>   
  </div>
</template>

<script>
import axios from 'axios'
import BScroll from 'better-scroll'
import star from 'components/star/star'
import iconMap from 'components/iconMap/iconMap'
import split from 'components/split/split'
 //引入一个利用html5的localstorage的存储模块
import { saveToLocal, loadFromLocal } from 'common/js/store';
export default {
  props: {
    seller: {
      type: Object
    }
  },
  components: {
    star,
    iconMap,
    split
  },
  data() {
    return {
      //vue需要返回的data必须是函数,所以加上()
      favorite: ( () => {
        return loadFromLocal(this.seller.id, 'favorite', false)
      })()
    }
  },
  created() {
    this._initListData()
  },
  methods: {
    _initListData() {
      axios.get('static/data.json').then( res => {
        // this.seller = res.data.seller
        this.$nextTick( () => {
          this.sellerWrapper = new BScroll(this.$refs.sellerWrapper,{
            click: true
          })
          this._initPicsScroll()
        })
      })
    },
    _initPicsScroll() { //编程习惯的前置下划线,代表内部使用的方法
     if(this.seller.pics) {
        let picWidth = 120, margin = 6
        let width = (picWidth + margin ) * this.seller.pics.length - margin
        this.$refs.picList.style.width = width + 'px'
        // this.$refs.picList.style.width = `${width}px`
        this.picsScroll = new BScroll(this.$refs.picWrapper,{
          scrollX: true,
          eventPassthrough: 'vertical' //bscroll的过滤垂直滚动
        })
     }
    },
    toggleFavorite(event) {
      if (!event._constructed) {
        return;
      }
        //通过取反来设置切换
      this.favorite = !this.favorite;
        //利用localstorage存储这个属性
       saveToLocal(this.seller.id, 'favorite', this.favorite);
    }

  },
}
</script>

<style lang="stylus" scoped>
.seller-wrapper
  position: absolute
  width: 100%
  overflow: hidden
  bottom: 0
  left: 0
  top: 10.875rem
  .seller-content
    .info
      padding: 1.125rem 0
      .title
        padding: 0 1.125rem 1.125rem
        border-bottom: 1px solid rgba(7,17,27,0.1)
        .text
          color: rgb(7,17,27)
          font-size: .875rem
          line-height: .875rem
          margin-bottom: .5rem
        .star-wrapper
          font-size: 0
          .star
            display: inline-block
          .rate-count,.sell-count
            vertical-align: top 
            display: inline-block
            font-size: .625rem
            color: rgb(77,85,93)
            line-height: 1.125rem
          .rate-count
            padding 0 .75rem 0 .5rem
        .collect
          position absolute
          right: 1.125rem
          top: 1.125rem
          text-align: center
          .icon-favorite
            font-size: 1.5rem
            line-height: 1.5rem
            color: #d4d6d9
            &.active
              color: rgb(240,20,20)
          .text
              display: block
              font-size: .625rem
              line-height: .625rem
              color: rgb(77,85,93)
              margin-top: .25rem
      .remark
        display: flex
        padding-bottom: 1.125rem
        .block
          flex: 1
          margin-top: 1.125rem
          text-align:center
          &:last-child 
            border:none
          h2 
            line-height: .625rem
            font-size: .625rem
            color: rgb(147,153,159)
            margin-bottom: .25rem    
          .content
            font-weight: 200
            color: rgb(7,17,27)
            line-height: 1.5rem
            .num
              font-size: 1.5rem
          
    .bulletin 
      padding: 1.125rem 1.125rem 1.125rem 1rem
      border-bottom: 1px solid rgba(7,17,27,0.1) 
      .title  
        line-height: .875rem
        font-size: .875rem
        color: rgb(7,17,27)
      .content
        margin: 0 .75rem
        font-size: .75rem
        color:rgb(240,20,20)
        line-height: 1.5rem
        font-weight: 200
        margin-top: .5rem
    .supports
      padding: 1.125rem 1.125rem 1.125rem 1rem 
      .item
        padding: 1rem .75rem
        border-bottom: 1px solid rgba(7,17,27,0.1)
        .iconMap
          width: 1rem
          height: 1rem
          background-size: 1rem 1rem
          background-repeat: no-repeat
          margin-right: .375rem
        .text
          vertical-align: top 
          font-size: .75rem
          font-weight: 200 
          color: rgb(7,17,27)
          line-height: 1rem
    .seller-pic
      padding: 1.125rem
      overflow hidden
      .title
        line-height: .875rem
        font-size: .875rem
        color: rgb(7,17,27)
        margin-bottom: .75rem
      .pic-wrapper
        .pic-list
          display: flex
          columns: row
          img
            margin-right: .375rem
    .seller-info
      padding: 1.125rem
      .title
        font-size: .875rem
        color: rgb(7,17,27)
        margin-bottom: .75rem
        border-bottom 1px solid rgba(7,17,27,0.1)
      .info-item
        padding: 1rem .75rem
        font-size: .75rem
        font-weight: 200
        color: rgb(7,17,27)
        line-height: 1rem
        border-bottom: 1px solid rgba(7,17,27,0.1)     

       
</style>
