<template>
  <div :style="baseStyle" class="action">
    <span class="main-item" v-for="(item,index) in list" :key="index" @click="start($event,index)">
        <div class="main-item_front">
            <img class="main-item_front_img" :src="url1">
        </div>
    </span>
  </div>
</template>

<script>
import { Flop } from '$aweso/utils/animation'
import { postLpClk } from '$aweso/api/api'
import watchMixin from '$aweso/common/watchMixin'
import {sentEvent, listenEvent} from '$aweso/utils/event'
export default {
  name: 'FlopAction',
  mixins: [watchMixin],
  props: {
    source: Array
  },
  data () {
    return {
      isOpen: true,
      times: 5,
      url1: '',
      url2: '',
      list: [0, 1, 2, 3, 4, 5],
      baseStyle: {
        top: ''
      }
    }
  },
  mounted () {
    this.getStyle()
    // 监听目前Times组件的次数
    listenEvent('sentTimes', (data) => {
      this.times = data
    })
    // 监听关闭弹窗后执行的函数
    listenEvent('closePop', () => {
      this.isOpen = true
      Flop.reloadCard('main-item', this.url1)
      Flop.dispatchCard('main-item', this.url1, this.url2, () => {
        this.isOpen = false
      })
    })
    Flop.dispatchCard('main-item', this.url1, this.url2, () => {
      this.isOpen = false
    })
  },
  beforeDestroy () {
    Flop.closeCard()
  },
  methods: {
    start (e, index) {
      if (!this.isOpen && this.times > 0) {
        if (this.times <= 4) {
          // 次数少于等于4发送飘落气球请求
          sentEvent('openBalloon')
        }
        this.isOpen = true
        Flop.closeCard()
        Flop.openCard('main-item', index, () => {
          this.isOpen = false
          sentEvent('openPop')
        })
        // this.isRotate = true
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
        this.baseStyle.top = this.source[2].top ? this.source[2].top : ''
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

.main-item {
    position: absolute;
    width: 1.58rem;
    height: 2.12rem;
    transition: 0.5s;
    transform-style: preserve-3d;
    left: 0.7rem;
    top: 0rem;
    box-shadow: 2px 2px 10px 1px #824015;
    border-radius: 0.14rem;
}

/* hide back of pane during swap */

.main-item_front {
    backface-visibility: hidden;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
}

/* back, initially hidden pane */

.main-item_front_img {
    width: 100%;
}

</style>
