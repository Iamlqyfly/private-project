<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  props: {
    probeType: {
      type: Number,
      default: 1
    },
    click: {
      type: Boolean,
      default: true
    },
    data: {
      type: Array,
      default: null
    },
    listenScroll: {
      type: Boolean,
      default: false
    },
    pullup: {
      type: Boolean,
      default: false
    },
    refreshDelay: {
      type: Number,
      default: 20
    }
  },
  mounted () {
    setTimeout(() => {
      this._initScroll()
    })
  },
  methods: {
    _initScroll () {
      if (!this.$refs.wrapper) {
        return
      }
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: this.click
      })

      if (this.listenScroll) {
        // 滚动的实时坐标 -- scroll
        let _this = this
        this.scroll.on('scroll', (pos) => {
          _this.$emit('scroll', pos)
        })
      }
      if (this.pullup) {
        this.scroll.on('scrollEnd', () => {
          if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
            this.$emit('scrollToEnd') //滚动到底部
          }
        })
      }
    },
    enable () { // 启用 better-scroll, 默认 开启
      this.scroll && this.scroll.enable()
    },
    disable () { // 禁用 better-scroll
      this.scroll && this.scroll.disable()
    },
    refresh () {
      this.scroll && this.scroll.refresh()
    },
    scrollTo () {
      this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
    },
    scrollToElement () { //滚动到指定的目标元素
      this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
    }
  },
  watch: { //监听数据的变化，因为一开始进入页面的时候，初始化滚动函数放在mounted
  // 但是mounted只会执行一次 当数据变化时，重新刷新页面
    data () {
      setTimeout(() => {
        this.refresh()
      }, this.refreshDelay)
    }
  }
}
</script>

<style>

</style>
