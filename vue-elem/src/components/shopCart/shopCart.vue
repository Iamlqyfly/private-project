<template lang="html">
    <div class="shop">
        <div class="shop-cart">
        <!--用toggleList点击显示隐藏购物车列表-->
            <div class="content" @click="toggleList">
                <div class="content-left" >
                    <div class="logo-wrapper">
                        <div class="logo" :class="{'highlight':totalCount>0}">
                           <i class="icon-shopping_cart" :class="{'highlight':totalCount>0}"></i>
                        </div>
                        <div class="num" v-show="totalCount>0">{{totalCount}}</div>
                    </div>
                    <div class="price" :class="{'highlight':totalPrice>0}">￥{{totalPrice}}</div>
                    <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
                </div>
                <div class="content-right" @click.stop.prevent="pay">
                    <div class="pay" :class="payClass">
                        {{payDesc}}
                    </div>
                </div>
            </div>
            <div class="ball-container">
                <div v-for="ball in balls">
                    <transition name="drop" @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop">
                        <div class="ball" v-show="ball.show">
                            <div class="inner inner-hook"></div>
                        </div>
                    </transition>
                </div>
            </div>
            <!--shopcart的列表详情部分-->
            <transition name="fold">
                <div class="shopcart-list" v-show="listShow">
                    <div class="list-header">
                    <h1 class="title">购物车</h1>
                    <span class="empty" @click="empty()">清空</span>
                    </div>
                    <div class="list-content" ref="listContent">
                        <ul>
                            <li class="food" v-for="food in selectFoods">
                            <span class="name">{{food.name}}</span>
                            <div class="price">
                                <span>￥{{food.price * food.count}}</span>
                            </div>
                            <div class="cartcontrol-wrapper">
                               <cartcontrol @add="addFood" :food="food"></cartcontrol>
                            </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </transition>
        </div>
    <!--打开shopcart列表的时候背景需要虚化并且动画-->
        <transition name="fade">
          <div class="list-mask" @click="hideList" v-show="listShow"></div>
        </transition>
    </div>
</template>

<script>
   import BScroll from 'better-scroll'
   import cartcontrol from 'components/cartcontrol/cartcontrol'
   export default {
    props: {
        selectFoods: {
            type: Array,
            // default: []
            default() {
                return [
                    {
                        price: 10,
                        count: 1
                    }
                ];
            }
        },
        deliveryPrice: {
            type: Number,
            default: 0
        },
        minPrice: {
           type: Number,
           default: 0
        }
    },
    components: {
        cartcontrol
    },
    data() {
        return {
            balls: [
                {
                    show: false
                },{
                    show: false
                },{
                    show: false
                },{
                    show:false
                },{
                    show:false
                }
            ],
            dropBalls: [], //正在运行的小球
            fold: true //通过这个变量来控制隐藏和显示购物车列表,true表示隐藏,折叠起来
        }
    },
    computed: {
        totalPrice() {
            let total = 0
            this.selectFoods.forEach( (food) => {
                total += food.price * food.count   //这个count就是在goods组件里面添加的
            })
            return total
        },
        totalCount() {
            let count = 0
            this.selectFoods.forEach( (food) => {
                count += food.count
            })
            return count
        },
        payDesc() { //做一些支付显示的计算
            if (this.totalPrice === 0) {
                return `￥${this.minPrice}元起送`
            }else if (this.totalPrice < this.minPrice) {
                let diff = this.minPrice - this.totalPrice
                return '还差￥${diff}元配送'
            }else {
                return '去结算'
            }
        },
        payClass() {
            if (this.totalPrice < this.minPrice) {
               return 'not-enough'
            } else {
                return 'enough'
            }
        },
        listShow() { //自动计算购物车列表是否显示和隐藏
            if (!this.totalCount) { //自动判断商品数量为空
                this.fold = true //直接隐藏
                return false  
            }
            let show = !this.fold  //当fold为false的时候显示购物车列表
            if (show) {
                this.$nextTick( () => { //异步滚动列表初始化
                    if (!this.scroll) {
                       this.scroll = new BScroll(this.$refs.listContent, {
                           click: true
                       })
                    } else {
                        this.scroll.refresh() 
                    }
                })
            }
            return show;
        }
    },
    methods: {
        addFood(target) {
           this.drop(target);
        },
        drop(el) {
            for (let i = 0; i < this.balls.length; i++) {
                let ball = this.balls[i]
                if (!ball.show) {
                    ball.show = true
                    ball.el = el
                    this.dropBalls.push(ball)
                    // return
                }
            }
        },
        beforeDrop(el) {
            let count = this.balls.length
            while (count--) {
                let ball = this.balls[count]
                if (ball.show) {
                    let rect = ball.el.getBoundingClientRect()
                    let x = rect.left - 32
                    let y = -(window.innerHeight - rect.top - 22)
                    el.style.display = ''
                    el.style.transform = `translate3d(0,${y}px,0)`
                    el.style.webkitTransform = `translate3d(0,${y}px,0)`
                    let inner = el.getElementsByClassName('inner-hook')[0]
                    inner.style.webkitTransform = `translate3d(${x}px,0,0)`
                    inner.style.transform = `translate3d(${x}px,0,0)`
                }
            }
        },
        dropping(el, done) {
            let offsetHeight = el.offsetHeight  //触发重绘html
            this.$nextTick( () => {  //让动画效果异步执行,提高性能
                el.style.webkitTransform = `translate3d(0,0,0)`
                el.style.transform = `translate3d(0,0,0)`
                let inner = el.getElementsByClassName('inner-hook')[0]  //使用inner-hook类来单纯被js操作
                inner.style.webkitTransform = `translate3d(0,0,0)`
                inner.style.transform = `translate3d(0,0,0)`
                el.addEventListener('transitioned',done)  //Vue为了知道过渡的完成，必须设置相应的事件监听器
            })
        },
        afterDrop(el) {
            let ball = this.dropBalls.shift()
            if (ball) {
                ball.show = false
                el.style.display = 'none'
            }
        },
        toggleList(){
            if (!this.totalCount) {
               return;
            }
            this.fold = !this.fold;
        },
        empty() { //通过清空数据属性来控制购物车清空
            this.selectFoods.forEach((food) => {
               food.count = 0;
            });
        },
        hideList() {
            this.fold = true;
        },
        pay() {
            if (this.totalPrice < this.minPrice) {
               return;
            }
            window.alert(`支付${this.totalPrice}元`);
        }
    }
   }
