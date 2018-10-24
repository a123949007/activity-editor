<template>
  <div class="action">
    <div class="boson">
      <div class="boson_img" :style="bosonStyle1" v-show="!isOpen"></div>
      <div class="boson_img2" :style="bosonStyle2" v-show="isOpen"></div>
      <img @click="start" class="btn_img" :style="btnStyle" :src="isOpen ? btnStyle.src2 : btnStyle.src1">
      <div class="finger_img" :style="fingerStyle"></div>
    </div>
  </div>
</template>

<script>
import { Boson } from '$aweso/utils/animation'
import { postLpClk } from '$aweso/api/api'
import watchMixin from '$aweso/common/watchMixin'
import {sentEvent, listenEvent} from '$aweso/utils/event'

export default {
  name: 'BosonAction',
  mixins: [watchMixin],
  props: {
    source: Array
  },
  data () {
    return {
      isOpen: false,
      times: 5,
      btnStyle: {
        src1: '',
        src2: '',
        top: ''
      },
      bosonStyle1: {
        backgroundImage: '',
        height: '',
        width: '',
        top: ''
      },
      bosonStyle2: {
        backgroundImage: '',
        width: '',
        height: '',
        top: '',
        backgroundPositionY: '0rem'
      },
      fingerStyle: {
        backgroundImage: '',
        width: '',
        height: '',
        top: '',
        left: '',
        backgroundPositionX: '0rem'
      }
    }
  },
  mounted () {
    this.getStyle()
    // 监听目前Times组件的次数
    this.fingerMove()
    listenEvent('sentTimes', (data) => {
      this.times = data
    })
    // 监听关闭弹窗后执行的函数
    listenEvent('closePop', () => {
      this.isOpen = false
      Boson.init()
    })
  },
  beforeDestroy () {

  },
  methods: {
    start (e) {
      if (!this.isOpen && this.times > 0) {
        if (this.times <= 4) {
          // 次数少于等于4发送飘落气球请求
          sentEvent('openBalloon')
        }
        this.isOpen = true
        Boson.run(this.bosonStyle2, () => {
          sentEvent('openPop')
        })
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
    fingerMove () {
      let gap = 2
      let index = 0
      setInterval(() => {
        if (index === 2) {
          index = 0
        }
        this.fingerStyle.backgroundPositionX = '-' + gap * index + 'rem'
        index++
      }, 500)
    },
    getStyle () {
      if (this.source) {
        this.btnStyle.src1 = this.source[0].url ? this.source[0].url : ''
        this.btnStyle.src2 = this.source[1].url ? this.source[1].url : ''
        this.btnStyle.top = this.source[2].top ? this.source[2].top : ''
        this.bosonStyle1.backgroundImage = this.source[3].url ? 'url(' + this.source[3].url + ')' : ''
        this.bosonStyle1.width = this.source[4].width ? this.source[4].width : ''
        this.bosonStyle1.height = this.source[5].height ? this.source[5].height : ''
        this.bosonStyle1.top = this.source[6].top ? this.source[6].top : ''
        this.bosonStyle2.top = this.source[6].top ? this.source[6].top : ''
        this.bosonStyle2.width = this.source[4].width ? this.source[4].width : ''
        this.bosonStyle2.height = this.source[5].height ? this.source[5].height : ''
        this.bosonStyle2.backgroundImage = this.source[7].url ? 'url(' + this.source[7].url + ')' : ''
        this.fingerStyle.backgroundImage = this.source[8].url ? 'url(' + this.source[8].url + ')' : ''
        this.fingerStyle.width = this.source[9].width ? this.source[9].width : ''
        this.fingerStyle.height = this.source[10].height ? this.source[10].height : ''
        this.fingerStyle.top = this.source[11].top ? this.source[11].top : ''
        this.fingerStyle.left = this.source[12].left ? this.source[12].left : ''
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .action{
    position: relative;
    margin:0 auto;
    text-align: center;
    z-index: 1;
  }
  .background{
    width:100%;
  }
  .boson{
    width:100%;
    text-align: center;
  }
  .boson_img{
    position: absolute;
    top:0;
    left:50%;
    animation: shake 2s linear infinite;
    background-repeat: no-repeat;
    background-size:100%;
  }
  .boson_img2{
    position: absolute;
    top:0;
    left:50%;
    transform: translateX(-50%);
    background-repeat: no-repeat;
    background-size:100%;
  }
  .btn_img{
    position: absolute;
    left:50%;
    transform: translateX(-50%);
    width:2.6rem;
  }
  .finger_img{
    position:absolute;
    top:4.4rem;
    left:4.3rem;
    background-repeat: no-repeat;
    background-size:200%;
  }
  @keyframes shake {
    0%{transform: translateY(0rem) rotate(0deg) translateX(-50%)}
    25%{transform: translateY(0.2rem) rotate(5deg) translateX(-50%)}
    50%{transform: translateY(0rem) rotate(0deg) translateX(-50%)}
    75%{transform: translateY(-0.2rem) rotate(5deg) translateX(-50%)}
    100%{transform: translateY(0rem) rotate(0deg) translateX(-50%)}
  }
</style>
