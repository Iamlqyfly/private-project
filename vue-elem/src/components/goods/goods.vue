<template lang="html">
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li v-for="(item, index) in goods" :class="index == menuCurrentIndex ? 
        'menu-item-selected': 'menu-item'" @click="menuClick(index,$event)">
          <span class="content">
            <iconMap v-show="item.type > 0" :iconType="item.type"></iconMap>{{item.name}}
          </span>
        </li>
     </ul>
   </div>
   <div class="foods-wrapper" ref="foodsWrapper" id="wrapper">
    <ul>
      <li v-for="item in goods" class="food-list food-list-hook">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li v-for="food in item.foods" class="food-item" @click="selectFood(food,$event)">
              <div class="icon">
                <img :src="food.icon" width="57" height="57">
              </div>
              <div class="content">
                <h2 class="title">{{food.name}}</h2>
                <p class="description" v-show="food.description">{{food.description}}</p>
                <div class="sell-info">
                  <span class="sellCount">月售{{food.sellCount}}</span>
                  <span class="rating">好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="newPrice"><span class="unit">￥</span>{{food.price}}</span>
                  <span class="oldPrice"><span class="unit">￥</span>{{food.oldPrice}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cartcontrol @add="addFood" :food="food"></cartcontrol>
                </div>
              </div>
            </li>
          </ul>
      </li>
    </ul>
   </div>
   <shopcart ref="shopcart" :selectFoods="selectFoods" :deliveryPrice="seller.deliveryPrice"
    :minPrice="seller.minPrice"></shopcart>
   <food @add="addFood" :food="selectedFood" ref="food"></food> 
  </div>
</template>

<script>
import iconMap from 'components/iconMap/iconMap'
import BScroll from 'better-scroll'  
import axios from 'axios' 
import shopcart from 'components/shopCart/shopCart';
import cartcontrol from 'components/cartcontrol/cartcontrol';
import food from 'components/food/food';
export default {
  data() {
    return {
      goods: [],
      listHeight: [],  //用来储存foods区域的各个区块的高度(clientHeight)
      foodsScrollY: 0, //用来存储foods区域的滚动的Y坐标
      selectedFood: {}  //用来存储当前已被选择的food数据,对象保存形式
    }
  },
  props: {
    seller: Object
  },
  components: {
    iconMap,
    cartcontrol,
    shopcart,
    food
  },
  created() {
    axios.get('static/data.json').then((res) => {
      this.goods = res.data.goods
      this.$nextTick(() => {
        this._initScroll(); // 初始化scroll
        this._calculateHeight(); // 初始化列表高度列表
      }) 
    });
  },
  computed: {
    menuCurrentIndex() {  //计算到达哪个区域的区间的时候的对应的索引值
      for (let i = 0, len = this.listHeight.length; i < len; i++) {
        let height1 = this.listHeight[i]  //当前menu子块的高度
        let height2 = this.listHeight[i+1]  //下一个menu子块的高度
        if (!height2 || this.foodsScrollY >= height1 && this.foodsScrollY < height2) {
          return i //返回这个menu子块的索引
        }
      }
      return 0
    },
    selectFoods() {  //自动将所有的goods.food添加一个count属性,方便做数量运算
      let foods = []
      this.goods.forEach( (good) => {
        good.foods.forEach((food) => {
          if (food.count) {
            foods.push(food)
          }    
        })
      })
      return foods
    },
  },
  // filters: {
  //   formatDate(time) {
  //     let date = new Date(time);
  //     return formatDate(date, 'yyyy-MM-dd hh:mm');
  //   }
  // },
  methods: {
    _initScroll() {
      this.menuWrapper = new BScroll(this.$refs.menuWrapper, {
        click: true //是否将click事件传递,默认被拦截了
      });
      this.foodsScroll = new BScroll(this.$refs.foodsWrapper,{
        click: true,
        probeType: 3  //结合BScroll的接口使用,3实时派发scroll事件
      });
      //监控滚动事件
      this.foodsScroll.on('scroll',(pos) => {
         // 判断滑动方向，避免下拉时分类高亮错误（如第一分类商品数量为1时，下拉使得第二分类高亮）
          if (pos.y <= 0) {
            this.scrollY = Math.abs(Math.round(pos.y));
          }
        // this.foodsScrollY = Math.abs(Math.round(pos.y)) //滚动坐标会出现负的,并且是小数,所以需要处理一下
      })
    },
    //计算foods内部块的高度
    _calculateHeight() {  //这个地方需要看视频
      //获取每一个food的dom对象
      let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')  
      let height = 0
      this.listHeight.push(height) //初始化第一个高度为0
      for (let i = 0;i < foodList.length; i++) {
        let item = foodList[i]  //每一个item都是刚才获取的food的每一个dom
        height +=item.clientHeight //主要是为了获取每一个foods内部块的高度
        this.listHeight.push(height)
      }
    },
    menuClick(index, event) {  //也需要看视频
      if (!event._constructed) { //忽略掉BScroll的事件
        return
      }
      //类似jump to的功能,通过这个方法,跳转到指定的dom
      this.foodsScroll.scrollTo(0, -this.listHeight[index], 300)
    },
    selectFood(food, event) {
      if (!event._constructed) { //忽略掉BScroll的事件
        return
      }
      this.selectedFood = food
      this.$nextTick( () => {
        this.$refs.food.show()
      })
    },
    // goDetail(food) {
    //   this.selectedFood = food
    //   this.$nextTick( () => {
    //     this.$refs.food.show()
    //   })
    // },
    addFood(target) {
      this._drop(target);
    },
    _drop(target) {
      // 体验优化,异步执行下落动画
      this.$nextTick(() => {
        this.$refs.shopcart.drop(target);
      });
    },
  }
}
</script>
<style lang="stylus">
.goods
  display: flex
  position: absolute
  top: 10.875rem
  bottom: 2.875rem
  width: 100%
  overflow: hidden
  .menu-wrapper
    flex: 0 0 5rem
    width: 5rem /* 80/16 */
    background: #f3f5f7
    margin-top: .125rem /* 2/16 */
    .menu-item-selected
      background: white
      font-weight: 700
      margin-top: -1px
    .menu-item, .menu-item-selected
      position: relative
      display: table
      height: 3.375rem /* 54/16 */
      line-height: .875rem /* 14/16 */
      width: 3.5rem /* 56/16 */  
      padding: 0 .75rem /* 12/16 */
      &:last-child:after
        content: none
    .menu-item:after  
      position: absolute
      content: ''
      left: .75rem 
      width: 3.5rem 
      bottom: 0
      border-bottom: 1px solid rgba(7,17,27,0.1)
    .content   
      padding: 1rem 0 0 .3125rem
      display: table-cell
      font-size .75rem /* 12/16 */
      font-weight 200
      line-height: .875rem
      .iconMap
        vertical-align: middle
        margin-right: .3125rem
  .foods-wrapper
    flex: 1
    margin-top: .125rem 
    .food-list
      h1
        padding: 0 0 0 .5rem
        height: 1.625rem 
        line-height: 1.625rem 
        font-size: .75rem
        color: #93999f;
        background: #f3f5f7;
      .food-item 
        position: relative
        display: flex
        margin: 0 1.125rem 
        padding: 1.125rem 0
        border-bottom: 1px solid rgba(7,17,27,0.1)
        .icon 
          flex: 0 0 4.6875rem 
        &:last-child
          border-bottom  none
        .content 
          flex: 1
          padding-left: .625rem 
          .title
            margin 2px 0 8px 0
            font-size .875rem 
            line-height .875rem 
            height .875rem 
            font-weight 700
            color rgb(7,17,27)
          .sell-info,.description
            font-size .625rem 
            color rgb(147,153,159)
            line-height .625rem 
          .sellCount
            margin-right .25rem 
          .description
            font-size .625rem 
            margin-bottom .5rem 
            line-height: .75rem 
          .price
            font-size 10px
            font-weight 700
            line-height 1.5rem 
            .newPrice
              font-size .875rem 
              color rgb(240,20,20)
              .unit
                font-size .625rem 
                font-weight normal
            .oldPrice
              text-decoration line-through
              color rgb(147,153,159)
              padding-left .25rem 
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: .75rem      
            





</style>
