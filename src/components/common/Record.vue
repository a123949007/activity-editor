<template>
  <img @click="jump($event)" class="record" :style="baseStyle" :src="url" alt="">
</template>

<script>
import {postLpClk} from '$aweso/api/api'
import watchMixin from '$aweso/common/watchMixin'
import {getURLParameter} from '$aweso/utils/utils'

export default {
  name: 'Record',
  mixins: [watchMixin],
  props: {
    source: Array
  },
  data () {
    return {
      url: '',
      baseStyle: {
        width: '',
        top: '',
        left: '',
        right: ''
      }
    }
  },
  mounted () {
    this.getStyle()
  },
  watch: {
  },
  methods: {
    jump (e) {
      postLpClk(e, 'list', () => {
        let _tid = getURLParameter('tid')
        let _url = window.location.search.replace(_tid, '0000')
        window.location.href = '/list/index.html' + _url
        return false
      })
    },
    getStyle () {
      if (this.source) {
        this.url = this.source[0].url ? this.source[0].url : ''
        this.baseStyle.top = this.source[1].top ? this.source[1].top : '0rem'
        this.baseStyle.left = this.source[2].left ? this.source[2].left : ''
        this.baseStyle.right = this.source[3].right ? this.source[3].right : ''
        this.baseStyle.width = this.source[4].width ? this.source[4].width : '1.2rem'
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .record{
    position: absolute;
    z-index: 1;
  }
</style>
