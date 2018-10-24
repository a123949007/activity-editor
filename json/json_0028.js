{
  "name": "转盘",
  "id": "0028",
  "title": "幸运翻牌",
  "backgroundColor": "#f4d6c6",
  "isBack": true,
  "components": [
    {
      "name": "background",
      "src": "./components/common/Background.vue",
      "attr": {
        "iurl": "https://mejoy-static.91doujin.com/activity/images/t_0001/background.png"
      }
    },
    {
      "name": "times",
      "src": "./components/common/Times.vue",
      "attr": {
        "top": "3.46rem",
        "fontSize": "0.3rem",
        "color": "#f64d3d",
        "borderColor": "transparent"
      }
    },
    {
      "name": "flopAction",
      "src": "./components/action/FlopAction.vue",
      "attr": {
        "iurl1": "https://mejoy-static.91doujin.com/activity/images/t_0001/card.png",
        "iurl2": "https://mejoy-static.91doujin.com/activity/images/t_0001/selectedcard.png",
        "top": "4.2rem"
      }
    },
    {
      "name": "list",
      "src": "./components/common/List.vue",
      "attr": {
        "iurl": "https://mejoy-static.91doujin.com/activity/images/t_0011/prize.png",
        "top": "10.3rem",
        "width": "9rem"
      }
    },
    {
      "name": "pop",
      "id": "0002",
      "src": "./components/common/popups/pop2/Pop2.vue"
    },
    {
      "name": "next",
      "src": "./components/common/next/Next.vue"
    },
    {
      "name": "record",
      "src": "./components/common/Record.vue",
      "attr": {
        "iurl": "https://mejoy-static.91doujin.com/activity/images/t_0010/record.png",
        "top": "0rem",
        "right": "0rem",
        "width": "1.2rem"
      }
    },
    {
      "name": "balloon",
      "src": "./components/common/Balloon.vue",
      "attr": {
        "iurl": "https://mejoy-static.91doujin.com/activity/images/balloon0001/balloon.png",
        "width": "1.4rem"
      }
    }
  ]
}