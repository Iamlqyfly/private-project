<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img :src="seller.avatar" alt="" width="64" height="64"/>
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description + '/' + seller.deliveryTime + '分钟送达'}}
        </div>
        <div class="supports" v-if="seller.supports">
          <div class="supports_desc">
            <span class="icon" :class="iconClassMap[seller.supports[0].type]"></span>
            <span class="text">{{seller.supports[0].description}}</span>
          </div>
        </div>
      </div>
      <div class="support-count"  v-if="seller.supports" @click.prevent="showDetails()">
        <span class="count">{{seller.supports.length + '个'}}</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="bulletin-wrapper" >
      <span class="bulletin-title"></span>
      <span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%"/>
    </div>
    <transition name="fade">
      <div class="detail" v-show="detailShow">
        <div class="detail-wrapper clearfix">
          <div class="detail-main">
            <h1 class="name">{{seller.name}}</h1>
            <div class="star-wrapper">
              <star :size="48" :score="seller.score"></star>
            </div>
            <div class="title">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>
            <ul v-if="seller.supports" class="supports">
              <li class="support-item" v-for="item in seller.supports" :key="item.id">
                <span class="icon" :class="iconClassMap[item.type]"></span>
                <span class="text">{{item.description}}</span>
              </li>
            </ul>
            <div class="title">
              <div class="line"></div>
              <div class="text">商家公告</div>
              <div class="line"></div>
            </div>
            <div class="bulletin">{{seller.bulletin}}</div>
          </div>
          <div class="detail-close">
            <i class="icon-close" @click="hideDetail()"></i>
          </div>
        </div>
      </div>
    </transition>

  </div>
       

</template>

<script>
import star from 'components/star/star'
export default {
  props:{
    seller: {
      type:Object
    }
  },
  components: {
    star
  },
  data() {
    return {
      detailShow: false
    }
  },
  created() {
    this.iconClassMap = ['decrease','discount','special','invoice','guarantee']
  },
  methods: {
    showDetails() {
      this.detailShow = true;
    },
    hideDetail() {
      this.detailShow = false;
    }
  },
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixin'
.header
  position: relative
  background: rgba(7,17,27,0.5)
  color: #fff 
  overflow: hidden
  .content-wrapper
    padding: 1.5rem .75rem 1.125rem .75rem
    display: flex
    font-size: .75rem
    .avatar
      img 
        border-radius: .125rem 
    .content
      margin-left: 1rem 
      .title
        margin: .125rem .375rem .5rem 0
        font-size: 1rem 
        color: rgb(255,255,255)
        .brand
          display: inline-block
          bg-image('brand')
          width: 1.875rem
          height: 1.125rem
          background-size: 1.875rem 1.125rem
          background-repeat: no-repeat 
        .name
          vertical-align: top 
          font-weight: bold
          line-height: 1.125rem 
      .description
        font-size: .75rem 
        color: rgb(255,255,255)
        font-weight: 200
        line-height: .75rem 
        margin-bottom: .625rem 
      .supports
        .icon
          display: inline-block
          width: .75rem
          height: .75rem
          background-size: .75rem .75rem
          background-repeat: no-repeat
          &.decrease
            bg-image('decrease_1')
          &.discount
            bg-image('discount_1')
          &.guarantee
            bg-image('guarantee_1')
          &.invoice
            bg-image('invoice_1')
          &.special
            bg-image('special_1')
        .text
          vertical-align: top 
          font-size: .625rem
          color: rgb(255,255,255) 
          line-height: .75rem  
    .support-count
      position: absolute
      right: .4375rem
      bottom: 2.88rem
      background-color rgba(0,0,0,0.2)
      color: rgb(255,255,255)
      font-size: .625rem
      border-radius: .875rem
      height 1.5rem
      line-height: 1.5rem
      text-align: center 
      padding: 0 .5rem 
      .count 
        vertical-align: top
      .icon-keyboard_arrow_right
        line-height: 1.5rem   
  .bulletin-wrapper
    position: relative
    height: 1.75rem
    line-height: 1.75rem
    padding: 0 .75rem
    overflow: hidden
    white-space: nowrap 
    text-overflow: ellipsis
    background rgba(7,17,27,0.2)
    .bulletin-title
      display inline-block
      width: 1.375rem
      height: .75rem
      bg-image('bulletin')
      background-size: 100% 100%
      background-repeat: no-repeat 
    .bulletin-text
      vertical-align: top
      font-size: .625rem
      margin: 0 .25rem  
    .icon-keyboard_arrow_right
      position: absolute
      right: .3rem
      top: .5rem
      font-size: .875rem
  .background
    position: absolute
    top: 0
    letf: 0
    z-index: -1
    width: 100%
    height: 100% 
    filter:blur(10px)   
  .detail 
    position: fixed
    top: 0
    left: 0
    z-index: 99
    width: 100%
    height: 100%
    background: rgba(7,17,27,.8)
    backdrop-filter: blur(.625rem)    
    .detail-wrapper
      min-height: 100%
      width: 100%
      .detail-main
        margin-top: 4rem 
        padding-bottom: 1.25rem     
        .name
          font-size: 1rem
          font-weight: 700
          color: rgb(255,255,255)
          line-height: 1.125rem
          text-align: center 
        .star-wrapper
          margin: 1rem 0 1.75rem 0
          text-align: center
        .title
          display: flex
          width: 80%
          margin: 0 2.25rem 
          .line 
            display: inline-block
            flex: 1
            height: .0625rem
            background: rgba(255,255,255,.2)
            margin: auto 
          .text 
            padding: 0 .75rem
            font-size: .875rem
            font-weight: 700
        .supports
          padding: 1.25rem 0 1.75rem 2.25rem
          .support-item
            color: #ffffff
            padding: 0 .375rem .75rem 1rem
            .icon
              display: inline-block
              width: 1rem
              height: 1rem
              margin-right: .375rem
              background-size: 100% 100%
              background-repeat: no-repeat
              &.decrease
                bg-image('decrease_2')
              &.discount
                bg-image('discount_2')
              &.guarantee
                bg-image('guarantee_2')
              &.invoice
                bg-image('invoice_2')
              &.special
                bg-image('special_2') 
            .text 
              font-size: .75rem
              font-weight: 200
              color: rgb(255,255,255)
        .bulletin
          padding: 1.25rem 3rem
          font-size: .75rem
          font-weight: 200
          color: rgb(255,255,255)
          line-height: 1.5rem  
    .detail-close
      position: absolute
      width: 2rem
      height: 2rem
      font-size: 2rem
      color: rgba(255,255,255,.5)
      left: 45%     
    &.fade-enter-active, &.fade-leave-active {
      transition: opacity .5s
    }
    &.fade-enter, &.fade-leave-active {
      opacity: 0
    }
          
                



</style>

