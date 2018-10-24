<template>
  <transition name="fade">
    <div class="next" v-show="isShow">
      <div class="next-main">
        <img class="next-main_close" src="./images/close.png" @click="close">
        <img class="next-main_background" src='./images/next_background.png'>
        <img class="next-main_list1" :src="list1.iurl" @click="jump(list1.curl)">
        <img class="next-main_button1" src="./images/next_button.png" @click="jump(list1.curl)">
        <img class="next-main_list2" :src="list2.iurl" @click="jump(list2.curl)">
        <img class="next-main_button2" src="./images/next_button.png" @click="jump(list2.curl)">
      </div>
    </div>
  </transition>
</template>

<script>
import { getLpList } from '$aweso/api/api'
import {listenEvent} from '$aweso/utils/event'
export default {
  name: 'Next',
  props: {},
  data () {
    return {
      isShow: false,
      list1: {
        iurl: '',
        curl: ''
      },
      list2: {
        iurl: '',
        curl: ''
      }
    }
  },
  mounted () {
    listenEvent('openNext', () => {
      this.open()
    })
    getLpList(2, (res) => {
      this.list1 = res[0]
      this.list2 = res[1]
    })
  },
  methods: {
    close () {
      this.isShow = false
    },
    open (data) {
      this.isShow = true
    },
    jump (curl) {
      console.log(curl)
      window.location = curl
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.next {
  font-size: 0;
  position: fixed;
  top: 0;
  z-index: 3;
  width: 100%;
  height: 100%;
  background: rgba(2, 2, 2, 0.8);
}
.next-main{
  position: relative;
}
.next-main_close{
  position:absolute;
  width:0.6rem;
  top:0.6rem;
  right:0.6rem;
}
.next-main_background{
  position: absolute;
  left:50%;
  top:1.4rem;
  transform: translateX(-50%);
  width:6.4rem;
}
.next-main_list1{
  position: absolute;
  left:50%;
  top:3.45rem;
  transform: translateX(-50%);
  width:6.1rem;
  height:2.28rem;
}
.next-main_list2{
  position: absolute;
  left:50%;
  top:6.72rem;
  transform: translateX(-50%);
  width:6.1rem;
  height:2.28rem;
}
.next-main_button1{
  position: absolute;
  width:2.1rem;
  left:50%;
  top:5.38rem;
  transform: translateX(-50%);
}
.next-main_button2{
  position: absolute;
  width:2.1rem;
  left:50%;
  top:8.66rem;
  transform: translateX(-50%);
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
