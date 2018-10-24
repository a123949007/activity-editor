<template>
  <div :style="baseStyle" class="action">
    <img class="background" :src="bgUrl" ref="bg">
    <img v-for="(item,index) in list" :key="index" :class="item.class" :src="item.src" v-show="item.isShow">
    <img @click='start' class="button" :src="btnUrl">
  </div>
</template>

<script>
import { Squareup } from '$aweso/utils/animation'
import { postLpClk } from '$aweso/api/api'
import watchMixin from '$aweso/common/watchMixin'
import {sentEvent, listenEvent} from '$aweso/utils/event'

export default {
  name: 'SquareupAction',
  mixins: [watchMixin],
  props: {
    source: Array
  },
  data () {
    return {
      isOpen: false,
      times: 5,
      baseStyle: {},
      bgUrl: '',
      btnUrl: '',
      list: [
        {class: 'item1', src: '', isShow: true},
        {class: 'item2', src: '', isShow: true},
        {class: 'item3', src: '', isShow: true},
        {class: 'item4', src: '', isShow: true},
        {class: 'item5', src: '', isShow: true},
        {class: 'item6', src: '', isShow: true},
        {class: 'item7', src: '', isShow: true},
        {class: 'item8', src: '', isShow: true}
      ]
    }
  },
  mounted () {
    this.getStyle()
    Squareup.init(this.list, () => {
      sentEvent('openPop')
      this.isOpen = false
    })
    // 监听目前Times组件的次数
    listenEvent('sentTimes', (data) => {
      this.times = data
    })
    // 监听关闭弹窗后执行的函数
    listenEvent('closePop', () => {
      Squareup.init(this.list, () => {
        sentEvent('openPop')
        this.isOpen = false
      })
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
        Squareup.run()
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
        this.bgUrl = this.source[0].url
        this.baseStyle.top = this.source[1].top
        this.baseStyle.width = this.source[2].width
        this.btnUrl = this.source[3].url
        this.list[0].src = this.source[4].url
        this.list[1].src = this.source[5].url
        this.list[2].src = this.source[6].url
        this.list[3].src = this.source[7].url
        this.list[4].src = this.source[8].url
        this.list[5].src = this.source[9].url
        this.list[6].src = this.source[10].url
        this.list[7].src = this.source[11].url
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
  .button{
    position:absolute;
    left:36%;
    top:34.5%;
    width:30%;
    animation: scale 0.8s linear infinite;
  }
  .item1{
    position:absolute;
    left:3.6%;
    top:3.2%;
    width:30%;
  }
  .item2{
    position:absolute;
    left:35.4%;
    top:3.2%;
    width:30%;
  }
  .item3{
    position:absolute;
    left:67.4%;
    top:3.2%;
    width:30%;
  }
  .item4{
    position:absolute;
    left:67.4%;
    top:34%;
    width:30%;
  }
  .item5{
    position:absolute;
    left:67.4%;
    top:63.8%;
    width:30%;
  }
  .item6{
    position:absolute;
    left:35.4%;
    top:63.8%;
    width:30%;
  }
  .item7{
    position:absolute;
    left:3.6%;
    top:63.8%;
    width:30%;
  }
  .item8{
    position:absolute;
    left:3.6%;
    top:34%;
    width:30%;
  }
  @keyframes scale {
    0%{transform: scale(1,1)}
    50%{transform: scale(1.08,1.08)}
    100%{transform: scale(1,1)}
  }
</style>
