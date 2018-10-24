import Vue from 'vue'
import App from '$aweso/App.vue'
import {getJson} from '$aweso/api/api'
import {pushHistory} from '$aweso/utils/utils'
Vue.config.productionTip = false

const json = {
  name: '摇色子',
  tid: '0011',
  title: '幸运摇色子',
  backgroundColor: '#2A51A0',
  isBack: true,
  components: [
    {
      name: 'background',
      src: './components/common/Background.vue',
      attr: [
        {
          url: 'https://mejoy-static.91doujin.com/activity_t/images/t_3335/puvfj7ijrd.jpg',
          type: 1,
          desc: '背景图片'
        }
      ]
    },
    {
      name: 'times',
      src: './components/common/Times.vue',
      attr: [
        {
          top: '1rem',
          type: 5,
          desc: '上边距'
        },
        {
          color: '#000',
          type: 6,
          desc: '字体颜色'
        },
        {
          fontSize: '0.3rem',
          type: 7,
          desc: '字体大小'
        },
        {
          borderColor: 'transparent',
          type: 8,
          desc: '边框颜色'
        }
      ]
    },
    {
      // 九宫格（独立）
      name: 'Squareup',
      // 名字
      src: './components/action/Squareup.vue',
      // 组件地址
      attr: [
        {
          url: 'https://mejoy-static.91doujin.com/activity/images/t_0005/blank.png',
          type: 1,
          desc: '背景图'
        },
        {
          top: '3rem',
          type: 5,
          desc: '上边距'
        },
        {
          width: '6rem',
          type: 2,
          desc: '宽度'
        },
        {
          url: 'https://mejoy-static.91doujin.com/activity/images/t_0005/start.png',
          type: 1,
          desc: '按钮图片'
        },
        {
          url: 'https://mejoy-static.91doujin.com/activity/images/t_0005/pic1.png',
          type: 1,
          desc: '格子1图片'
        },
        {
          url: 'https://mejoy-static.91doujin.com/activity/images/t_0005/pic2.png',
          type: 1,
          desc: '格子2图片'
        },
        {
          url: 'https://mejoy-static.91doujin.com/activity/images/t_0005/pic3.png',
          type: 1,
          desc: '格子3图片'
        },
        {
          url: 'https://mejoy-static.91doujin.com/activity/images/t_0005/pic4.png',
          type: 1,
          desc: '格子4图片'
        },
        {
          url: 'https://mejoy-static.91doujin.com/activity/images/t_0005/pic5.png',
          type: 1,
          desc: '格子5图片'
        },
        {
          url: 'https://mejoy-static.91doujin.com/activity/images/t_0005/pic6.png',
          type: 1,
          desc: '格子6图片'
        },
        {
          url: 'https://mejoy-static.91doujin.com/activity/images/t_0005/pic7.png',
          type: 1,
          desc: '格子7图片'
        },
        {
          url: 'https://mejoy-static.91doujin.com/activity/images/t_0005/pic8.png',
          type: 1,
          desc: '格子8图片'
        }
      ]
    },
    {
      name: 'pop',
      id: '0001',
      src: './components/common/popups/pop1/Pop1.vue'
    },
    {
      name: 'next',
      src: './components/common/next/Next.vue'
    },
    {
      name: 'record',
      src: './components/common/Record.vue',
      attr: [
        {
          url: 'https://mejoy-static.91doujin.com/activity/images/t_0010/record.png',
          type: 1,
          desc: '我的奖品图标'
        },
        {
          top: '0rem',
          type: 5,
          desc: '上边距'
        },
        {
          left: '',
          type: 4,
          desc: '左边距'
        },
        {
          right: '0rem',
          type: 9,
          desc: '右边距'
        },
        {
          width: '1.2rem',
          type: 2,
          desc: '宽度'
        }
      ]
    },
    {
      name: 'list',
      src: './components/common/List.vue',
      attr: [
        {
          url: 'https://mejoy-static.91doujin.com/activity/images/t_0011/prize.png',
          type: 1,
          desc: '奖品图片'
        },
        {
          top: '11rem',
          type: 5,
          desc: '上边距'
        },
        {
          width: '9rem',
          type: 2,
          desc: '宽度'
        }
      ]
    },
    {
      name: 'balloon',
      src: './components/common/Balloon.vue',
      attr: [
        {
          url: 'https://mejoy-static.91doujin.com/activity/images/balloon0001/balloon.png',
          type: 1,
          desc: '悬浮球图标'
        },
        {
          width: '1.4rem',
          type: 2,
          desc: '宽度'
        }
      ]
    }
  ]
}

const installComponents = item => Vue.component(item.name, () => import(`${item.src}`).then(m => m.default))
const create = (json) => {
  document.title = json.title
  json.components.forEach(installComponents)
  new Vue({
    render: h => h(App),
    data () {
      return {
        json
      }
    },
    mounted () {
      if (json.isBack) pushHistory('9001')
    }
  }).$mount('#app')
}

// 测试用
create(json)

// 正式用
// getJson(function (res) {
//   create(res.data.lp_config)
// })
