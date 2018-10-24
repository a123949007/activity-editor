<template>
  <img ref="balloon" v-show="isShow" :style="baseStyle" @click="jump" :class="{balloon:!isFloat,balloon2:isFloat}" :src="url" alt="">
</template>

<script>
import {getLpList} from '$aweso/api/api'
import watchMixin from '$aweso/common/watchMixin'
import {listenEvent} from '$aweso/utils/event'

export default {
  name: 'Balloon',
  mixins: [watchMixin],
  props: {
    source: Array
  },
  data () {
    return {
      isShow: false,
      isFloat: false,
      url: '',
      curl: '',
      baseStyle: {
        width: ''
      }
    }
  },
  mounted () {
    listenEvent('openBalloon', () => {
      this.isShow = true
      setTimeout(() => {
        this.isFloat = true
      }, 3000)
    })
    getLpList(1, (data) => {
      this.curl = data[0].curl
    })
    this.getStyle()
  },
  methods: {
    jump () {
      window.location.href = this.curl
    },
    getStyle () {
      if (this.source) {
        this.url = this.source[0].url ? this.source[0].url : ''
        this.baseStyle.width = this.source[1].width ? this.source[1].width : '1.4rem'
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .balloon{
    position:absolute;
    right:0.6rem;
    top:-2.4rem;
    background-size:100%;
    animation:float 3s ease forwards;
    z-index: 2;
  }
  .balloon2{
    position:absolute;
    right:0.6rem;
    top:6rem;
    background-size:100%;
    animation:move 1.5s linear infinite;
    z-index: 2;
  }
  @keyframes float {
    0%{transform:translate(0,0);}
    100%{transform:translate(0rem,8.4rem);}
  }

  @keyframes move {
    0%{transform:translate(0,0);}
    25%{transform:translate(0,0.4rem)}
    50%{transform:translate(0,0.8rem)}
    75%{transform:translate(0,0.4rem)}
    100%{transform:translate(0,0);}
  }
</style>
