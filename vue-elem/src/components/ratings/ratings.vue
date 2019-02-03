<template>
  <div class="ratingsWrapper" ref="ratingsWrapper">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{seller.score}}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <star :size="36" :score="seller.serviceScore"></star>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <star :size="36" :score="seller.foodScore"></star>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="delivery-warpper">
            <span class="title">送达时间</span>
            <span class="delivery">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <split></split>
      <ratingselect @select="selectRating" @toggle="toggleContent" 
                    :selectType="selectType" 
                    :onlyContent="onlyContent"
                    :ratings="ratings">
      </ratingselect>
      <div class="rating-wrapper">
        <ul>
          <li v-for="rating in ratings" v-show="needShow(rating.rateType, rating.text)" class="rating-item">
            <div class="avatar">
              <img width="28" height="28" :src="rating.avatar">
            </div>
            <div class="content">
              <h1 class="name">{{rating.username}}</h1>
              <div class="star-wrapper">
                <star :size="24" :score="rating.score"></star>
                <span class="delivery" v-show="rating.deliveryTime">{{rating.deliveryTime}}</span>
              </div>
              <p class="text">{{rating.text}}</p>
              <div class="recommend" v-show="rating.recommend && rating.recommend.length">
                <span class="icon-thumb_up"></span>
                <span class="item" v-for="item in rating.recommend">{{item}}</span>
              </div>
              <div class="time">
                {{rating.rateTime | formatDate}}
              </div>
            </div>
          </li>
        </ul>
      </div>
      <!--
      <div class="remark">
        <div class="classify">
          <span class="item" v-for="(item, index) in classifyList" :key="item.id"
          :class="{'active': item.active, 'bad': index == 2, 'badActive': item.active&&index == 2}">
           {{item.naem}}<span class="count">{{item.count}}</span>
          </span>
        </div>
        <div class="switch">
          <span class="icon-check_circle" :class="{'on': checkDetailFlag}"></span>
          <span class="text">只看有内容的评价</span>
        </div> 
        <div class="remark-list">
          <ul>
            <li class="remark" v-for="remark in remarkDetailList" :key="remark.id">
              <div class="avatar">
                <img :src="remark.avatar" width="28" height="28" alt="">
              </div>
              <div class="user">
                <span class="username"></span>
                <span class="rateTime">{{remark.rateTime | time}}</span>
              </div>
              <div class="star-wrapper">
                <star :size="24" :score="remark.score"></star>
                <span class="deliveryTime">{{remark.deliveryTime}}分钟送达</span>
              </div>
              <div class="text">{{remark.text}}</div>
              <div class="recommend">
                <span class="icon icon-thumb_up" v-show="remark.recommend.length"></span>
              </div>
            </li>
          </ul>
        </div> 
      </div>
      -->

    </div>
  </div>
</template>

<script>
import axios from 'axios'
import star from 'components/star/star'
import split from 'components/split/split'
import ratingselect from 'components/ratingselect/ratingselect'
import BScroll from 'better-scroll'

const ALL = 2;

export default {
  //在app.vue里面,router-view会传入一个seller
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      remarkDetailList: [],
      checkDetailFlag: false,
      ratings: [],
      selectType: ALL,
      onlyContent: true
      // classifyList: [
      //   {
      //     name: '全部',
      //     count: 0,
      //     active: true
      //   },{
      //     name: '推荐',
      //     count: 0,
      //     active: false
      //   },{
      //     name: '吐槽',
      //     count: 0,
      //     active: false
      //   }
      // ],

    }
  },
  components: {
    star,
    split,
    ratingselect
  },
  created() {
     this._initListData()
  },
  methods: {
    _initListData() {
      axios.get('static/data.json').then( res => {
        this.ratings = res.data.ratings
      })
    },
    needShow(type, text) {
     
      if (this.onlyContent && !text) {
        return false;
      }
      // debugger
      if (this.selectType === ALL) {
        return true;
      } else {
        return type === this.selectType;
      }
    },
    selectRating(type) {
      this.selectType = type;
      this.$nextTick(() => {
        this.scroll.refresh();
      });
    },
    toggleContent() {
      this.onlyContent = !this.onlyContent;
      this.$nextTick(() => {
        this.scroll.refresh();
      });
    }
  }

}
</script>

<style lang="stylus">
@import "../../common/stylus/mixin.styl"
.ratings-content
  position: absolute
  top: 10.875rem
  left: 0
  width: 100%
  overflow: hidden
  bottom: 0
  .overview
    display: flex
    padding: 1.125rem 0
    .overview-left
      flex: 0 0 8.625rem
      width: 8.625rem
      border-right: 1px solid rgba(7,17,27,0.1)
      text-align: center 
      .score 
        margin-bottom: .375rem
        font-size: 1.5rem
        color: rgb(255,153,0)
        line-height: 1.75rem
      .title
        font-size: .75rem
        line-height: .75rem
        margin-bottom: .5rem
      .rank
        font-size: .625rem
        color: rgb(147, 153, 159)
        line-height: .625rem          
    .overview-right
      flex: 1 
      padding: 0 1.5rem
      .score-wrapper
        margin-bottom: .5rem
        .title
          display: inline-block
          font-size: .75rem
          color: rgb(7,17,27)
          line-height: 1.125rem 
        .star 
          vertical-align: middle 
          display: inline-block
          margin: 0 .75rem    
        .score 
          display: inline-block 
          font-size: .75rem
          color: rgb(255,153,0)
          line-height: 1.125rem    
      .delivery-wrapper
        .title
          font-size: .75rem
          color: rgb(7,17,27)
          line-height: 1.125rem
        .delivery
          font-size: .75rem
          color: rgb(1476,153,159)
          line-height: 1.125rem
  .rating-wrapper
    padding: 0 18px
    .rating-item
      display: flex
      padding: 18px 0
      border-1px(rgba(7, 17, 27, 0.1))
      .avatar
        flex: 0 0 28px
        width: 28px
        margin-right: 12px
        img
          border-radius: 50%
      .content
        position: relative
        flex: 1
        .name
          margin-bottom: 4px
          line-height: 12px
          font-size: 10px
          color: rgb(7, 17, 27)
        .star-wrapper
          margin-bottom: 6px
          font-size: 0
          .star
            display: inline-block
            margin-right: 6px
            vertical-align: top
          .delivery
            display: inline-block
            vertical-align: top
            line-height: 12px
            font-size: 10px
            color: rgb(147, 153, 159)
        .text
          margin-bottom: 8px
          line-height: 18px
          color: rgb(7, 17, 27)
          font-size: 12px
        .recommend
          line-height: 16px
          font-size: 0
          .icon-thumb_up, .item
            display: inline-block
            margin: 0 8px 4px 0
            font-size: 9px
          .icon-thumb_up
            color: rgb(0, 160, 220)
          .item
            padding: 0 6px
            border: 1px solid rgba(7, 17, 27, 0.1)
            border-radius: 1px
            color: rgb(147, 153, 159)
            background: #fff
        .time
          position: absolute
          top: 0
          right: 0
          line-height: 12px
          font-size: 10px
          color: rgb(147, 153, 159)
                

</style>
