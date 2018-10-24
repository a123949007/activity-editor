/*
type类型：
        1（图片地址）、
        2（宽度）、
        3（高度）、
        4（左边距）、
        5（右边距）、
        6（颜色）、
        7（字体大小）、
        8（边框颜色）、
        9（右边距）
*/
export default {
  name: '转盘',
  // 名字
  id: '0028',
  // ID
  title: '幸运翻牌',
  // 页面title
  backgroundColor: '#f4d6c6',
  // 网页背景颜色
  isBack: true,
  // 是否劫持返回
  // 组件
  components: [
    {
      // 背景组件（通用）
      name: 'background',
      // 名字
      src: './components/common/Background.vue',
      // 组件的地址
      // 组件的属性
      attr: [
        {
          url: 'https://mejoy-static.91doujin.com/activity/images/t_0003/background.png',
          type: 1,
          desc: '背景图片'
        }
      ]
    },
    {
      // 次数组件（通用）
      name: 'times',
      // 名字
      src: './components/common/Times.vue',
      // 组件地址
      // 组件属性
      attr: [
        {
          top: '3.16rem',
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
      // 翻牌组件（独立）
      name: 'flopAction',
      // 名字
      src: './components/action/FlopAction.vue',
      // 组件地址
      attr: [
        {
          url: 'https://mejoy-static.91doujin.com/activity/images/t_0001/card.png',
          type: 1,
          desc: '牌的图片'
        },
        {
          url: 'https://mejoy-static.91doujin.com/activity/images/t_0001/selectedcard.png',
          type: 1,
          desc: '选中牌的图片'
        },
        {
          top: '4.2rem',
          type: 5,
          desc: '上边距'
        }
      ]
    },
    {
      // 转盘组件（独立）
      name: 'turntableAction',
      // 名字
      src: './components/action/TurntableAction.vue',
      // 组件地址
      attr: [
        {
          url: 'https://mejoy-static.91doujin.com/activity/images/t_0011/turntable.png',
          type: 1,
          desc: '转盘图片'
        },
        {
          url: 'https://mejoy-static.91doujin.com/activity/images/t_0011/turntable2.gif',
          type: 1,
          desc: '灯圈图片'
        },
        {
          url: 'https://mejoy-static.91doujin.com/activity/images/t_0011/button.png',
          type: 1,
          desc: '激活按钮图片'
        },
        {
          url: 'https://mejoy-static.91doujin.com/activity/images/t_0011/button2.png',
          type: 1,
          desc: '失效按钮图片'
        },
        {
          top: '3.6rem',
          type: 5,
          desc: '组件上边距'
        },
        {
          width: '6rem',
          type: 2,
          desc: '组件宽度'
        },
        {
          width: '2.12rem',
          type: 2,
          desc: '按钮宽度'
        },
        {
          top: '1.9rem',
          type: 5,
          desc: '按钮上边距'
        }
      ]
    },
    {
      // 砸金蛋组件（独立）
      name: 'goldenEgg',
      // 名字
      src: './components/action/GoldenEggAction.vue',
      // 组件地址
      attr: [
        {
          url: 'https://mejoy-static.91doujin.com/activity/images/t_0014/egg.png',
          type: 1,
          desc: '正常状态图片'
        },
        {
          url: 'https://mejoy-static.91doujin.com/activity/images/t_0014/open_egg.png',
          type: 1,
          desc: '跳跃状态图片'
        },
        {
          url: 'https://mejoy-static.91doujin.com/activity/images/t_0014/broken_egg.png',
          type: 1,
          desc: '已开状态图片'
        },
        {
          top: '3.6rem',
          type: 5,
          desc: '上边距'
        }
      ]
    },
    {
      // 刮刮卡组件（独立）
      name: 'ScratchyCard',
      // 名字
      src: './components/action/ScratchyCard.vue',
      // 组件地址
      attr: [
        {
          url: 'https://mejoy-static.91doujin.com/activity/images/t_0003/main_button.png',
          type: 1,
          desc: '按钮图片'
        },
        {
          top: '5rem',
          type: 5,
          desc: '上边距'
        },
        {
          width: '5.2rem',
          type: 2,
          desc: '宽度'
        },
        {
          height: '3rem',
          type: 3,
          desc: '高度'
        },
        {
          color: '#999',
          type: 6,
          desc: '涂层颜色'
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
          top: '4.7rem',
          type: 5,
          desc: '上边距'
        },
        {
          width: '6.4rem',
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
      // 摇骰子（独立）
      name: 'Boson',
      // 名字
      src: './components/action/Boson.vue',
      // 组件地址
      attr: [
        {
          url: 'https://mejoy-static.91doujin.com/activity_t/images/t_3335/btn.png',
          type: 1,
          desc: '按钮激活图片'
        },
        {
          url: 'https://mejoy-static.91doujin.com/activity_t/images/t_3335/btn_disabled.png',
          type: 1,
          desc: '按钮失效图片'
        },
        {
          top: '7.7rem',
          type: 5,
          desc: '按钮上边距'
        },
        {
          url: 'https://mejoy-static.91doujin.com/activity_t/images/t_3335/dice.png',
          type: 1,
          desc: '骰子常态图'
        },
        {
          width: '3rem',
          type: 2,
          desc: '骰子宽度'
        },
        {
          height: '3rem',
          type: 3,
          desc: '骰子高度'
        },
        {
          top: '3.3rem',
          type: 5,
          desc: '骰子上边距'
        },
        {
          url: 'https://yun.tuisnake.com/h5-mami/activity/rollDick/2.0/png/process.png',
          type: 1,
          desc: '骰子动态图'
        },
        {
          url: 'https://yun.tuisnake.com/h5-mami/activity/hand.png',
          type: 1,
          desc: '指针图片'
        },
        {
          width: '2rem',
          type: 2,
          desc: '指针宽度'
        },
        {
          height: '2rem',
          type: 3,
          desc: '指针高度'
        },
        {
          top: '7.7rem',
          type: 5,
          desc: '指针上边距'
        },
        {
          top: '4.3rem',
          type: 4,
          desc: '指针左边距'
        }
      ]
    },
    {
      // 奖品列表组件（通用）
      name: 'list',
      // 名字
      src: './components/common/List.vue',
      // 组件地址
      attr: [
        {
          url: 'https://mejoy-static.91doujin.com/activity/images/t_0011/prize.png',
          type: 1,
          desc: '奖品图片'
        },
        {
          top: '9.6rem',
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
      // 弹窗组件1（通用）
      name: 'pop1',
      // 名字
      id: '0001',
      // 组件id
      src: './components/common/popups/pop1/Pop1.vue'
      // 组件地址
    },
    {
      // 弹窗组件2（通用）
      name: 'pop2',
      // 名字
      id: '0002',
      // 组件id
      src: './components/common/popups/pop2/Pop2.vue'
      // 组件地址
    },
    {
      // 次数用完后弹出页面（通用）
      name: 'next',
      // 名字
      src: './components/common/next/Next.vue'
      // 组件地址
    },
    {
      // 奖品列表组件（通用）
      name: 'record',
      // 名称
      src: './components/common/Record.vue',
      // 组件地址
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
      // 抽完2次后弹出气球（通用）
      name: 'balloon',
      // 名称
      src: './components/common/Balloon.vue',
      // 组件地址
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
