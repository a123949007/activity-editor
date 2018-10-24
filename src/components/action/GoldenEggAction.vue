<template>
  <div :style="baseStyle" class="action">
    <img v-for="item in list" :key="item.idx" @click="start($event,item.idx,item.isBroken)" class="main-item_pic" :src="item.isBroken ? url3 : item.isSelect ? url2 : url1" alt="">
  </div>
</template>

<script>
import { GoldenEgg } from '$aweso/utils/animation'
import { postLpClk } from '$aweso/api/api'
import watchMixin from '$aweso/common/watchMixin'
import {sentEvent, listenEvent} from '$aweso/utils/event'
import {setCookie, getCookie} from '$aweso/utils/utils'

export default {
  name: 'GoldenEggAction',
  mixins: [watchMixin],
  props: {
    source: Array
  },
  data () {
    return {
      isOpen: false,
      times: 5,
      url1: '',
      url2: '',
      url3: '',
      brokenList: [],
      list: [
        {idx: 0, isSelect: false, isBroken: false},
        {idx: 1, isSelect: false, isBroken: false},
        {idx: 2, isSelect: false, isBroken: false},
        {idx: 3, isSelect: false, isBroken: false},
        {idx: 4, isSelect: false, isBroken: false},
        {idx: 5, isSelect: false, isBroken: false},
        {idx: 6, isSelect: false, isBroken: false},
        {idx: 7, isSelect: false, isBroken: false},
        {idx: 8, isSelect: false, isBroken: false}
      ],
      baseStyle: {
        top: ''
      }
    }
  },
  mounted () {
    this.getStyle()
    this.getBrokenList()
    // 监听目前Times组件的次数
    listenEvent('sentTimes', (data) => {
      if (data === 5) {
        setCookie('brokenList', '')
        this.getBrokenList()
      }
      this.times = data
    })
    // 监听关闭弹窗后执行的函数
    listenEvent('closePop', () => {
      GoldenEgg.carousel(this.list)
    })
  },
  beforeDestroy () {
    GoldenEgg.stopCarousel(this.list)
  },
  methods: {
    getBrokenList () {
      let _brokenList = []
      if (getCookie('brokenList')) {
        getCookie('brokenList').split(',').forEach(item => {
          _brokenList.push(Number(item))
        })
        this.brokenList = _brokenList
        this.brokenList.forEach(idx => {
          this.list[idx].isBroken = true
        })
      } else {
        this.brokenList = []
        this.list.forEach(item => {
          item.isBroken = false
        })
      }
      GoldenEgg.stopCarousel(this.list)
      GoldenEgg.carousel(this.list)
    },
    start (e, index, isBroken) {
      if (!this.isOpen && this.times > 0 && !isBroken) {
        if (this.times <= 4) {
          // 次数少于等于4发送飘落气球请求
          sentEvent('openBalloon')
        }
        this.isOpen = true
        this.brokenList.push(index)
        setCookie('brokenList', this.brokenList)
        GoldenEgg.stopCarousel(this.list)
        GoldenEgg.openEgg(this.list, index, () => {
          sentEvent('openPop')
          this.list[index].isBroken = true
          this.isOpen = false
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
    getStyle () {
      if (this.source) {
        this.url1 = this.source[0].url ? this.source[0].url : ''
        this.url2 = this.source[1].url ? this.source[1].url : ''
        this.url3 = this.source[2].url ? this.source[2].url : ''
        this.baseStyle.top = this.source[3].top ? this.source[3].top : '0rem'
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
    text-align: center;
    z-index: 1;
  }
  .main-item_pic{
    width:1.9rem;
    height: 2.3rem;
    margin:0 0.2rem;
  }
</style>
