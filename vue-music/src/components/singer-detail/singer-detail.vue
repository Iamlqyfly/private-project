<template>
 <transition name="slide">
  <div class="music-list">
    <div class="header" ref="header">
      <div class="back" @click="back">
        <i class="fa fa-angle-left"></i>
      </div>
      <div class="text">
        <h1 class="title">{{headerTitle}}</h1>
      </div>
    </div>
    <div class="bg-image" ref="bgImage" :style="bgStyle">
      <div class="filter" ref="filter"></div>
      <div class="text">
        <h2 class="list-title">{{title}}</h2>
      </div>
    </div>
    <scroll
      class="list"
      :probe-type="probeType"
      :listen-scroll="listenScroll"
      :data="songs"
      @scroll="scroll"
      ref="list"
    >
      <div class="music-list-wrapper">
        <div class="song-list-wrapper">
          <div ref="playBtn" class="sequence-play" v-show="listDetail.length" @click="sequence">
            <i class="iconfont icon-bofangicon"></i>
            <span class="text">随机播放全部</span>
            <span class="count">共{{listDetail.length}}首</span>
          </div>
          <song-list @select="selectItem" :songs="listDetail"></song-list>
        </div>
      </div>
    </scroll>
  </div>
 </transition>
</template>

<script>
import Scroll from 'base/scroll/scroll'
import SongList from 'base/song-list/song-list'
import Loading from 'base/loading/loading'
import {mapGetters, mapActions} from 'vuex'
import {ERR_OK} from 'common/js/config'
import {playlistMixin} from 'common/js/mixin'
import {getSingerDetail} from 'api/singer'
import {createSong} from 'common/js/song'
import {prefixStyle} from 'common/js/dom'

const RESERVED_HEIGHT = 44
const transform = prefixStyle('transform')
const backdrop = prefixStyle('backdrop-filter')

export default {
  mixins: [playlistMixin],
  props: {
    songs: {
      type: Array
    }
  },
  data () {
    return {
      listDetail: [],
      scrollY: 0,
      singerDetail: null,
      headerTitle: '歌手'
    }
  },
  created () {
    console.log(this.singer,'s')
    this.probeType = 3
    // 滚动监听
    this.listenScroll = true 
    this._getDetail()
  },
  watch: {
    scrollY(newVal) {
      console.log(newVal, 'newVal')
      let translateY = Math.max(this.minTranslateY, newVal)
      let scale = 1, zIndex = 0, blur = 0
      const percent = Math.abs(newVal / this.imageHeight)
      if (newVal < (this.minTranslateY + RESERVED_HEIGHT - 20)) {
        this.headerTitle = this.headerTitleTouchDown
      } else {
        this.headerTitle = '歌手'
      }
      if (newVal > 0) {
        this.$refs.bgImage.style.paddingTop = 0
        scale = 1 + percent
        zIndex = 10
      } else {
        blur = Math.min(20, percent*20)
      }
      // this.$refs.layer.style[transform] = `translate3d(0, ${translateY}px, 0)`
      this.$refs.filter.style[backdrop] = `blur(${blur}px)`
      if (newVal < this.minTranslateY) {
        zIndex = 10
        this.$refs.bgImage.style.paddingTop = 0
        this.$refs.bgImage.style.height =`${RESERVED_HEIGHT}`
        this.$refs.playBtn.style.display = 'none'
      } else {
        this.$refs.bgImage.style.paddingTop = '70%'
        this.$refs.bgImage.style.height = 0
        this.$refs.playBtn.style.display = ''
      }
      this.$refs.bgImage.style[transform] = `scale(${scale})`
      this.$refs.bgImage.style.zIndex = zIndex
    },
  },
  computed: {
    ...mapGetters([
      'singer'
    ]),
    bgStyle () {
      return `background-image: url(${this.singer.avatar})`
    },
    headerTitleTouchDown() {
      let name = ''
      if (this.singer.aliaName) {
        name = this.singer.name + ` (${this.singer.aliaName})`
      } else {
        name = this.singer.name
      }
      return name
    },
    title () {
      return this.headerTitleTouchDown
    }
  },
  mounted () {
    console.log(this.$refs.bgImage)
    this.imageHeight = this.$refs.bgImage.clientHeight
    this.minTranslateY = -this.imageHeight + RESERVED_HEIGHT
    console.log(this.minTranslateY, 'mountedY')
  },

  methods: {
    ...mapActions([
      'selectPlay',
      'sequencePlay'
    ]),
    scroll(pos) {
      this.scrollY = pos.y
    },
    sequence() {
      this.sequencePlay({
        list: this.listDetail
      })
    },
    selectItem(item, index) {
      this.selectPlay({
        list: this.listDetail,
        index: index
      })
    },
    _getDetail () {
      if (!this.singer.id) {
        this.$router.push('/singer')
      }
      getSingerDetail(this.singer.id).then((res) => {
        if (res.status === ERR_OK) {
          this.listDetail = res.data.hotSongs
          console.log(this.listDetail,'list')
        }
      })
    },
    back() {
      // window.history.go(-1)
      this.$router.back()
    },
    handlePlaylist(playlist) {
      const bottom = playlist.length > 0 ? '60px' : ''
      // this.$refs.singer.style.bottom = bottom
      // this.$refs.list.refresh()
    },
  },
  components: {
    SongList,
    Scroll,
    Loading
  }
}
</script>

<style lang="scss" scoped>
@import "~common/scss/variable";
@import "~common/scss/mixin";
.slide-enter-active, .slide-leave-active {
  transition: all 0.2s
}
.slide-enter, .slide-leave-to {
  transform: translate3d(30%, 0, 0);
  opacity: 0;
}
.loading-content {
  width: 100%;
  height: 100%;
}
.music-list {
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: $color-background;
  .header {
    position: fixed;
    top: 0;
    width: 100%;
    height: 44px;
    color: #fff;
    z-index: 1;
    .back {
      position: absolute;
      top: 0;
      left: 4px;
      .fa-angle-left {
        padding: 5px 10px;
        font-size: 30px;
      }
    }
    .text {
      position: absolute;
      left: 38px;
      line-height: 44px;
      font-size: $font-size-medium-x;
      @include no-wrap()
    }
  }
  .bg-image {
    position: relative;
    width: 100%;
    height: 0;
    padding-top: 70%;
    transform-origin: top;
    background-size: cover;
    .filter {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: black;
      opacity: 0.2;
    }
    .text {
      position: absolute;
      width: 80%;
      height: 40px;
      bottom: 40px;
      left: 25%;
      transform: translate3d(-25%);
      color: #fff;
      .list-title {
        position: absolute;
        bottom: -12px;
        font-size: $font-size-large-s;
        line-height: 18px;
        font-weight: bold;
        letter-spacing: 1px;
      }
    }
  }
  .list {
    position: fixed;
    top: 34%;
    bottom: 0;
    width: 100%;
    background: $color-background;
    .music-list-wrapper {
      .song-list-wrapper {
        padding: 41px 0 20px 0;
        border-radius: 10px;
        position: relative;
        top:-20px;
        background: $color-background;
        .sequence-play {
          position: absolute;
          top: 0px;
          display: flex;
          align-items: center;
          width: 100%;
          height: 40px;
          padding-left: 16px;
          border-bottom: 1px solid rgb(228, 228, 228);
          .iconfont {
            font-size: 18px;
            color: $color-text;
            padding-right: 14px;
          }
          .text {
            font-size: $font-size-medium-x;
          }
          .count {
            font-size: $font-size-medium;
            color: $color-text-g;
          }
        }
      }
    }
  }
}

</style>