</script>

<style lang="stylus">
@import "../../common/stylus/mixin.styl"
.shop
    .shop-cart
        position: fixed
        left: 0
        bottom: 0
        z-index: 99
        width: 100%
        height: 3rem
        .content 
            display: flex
            background: #141d27
            font-size: 0
            color: rgba(255, 255, 255, 0.4)
            .content-left 
                flex: 1
                .logo-wrapper
                    display: inline-block
                    vertical-align: top
                    position: relative
                    top: -10px
                    margin: 0 .75rem 
                    padding: .375rem
                    width: 3.5rem
                    height: 3.5rem
                    box-sizing: border-box
                    border-radius: 50%
                    background: #141d27
                    .logo
                        width: 100%
                        height: 100%
                        border-radius: 50%
                        text-align: center
                        background: #2b343c
                        &.highlight
                            background: rgb(0, 160, 220)
                        .icon-shopping_cart
                            line-height: 44px
                            font-size: 24px
                            color: #80858a
                            &.highlight
                                color: #fff
                    .num
                        position: absolute
                        top: 0
                        right: 0
                        width: 24px
                        height: 16px
                        line-height: 16px
                        text-align: center
                        border-radius: 16px
                        font-size: 9px
                        font-weight: 700
                        color: #fff
                        background: rgb(240, 20, 20)
                        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4)
                .price
                    display: inline-block
                    vertical-align: top
                    margin-top: 12px
                    line-height: 24px
                    padding-right: 12px
                    box-sizing: border-box
                    border-right: 1px solid rgba(255, 255, 255, 0.1)
                    font-size: 16px
                    font-weight: 700
                    &.highlight
                        color: #fff
                .desc
                    display: inline-block
                    vertical-align: top
                    margin: 12px 0 0 12px
                    line-height: 24px
                    font-size: 10px
            .content-right
                flex: 0 0 6.5625rem
                width: 6.5625rem
                .pay
                    height: 48px
                    line-height: 48px
                    text-align: center
                    font-size: 12px
                    font-weight: 700
                    &.not-enough
                        background: #2b333b
                    &.enough
                        background: #00b43c
                        color: #fff
        .ball-container
            .ball
                position: fixed
                left: 32px
                bottom: 22px
                z-index: 200
                transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
                .inner
                    width: 16px
                    height: 16px
                    border-radius: 50%
                    background: rgb(0, 160, 220)
                    transition: all 0.4s linear
        .shopcart-list
            position: absolute
            left: 0
            top: 0
            z-index: -1
            width: 100%
            transform: translate3d(0, -100%, 0)
            &.fold-enter-active, &.fold-leave-active
                transition: all 0.5s
            &.fold-enter, &.fold-leave-active
                transform: translate3d(0, 0, 0)
            .list-header
                height: 40px
                line-height: 40px
                padding: 0 18px
                background: #f3f5f7
                border-bottom: 1px solid rgba(7, 17, 27, 0.1)
                .title
                    float: left
                    font-size: 14px
                    color: rgb(7, 17, 27)
                .empty
                    float: right
                    font-size: 12px
                    color: rgb(0, 160, 220)
            .list-content
                padding: 0 18px
                max-height: 217px
                overflow: hidden
                background: #fff
                .food
                    position: relative
                    padding: 12px 0
                    box-sizing: border-box
                    border-1px(rgba(7, 17, 27, 0.1))
                .name
                    line-height: 24px
                    font-size: 14px
                    color: rgb(7, 17, 27)
                .price
                    position: absolute
                    right: 90px
                    bottom: 12px
                    line-height: 24px
                    font-size: 14px
                    font-weight: 700
                    color: rgb(240, 20, 20)
                .cartcontrol-wrapper
                    position: absolute
                    right: 0
                    bottom: 6px                 
    .list-mask
        position: fixed
        top: 0
        left: 0
        width: 100%
        height: 100%
        z-index: 98
        backdrop-filter: blur(10px)
        opacity: 1
        background: rgba(7, 17, 27, 0.6)
        &.fade-enter-active, &.fade-leave-active
            transition: all 0.5s
        &.fade-enter, &.fade-leave-active
            opacity: 0
            background: rgba(7, 17, 27, 0)
</style>