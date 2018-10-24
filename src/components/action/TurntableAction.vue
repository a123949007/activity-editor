<template>
  <div :style="baseStyle" class="action">
    <img ref="turntable" :style="baseStyleTab" :src="url1">
    <img class="light" :style="baseStyleTab" :src="url2">
    <img class="button" :style="baseStyleBtn" :src="url3" @click="start($event)">
    <img class="button" :style="baseStyleBtn" :src="url4" @click="start($event)" v-show="isRotate && url4">
  </div>
</template>

<script>
import { Turntable } from '$aweso/utils/animation'
import { postLpClk } from '$aweso/api/api'
import watchMixin from '$aweso/common/watchMixin'
import {sentEvent, listenEvent} from '$aweso/utils/event'

export default {
  name: 'TurntableAction',
  mixins: [watchMixin],
  props: {
    source: Array
  },
  data () {
    return {
      isRotate: false,
      times: 5,
      deg: 0, // 转盘起始角度
      rate: 200, // 转盘转动的帧数
      round: 3, // 转盘转动的圈数
      time: 3, // 转盘转动的时间
      position: 240, // 每次转盘固定转到的位置
      url1: '',
      url2: '',
      url3: '',
      url4: '',
      baseStyle: {
        top: ''
      },
      baseStyleTab: {
        width: ''
      },
      baseStyleBtn: {
        width: '',
        top: ''
      }
    }
  },
  mounted () {
    Turntable.selfRotate(this.$refs.turntable, this.rate, this.deg)
    this.getStyle()
    // 监听目前Times组件的次数
    listenEvent('sentTimes', (data) => {
      this.times = data
    })
  },
  beforeDestroy () {
    Turntable.stopSelfRotate()
  },
  methods: {
    start (e) {
      if (!this.isRotate && this.times > 0) {
        if (this.times <= 4) {
          // 次数少于等于4发送飘落气球请求
          sentEvent('openBalloon')
        }
        this.isRotate = true
        let obj = this.$refs.turntable.style.cssText
        // 记住现在旋转的角度
        let currentDeg = Number(obj.slice(obj.indexOf('(') + 1, obj.indexOf('deg')))
        // 向Times组件发送动作次数减1
        sentEvent('refreshTimes')
        // 向弹窗发送数据请求提前获取广告信息
        sentEvent('getPopData')
        // 发送点击数据统计
        postLpClk(e, 'lot')
        Turntable.stopSelfRotate()
        Turntable.touchRotate(this.$refs.turntable, currentDeg, this.time, this.round, this.position, () => {
          let _obj = this.$refs.turntable.style.cssText
          this.deg = Number(_obj.slice(_obj.indexOf('(') + 1, _obj.indexOf('deg')))
          this.isRotate = false
          // 向弹窗发送打开信息
          sentEvent('openPop')
          Turntable.selfRotate(this.$refs.turntable, this.rate, this.deg)
        })
      } else if (!this.isRotate && this.times <= 0) {
        // 打开中转页面
        sentEvent('openNext')
      }
    },
    getStyle () {
      if (this.source) {
        this.url1 = this.source[0].url ? this.source[0].url : ''
        this.url2 = this.source[1].url ? this.source[1].url : ''
        this.url3 = this.source[2].url ? this.source[2].url : ''
        this.url4 = this.source[3].url ? this.source[3].url : ''
        this.baseStyle.top = this.source[4].top ? this.source[4].top : '0rem'
        this.baseStyleTab.width = this.source[5].width ? this.source[5].width : '0rem'
        this.baseStyleBtn.width = this.source[6].width ? this.source[6].width : '0rem'
        this.baseStyleBtn.top = this.source[7].top ? this.source[7].top : '0rem'
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .action{
    position: relative;
    display: flex;
    width:100%;
    font-size:0;
    justify-content: center;
    align-items: center;
    z-index: 1;
  }
  .light{
    position: absolute;
    left:50%;
    transform: translateX(-50%);
  }
  .button{
    position: absolute;
    left:50%;
    transform: translateX(-50%);
  }

</style>
