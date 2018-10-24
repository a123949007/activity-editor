<template>
  <span class="times" :style="baseStyle">剩余抽奖次数：{{times}}  次</span>
</template>

<script>
import {getTimes} from '$aweso/api/api'
import watchMixin from '$aweso/common/watchMixin'
import {sentEvent, listenEvent} from '$aweso/utils/event'

export default {
  name: 'Times',
  mixins: [watchMixin],
  props: {
    source: Array
  },
  data () {
    return {
      times: 5,
      baseStyle: {
        top: '',
        fontSize: '',
        color: '',
        borderColor: ''
      }
    }
  },
  mounted () {
    getTimes((data) => {
      this.times = data.times
      sentEvent('sentTimes', data.times)
    })
    this.getStyle()
    // 监听Action组件发过来的次数刷新
    listenEvent('refreshTimes', () => {
      this.times--
    })
  },
  watch: {
    times (val) {
      // times变化后发送给Action组件-
      sentEvent('sentTimes', val)
    }
  },
  methods: {
    getStyle () {
      if (this.source) {
        this.baseStyle.top = this.source[0].top ? this.source[0].top : '0rem'
        this.baseStyle.fontSize = this.source[2].fontSize ? this.source[2].fontSize : '0.3rem'
        this.baseStyle.color = this.source[1].color ? this.source[1].color : '#fff'
        this.baseStyle.borderColor = this.source[3].borderColor ? this.source[3].borderColor : '#fff'
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .times{
    position:absolute;
    left: 50%;
    transform: translateX(-50%);
    border-width:1px;
    border-style:solid;
    border-radius: .5rem;
    padding: .1rem .3rem;
    z-index: 2;
  }
</style>
