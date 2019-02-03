<!--
1.绑定星星类型的class(48,36,24尺寸),使用starType
2.使用class来显示星星,有3种类型,全星,半星,无星,使用star-item代表星星本身,
然后分别使用on,off,half代表三种不同类型的星星
3.一个span代表一个星星项目,并且使用v-for循环将星星项目输出
-->
<template lang="html">
  <div class="star" :class="starType">
    <span class="star-item" v-for="itemClass in itemClasses" 
    :key="itemClass.id" :class="itemClass" >
    </span>
  </div>
</template>

<script>

//设置常量
const LENGTH = 5;
const CLS_ON = 'on';
const CLS_HALF = 'half';
const CLS_OFF = 'off';


export default {
  props: {
    size: { //传入的size变量
      type: Number
    },
    score: { //传入的score变量
      type: Number
    }
  },
  computed: {
    starType() { //通过计算属性，返回组装过的类型，用来对应class类型
      return 'star-' + this.size
    },
    itemClasses() {
      let result = [] // 用来遍历输出星星
      let score = Math.floor(this.score * 2) / 2 //计算所有星星的数量
      let hasDecimal = score % 1 !== 0  //非整数星星判断
      let integer = Math.floor(score) //整数星星判断
      for(let i = 0; i < integer; i++) {
        result.push(CLS_ON) //一个整数星星就push一个CLS_ON到数组
      }
      if(hasDecimal) {
        result.push(CLS_HALF) // 非整数星星使用half
      }
      while(result.length < LENGTH) { //余下的用无星星补全，使用off
        result.push(CLS_OFF)
      }
      return result
    }
  },

}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"
  .star
    .star-item
      display: inline-block
      background-repeat: no-repeat
    &.star-48
      .star-item
        width: 20px
        height: 20px
        margin-right: 22px
        background-size: 100% 100%
        &:last-child
          margin-right: 0
        &.on
          bg-image('star48_on')
        &.half
          bg-image('star48_half')
        &.off
          bg-image('star48_off')
    &.star-36
      .star-item
        width: .9375rem
        height: .9375rem
        background-size:  100% 100%
        margin-right: .375rem
        &:last-child
          margin-right: 0
        &.on
          bg-image('star36_on')
        &.half
          bg-image('star36_half')
        &.off
          bg-image('star36_off')
    &.star-24
      .star-item
        width: .625rem
        height: .625rem
        background-size:  100% 100%
        margin-right: .1875rem
        &:last-child
          margin-right: 0
        &.on
          bg-image('star24_on')
        &.half
          bg-image('star24_half')
        &.off
          bg-image('star24_off')

</style>
