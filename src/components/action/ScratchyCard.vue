<template>
  <div :style="baseStyle" class="action">
    <img ref="img" :style="backStyle" class="back" :src="adUrl">
    <canvas id="canvas" class="ScratchyCard" @touchend.stop.prevent="touchEnd" @touchmove.stop.prevent="move($event)"></canvas>
    <transition name="fade">
      <img v-show="!isOpen" :src="iurl" class="button" @click="start">
    </transition>
  </div>
</template>

<script>
import { ScratchyCard } from '$aweso/utils/animation'
import { postLpClk } from '$aweso/api/api'
import watchMixin from '$aweso/common/watchMixin'
import {sentEvent, listenEvent} from '$aweso/utils/event'

export default {
  name: 'ScratchyCard',
  mixins: [watchMixin],
  props: {
    source: Array
  },
  data () {
    return {
      isOpen: false,
      times: 5,
      adUrl: '',
      iurl: '',
      canvas: null,
      ctx: null,
      size: 18,
      width: '',
      height: '',
      color: '',
      baseStyle: {
        top: ''
      },
      backStyle: {
        width: '',
        height: ''
      }
    }
  },
  mounted () {
    this.getStyle()
    ScratchyCard.init('canvas', this.width, this.height, this.color, this.size)
    // 监听目前Times组件的次数
    listenEvent('sentTimes', (data) => {
      this.times = data
    })
    // 监听关闭弹窗后执行的函数
    listenEvent('closePop', () => {
      this.isOpen = false
      ScratchyCard.drawMask()
    })
    // 监听获取到广告后的图片设置成刮刮卡背景图
    listenEvent('sentPopData', (data) => {
      this.adUrl = data.iurl
    })
  },
  beforeDestroy () {

  },
  methods: {
    start (e, index) {
      if (!this.isOpen && this.times > 0) {
        if (this.times <= 4) {
          // 次数少于等于4发送飘落气球请求
          sentEvent('openBalloon')
        }
        this.isOpen = true
        // 向Times组件发送动作次数减1
        sentEvent('refreshTimes')
        // 向弹窗发送数据请求提前获取广告信息
        sentEvent('getPopData')
        // 发送点击数据统计
        postLpClk(e, 'lot')
      } else if (!this.isOpen && this.times <= 0) {
        // 打开中转页面
        sentEvent('openNext')
      }
    },
    getStyle () {
      if (this.source) {
        this.iurl = this.source[0].url ? this.source[0].url : ''
        this.baseStyle.top = this.source[1].top ? this.source[1].top : '5rem'
        this.backStyle.width = this.source[2].width ? this.source[2].width : '5rem'
        this.backStyle.height = this.source[3].height ? this.source[3].height : '3rem'
        this.width = this.$refs.img.width + 14
        this.height = this.$refs.img.height
        this.color = this.source[4].color ? this.source[4].color : '#e6e6e6'
      }
    },
    touchEnd () {
      ScratchyCard.touchEnd(() => {
        sentEvent('openPop')
      })
    },
    move (e) {
      if (this.isOpen) {
        let loc = ScratchyCard.windowToCanvas(e)
        ScratchyCard.drawEraser(loc)
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .action{
    position: relative;
    font-size:0;
    z-index: 1;
  }
  .back{
    position: absolute;
    left:50%;
    width:5rem;
    height:3rem;
    transform: translateX(-50%);
    background-size:100%;
  }
  .ScratchyCard{
    position: absolute;
    left:50%;
    transform: translateX(-50%);
  }
  .button{
    position: absolute;
    top:1.1rem;
    left:50%;
    width: 2.8rem;
    transform-origin: 0%;
    animation: scale 1s ease infinite;
  }
  @keyframes scale {
    0%{transform:scaleX(1) translateX(-50%);}
    50%{transform:scale3d(1.1,1.1,1.1) translateX(-50%);}
    to{transform:scaleX(1) translateX(-50%);}
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }

</style>
