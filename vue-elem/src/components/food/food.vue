<template lang="html">
    <transition name="move">
        <div class="food" v-show="showFlag" ref="food">
            <div class="food-content">
                <div class="image-header">
                    <img :src="food.image" alt="">
                    <div class="back" @click="hide">
                       <i class="icon-arrow_lift"></i>
                    </div>
                </div>
                <div class="content">
                    <h1 class="title">{{food.name}}</h1>
                    <div class="detail">
                        <span class="sell-count">月售{{food.sellCount}}份</span>
                        <span class="rating">好评率{{food.rating}}%</span>
                    </div>
                    <div class="price">
                        <span class="now" v-show="food.oldPrice">￥{{food.price}}</span>
                        <span class="old">￥{{food.oldPrice}}</span>
                    </div>
                    <div class="cartcontrol-wrapper">
                        <cartcontrol @add="addFood" :food="food"></cartcontrol>
                    </div>
                    <transition name="fade">
                    <!--使用.stop.prevent阻止冒泡和默认事件,避免穿透-->
                        <div @click.stop.prevent="addFirst" class="buy" v-show="!food.count || food.count===0">
                        加入购物车
                        </div>
                    </transition>
                </div>
                <split></split>
                <div class="info" v-show="food.info">
                    <h1 class="title">商品信息</h1>
                    <p class="text">{{food.info}}</p>
                </div>
                <split></split>
                <div class="rating">
                    <h1 class="title">商品评价</h1>
                    <ratingselect @select="selectRating" @toggle="toggleContent" 
                        :selectType="selectType"
                        :onlyContent="onlyContent" 
                        :desc="desc"
                        :ratings="food.ratings">
                    </ratingselect>
                    <div class="rating-wrapper">
                        <ul v-show="food.ratings && food.ratings.length">
                            <li v-show="needShow(rating.rateType,rating.text)" v-for="rating in food.ratings"
                                class="rating-item border-1px">
                                <div class="user">
                                    <span class="name">{{rating.username}}</span>
                                    <img class="avatar" width="12" height="12" :src="rating.avatar">
                                </div>
                                <div class="time">{{rating.rateTime | formatDate}}</div>
                                <p class="text">
                                    <span :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></span>{{rating.text}}
                                </p>
                            </li>
                        </ul>
                        <div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
    import BScroll from 'better-scroll';
    import Vue from 'vue'
    import cartcontrol from 'components/cartcontrol/cartcontrol';
    import ratingselect from 'components/ratingselect/ratingselect';
    import split from 'components/split/split';

    const ALL = 2
    export default {
        data() {
            return {
                showFlag: false,
                selectType: ALL,
                onlyContent: true,
                desc: {
                    all: '全部',
                    positive: '推荐',
                    negative: '吐槽'
                }
            }
        },
        props: {
            food: { //用goods.vue组件传入的food数据
                type: Object
            }
        },
        components: {
            cartcontrol,
            ratingselect,
            split
        },
        methods: {
            show() {
                this.showFlag = true
                this.selectType = ALL
                this.onlyContent = true
                this.$nextTick( () => {
                    if (!this.scroll) {
                        this.scroll = new BScroll(this.$refs.food,{
                            click: true
                        })
                    } else {
                        this.scroll.refresh()
                    }
                })

            },
            hide() {
                this.showFlag = false
            },
            // 加入购物车按钮有一个动画fade,并且因为他的位置跟cartcontrol有重叠,避免穿透,所以直接.click.stop.prevent
            // 加入购物车按钮的显示是通过判断food.count实现的,这个属性默认是没有的,当点击购物车按钮的时候强制生成
            // Vue.set(this.food, 'count', 1);,这样做的目的是比较直观的增加一个属性去实现功能

            addFirst(event) {  //点击加入购物车按钮，传入事件
                if (!event._constructed) {
                   return
                }
                this.$emit('add',event.target) //触发当前实例food上的事件add
                Vue.set(this.food, 'count',1)
            },
            addFood(target) {
                this.$emit('add', target)
            },
            // 两次触发当前实例的事件add是因为两个操作都是同一个动作,这个动作是绑定在food组件上的add方法,
            // 而food组件会在goods组件中被导入<food @add="addFood" :food="selectedFood" ref="food"></food>,
            // 而在goods组件里面,addFood方法就会指向当前goods组件的方法_drop,
            // 继而使用shopcart的小球抛物线动画this.$refs.shopcart.drop(target);,这样就是实现了使用跨组件调用方法的效果

            needShow(type, text) {
                if (this.onlyContent && !text) { //只显示有内容的 并且 没有内容就返回false
                    return false
                }
                if (this.selectType === ALL) {  //显示全部类型的rate
                    return true
                } else {
                    return type === this.selectType  //只显示对应的类型的rate
                }
            },
            selectRating(type) {
                //设置rate类型
                this.selectType = type
                this.$nextTick( () => { //切换的时候需要重新刷新BScroll
                    this.scroll.refresh()
                })
            },
            toggleContent() { //切换显示是否有内容的rate
                this.onlyContent = !this.onlyContent
                this.$nextTick( () => {  
                    this.scroll.refresh()
                })
            },

        }
    }
