<template>
  <transition name="fade">
    <div class="wrapper" v-show="isShow">
      <div class="reward" :class="{open:isOpen,close:!isOpen}">
        <div class="cancle" @click="close"></div>
        <img class="light" src="./images/light.png" alt="">
        <img class="background" src="./images/reward_bg.png" alt="">
        <img @click="jump(rewardData.curl,rewardData.ad_curl)" class="reward-pic" :src="rewardData.iurl" alt="">
        <div class="reward-title">
          <span class="reward-title_text">{{rewardData.title}}</span>
        </div>
        <div @click="jump(rewardData.curl,rewardData.ad_curl)" class="reward-confirm">
          <span class="reward-confirm_text" id="button_title">{{rewardData.button_title}}</span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import {getToken, postAdImp, postAdClk} from '$aweso/api/api'
import {sentEvent, listenEvent} from '$aweso/utils/event'
export default {
  name: 'Pop1',
  props: {},
  data () {
    return {
      isShow: false,
      isOpen: false,
      isJump: false,
      rewardData: {}
    }
  },
  mounted () {
    // 先获取数据
    listenEvent('getPopData', () => {
      getToken((data) => {
        this.rewardData = data
        // adImp数据
        postAdImp(data.adid)
        // 把获取到的广告信息发送到lp页面，给特殊的lp使用
        sentEvent('sentPopData', data)
      })
    })
    // 打开弹窗
    listenEvent('openPop', () => {
      this.open()
    })
  },
  methods: {
    close () {
      this.isOpen = false
      this.isJump = false
      // 延迟窗口关闭，奖品跳去奖品列表
      setTimeout(() => {
        this.rewardData = {}
        this.isShow = false
        // 关闭弹窗后的动画
        sentEvent('closePop')
      }, 200)
    },
    open (data) {
      this.isOpen = true
      this.isShow = true
      this.isJump = false
    },
    jump (curl, adCurl) {
      if (!this.isJump) {
        this.rewardData.button_title = '跳转中...'
        this.isJump = true
        postAdClk(curl, () => {
          if (window.top && this.rewardData.atopv) {
            window.top.location = adCurl
          } else {
            window.location.href = adCurl
          }
        })
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.wrapper {
  font-size: 0;
  position: fixed;
  top: 0;
  z-index: 3;
  width: 100%;
  height: 100%;
  background: rgba(2, 2, 2, 0.8);
}
.reward {
  display: flex;
  justify-content: center;
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  perspective:500;
}
.open {
  animation: open 0.5s ease forwards;
}
.close {
  animation: close 0.5s ease forwards;
}
.cancle {
  position: absolute;
  right: 0.2rem;
  top: 0.2rem;
  width: 1rem;
  height: 1rem;
  background: url(./images/close.png) center center no-repeat;
  z-index: 1;
  background-size: 60%;
}
.light {
  position: absolute;
  top: 0.5rem;
  width: 100%;
  left: 0;
  animation: rotate 8s linear infinite;
}
.background {
  position: absolute;
  top: 1.6rem;
  width: 90%;
  left: 50%;
  transform: translateX(-50%);
}
.reward-pic {
  position: absolute;
  top: 4.8rem;
  width: 5.4rem;
  left: 50%;
  transform: translateX(-50%);
  box-shadow: 0 0 20px 1px #48443e;
  border-radius: 0.2rem;
  transform-origin:50% 0%;
  -webkit-transform-origin:50% 0%;
  animation: push 1.4s linear;
  -webkit-animation: push 1.4s linear;
}
.reward-title{
  position: absolute;
  z-index: 2;
  left:50%;
  top:3.76rem;
  transform:translateX(-50%);
  -webkit-transform:translateX(-50%);
  display: flex;
  align-items:center;
  justify-content:center;
  width: 3rem;
  height: 0.5rem;
  background: #FED22F;
  border-radius: 0.25rem;
}

.reward-title_text{
  font-size: 0.24rem;
  color: #e5533d;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.reward-confirm{
  position: absolute;
  z-index: 2;
  left:50%;
  top:8rem;
  transform:translateX(-50%);
  display: flex;
  align-items:center;
  justify-content:center;
  width:2.4rem;
  height:2.4rem;
  background:url(./images/btn.png) 0 0 no-repeat;
  background-size:100%;
}
.reward-confirm_text{
    width:2.4em;
    font-size: 0.7rem;
    color:#d60c1f;
    font-weight:800;
    line-height: 1;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: wrap;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

@keyframes rotate {
  0%,
  100% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@keyframes open {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes close {
  0% {
    transform: translate(0, 0) scale(1, 1);
  }
  100% {
    transform: translate(3.2rem, -5.8rem) scale(0, 0);
  }
}
@keyframes push {
    0%{
        transform: rotateX(90deg) translateX(-50%);
    }
    100%{
        transform: rotateX(0deg) translateX(-50%);
    }
}
</style>
