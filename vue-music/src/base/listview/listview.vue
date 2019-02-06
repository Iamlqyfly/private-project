<template>
  <scroll
    class="listview"
    ref="listview"
    :data="data"
    :listenScroll="listenScroll"
    @scroll="scroll"
    :probeType="probeType"
  >
    <ul>
      <li class="list-group" v-for="group in data" :key="group.id" ref="listGroup">
        <h2 class="list-group-title">{{ group.title }}</h2>
        <ul>
          <li @click="selectItem(item)" v-for="item in group.items" class="list-group-item" :key="item.id">
            <img v-lazy="item.avatar" class="avatar">
            <span class="name">{{ item.name }}</span>
          </li>
        </ul> 
      </li>
    </ul>
    <div class="list-shortcut"
      @touchstart="onShortcutStart"
      @touchmove.stop.prevent="onShortcutMove"
    >
      <ul>
        <li v-for="(item, index) in shortcutList"
        class="item"
        :data-index="index"
        :key="item.id"
        :class="{'current': currentIndex === index}"
        >
          {{ item }}
        </li>
      </ul>
    </div>

  </scroll>
</template>

<script>
import Scroll from 'base/scroll/scroll'
import { getData } from 'common/js/dom'

const ANCHOR_HEIGHT = 20
const TITLE_HEIGHT = 30

export default {
  props: {
    data: {
      type: Array
    }
  },
  data () {
    return {
      scrollY: -1,
      currentIndex: 0
    }
  },
  components: {
    Scroll
  },
  created () {
    this.touch = {}
    // 定义在这里，是因为不需要监听这个值的变化，定义在props和data里面的数据是可以监听到的
    this.listenScroll = true
    this.listHeight = []
    this.probeType = 3
  },
  methods: {
    selectItem (item) {
      this.$emit('select', item)
    },
    scroll(pos) {
      this.scrollY = pos.y 
      // scrollY 设置为 true 的时候，可以开启纵向滚动
      // console.log(pos.y, 'y')
    },
    _calculateHeight () {
      this.listHeight = []
      const list = this.$refs.listGroup
      let height = 0
      this.listHeight.push(height)
      for (let i = 0; i < list.length; i++) {
        let item = list[i]
        height += item.clientHeight
        this.listHeight.push(height)
      }
    },
    onShortcutStart(e) {
      let anchorIndex = getData(e.target, 'index')
      let firstTouch = e.touches[0]
      this.touch.y1 = firstTouch.pageY
      this.touch.anchorIndex = anchorIndex
      this._scroLLTo(anchorIndex)

    },
    onShortcutMove(e) {
      let firstTouch = e.touches[0]
      this.touch.y2 = firstTouch.pageY
      // 滚动了多个少元素  滚动的偏差/每个元素的高度
      let delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0
      let anchorIndex = parseInt(this.touch.anchorIndex) + delta
      this._scroLLTo(anchorIndex)
    },
    _scroLLTo (index) {
      if (!index && index !== 0) {
        return
      }
      if (index < 0) {
        index = 0
      } else if (index > this.listHeight.length - 2) {
        index = this.listHeight.length - 2
      }
      this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0)
      console.log(this.$refs.listGroup[index],'index1')
      // this.scrollY = -this.listHeight[index] //??
      // console.log(this.scrollY, 'sc') 
    }

  },
  watch: {
    data () {
      setTimeout(() => {
        this._calculateHeight()
      }, 20)
    },
    scrollY (newY) { // 点击字母列表 高亮字母，同时对应左边歌手列表相应数据
      const listHeight = this.listHeight
      if (newY > 0) {
        this.currentIndex = 0
        return
      }
      // console.log(newY, 'nwy')
      for (let i = 0; i < listHeight.length - 1; i++) {
        let height1 = listHeight[i]
        let height2 = listHeight[i + 1]
        if (-newY >= height1 && -newY < height2) {
          this.currentIndex = i
          return
        }
      }
      // this.currentIndex = listHeight.length - 2
    }
  },
  computed: {
    shortcutList () {
      return this.data.map((group) => {
        return group.title.substr(0, 1)
      })
    }
  },
}
</script>

<style lang="scss" scoped>
@import "~common/scss/variable";
.listview {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: $color-background;
  .list-group {
    // padding: 10px 0;
    .list-group-title {
      height: 20px;
      line-height: 20px;
      padding-left: 12px;
      margin-bottom: 10px;
      font-size: $font-size-small;
      color: #fff;
      background:rgba(0, 0, 0, 0.1);
    }
    .list-group-item {
      display: flex;
      align-items: center;
      padding: 5px 0;
      margin: 0 5px;
      border-bottom: 1px solid rgb(228, 228, 228);
      &:last-child {
        border: none;
        margin-bottom: 10px;
      }
      .avatar {
        width: 50px;
        height: 50px;
        border-radius: 3px;
      }
      .name {
        margin-left: 20px;
        color: $color-text;
        font-size: $font-size-medium;
      }
    }
  }
  .list-shortcut {
    position: absolute;
    z-index: 1;
    right: 3px;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    padding: 200px 0;
    border-radius: 3px;
    text-align: center;
    .item {
      padding: 5px 5px;
      line-height: 1;
      color: $color-text-g;
      font-size: $font-size-small;
      font-weight: bold;
      &.current {
        color: $color-theme;
      }
    }
  }
  .list-fixed {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    .fixed-title {
      height: 20px;
      line-height: 20px;
      padding-left: 20px;
      font-size: $font-size-small;
      color: $color-text-l;
      background: rgba(0, 0, 0, 0.1);
    }
  }
  .loading-container {
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>