</script>
<style lang="stylus">
@import "../../common/stylus/mixin.styl"
.food
    position: fixed
    left: 0
    top: 0
    bottom: 48px
    z-index: 30
    width: 100%
    background: #fff
    transform: translate3d(0, 0, 0)
    &.move-enter-active, &.move-leave-active
      transition: all 0.2s linear
    &.move-enter, &.move-leave-active
      transform: translate3d(100%, 0, 0)
    .image-header
      position: relative
      width: 100%
      height: 0
      padding-top: 100%
      img
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
      .back
        position: absolute
        top: 10px
        left: 0
        .icon-arrow_lift
          display: block
          padding: 10px
          font-size: 20px
          color: #fff
    .content
      position: relative
      padding: 18px
      .title
        line-height: 14px
        margin-bottom: 8px
        font-size: 14px
        font-weight: 700
        color: rgb(7, 17, 27)
      .detail
        margin-bottom: 18px
        line-height: 10px
        height: 10px
        font-size: 0
        .sell-count, .rating
          font-size: 10px
          color: rgb(147, 153, 159)
        .sell-count
          margin-right: 12px
      .price
        font-weight: 700
        line-height: 24px
        .now
          margin-right: 8px
          font-size: 14px
          color: rgb(240, 20, 20)
        .old
          text-decoration: line-through
          font-size: 10px
          color: rgb(147, 153, 159)
      .cartcontrol-wrapper
        position: absolute
        right: 12px
        bottom: 12px
      .buy
        position: absolute
        right: 18px
        bottom: 18px
        z-index: 10
        height: 24px
        line-height: 24px
        padding: 0 12px
        box-sizing: border-box
        border-radius: 12px
        font-size: 10px
        color: #fff
        background: rgb(0, 160, 220)
        opacity: 1
        &.fade-enter-active, &.fade-leave-active
          transition: all 0.2s
        &.fade-enter, &.fade-leave-active
          opacity: 0
          z-index: -1
    .info
      padding: 18px
      .title
        line-height: 14px
        margin-bottom: 6px
        font-size: 14px
        color: rgb(7, 17, 27)
      .text
        line-height: 24px
        padding: 0 8px
        font-size: 12px
        color: rgb(77, 85, 93)
    .rating
      padding-top: 18px
      .title
        line-height: 14px
        margin-left: 18px
        font-size: 14px
        color: rgb(7, 17, 27)
      .rating-wrapper
        padding: 0 18px
        .rating-item
          position: relative
          padding: 16px 0
          border-1px(rgba(7, 17, 27, 0.1))
          .user
            position: absolute
            right: 0
            top: 16px
            line-height: 12px
            font-size: 0
            .name
              display: inline-block
              margin-right: 6px
              vertical-align: top
              font-size: 10px
              color: rgb(147, 153, 159)
            .avatar
              border-radius: 50%
          .time
            margin-bottom: 6px
            line-height: 12px
            font-size: 10px
            color: rgb(147, 153, 159)
          .text
            line-height: 16px
            font-size: 12px
            color: rgb(7, 17, 27)
            .icon-thumb_up, .icon-thumb_down
              margin-right: 4px
              line-height: 16px
              font-size: 12px
            .icon-thumb_up
              color: rgb(0, 160, 220)
            .icon-thumb_down
              color: rgb(147, 153, 159)
        .no-rating
          padding: 16px 0
          font-size: 12px
          color: rgb(147, 153, 159)
</style>