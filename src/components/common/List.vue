<template>
  <div class="list" :style="baseStyle">
    <img :style="baseStyleList" class="list_background" :src="url" alt="">
  </div>
</template>

<script>
import watchMixin from '$aweso/common/watchMixin'

export default {
  name: 'List',
  mixins: [watchMixin],
  props: {
    source: Array
  },
  data () {
    return {
      url: '',
      baseStyle: {
        top: ''
      },
      baseStyleList: {
        width: ''
      }
    }
  },
  mounted () {
    this.getStyle()
  },
  watch: {

  },
  methods: {
    getStyle () {
      this.url = this.source[0].url ? this.source[0].url : ''
      this.baseStyle.top = this.source[1].top ? this.source[1].top : '0rem'
      this.baseStyleList.width = this.source[2].width ? this.source[2].width : '0rem'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .list{
    position: absolute;
    width:100%;
    font-size:0;
    overflow: auto;
    z-index: 1;
  }
  .list_background{
    width:9rem;
  }
</style>
