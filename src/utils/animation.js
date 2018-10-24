/**
author:SunZhibin
time:2018.07.11
description:各种lp动画库，请按需加载
 **/
import Move from 'move-js'

/* 转盘相关动作 */
const Turntable = {
  timer: null,
  // 转盘自转
  selfRotate (id, rate = 200, deg = 0, callback) {
    if (!id) return
    this.timer = setInterval(() => {
      deg++
      Move(id)
        .rotate(deg)
        .end(function () {
          callback && callback()
        })
    }, rate)
  },
  // 转盘停止自转
  stopSelfRotate () {
    clearInterval(this.timer)
  },

  // 点击抽奖后转盘转动，id转盘的ref，deg转盘起始角度，time转盘转动的时间，round转盘转动的圈数，position转盘停下的位置，callback回调函数
  touchRotate (id, deg = 0, time = 3, round = 3, position = 0, callback) {
    if (!id) return
    time = time.toString() + 's'
    if ((deg % 360) < 180) {
      deg = deg + (360 * round) + position - (deg % 360)
    } else {
      deg = deg + (360 * (round + 1)) + position - (deg % 360)
    }
    Move(id)
      .rotate(deg)
      .duration(time)
      .end(function () {
        callback && callback()
      })
  }
}

/* 翻牌相关动作 */
const Flop = {
  counter: 0,
  timer: null,
  // 发牌
  dispatchCard (id, iurl1, iurl2, callback) {
    let list = document.getElementsByClassName(id)
    setTimeout(() => {
      list[1].style.left = '3rem'
      setTimeout(() => {
        list[2].style.left = '5.26rem'
        setTimeout(() => {
          list[3].style.top = '2.6rem'
          setTimeout(() => {
            list[4].style.left = '3rem'
            list[4].style.top = '2.6rem'
            setTimeout(() => {
              list[5].style.left = '5.26rem'
              list[5].style.top = '2.6rem'
              setTimeout(() => {
                callback && callback()
                this.timer = setInterval(() => {
                  Array.prototype.forEach.call(list, (item) => {
                    item.getElementsByTagName('img')[0].src = iurl1
                  })
                  list[this.counter].getElementsByTagName('img')[0].src = iurl2
                  this.counter++
                  if (this.counter > 5) this.counter = 0
                }, 1000)
              }, 0)
            }, 500)
          }, 500)
        }, 500)
      }, 500)
    }, 500)
  },

  // 翻牌
  openCard (id, index, callback) {
    let obj = document.getElementsByClassName(id)[index]
    obj.style.transform = 'scale(1.2)'
    obj.style.webkitTransform = 'scale(1.2)'
    setTimeout(() => {
      obj.style.transform = 'scale(1.2) rotateY(90deg)'
      obj.style.webkitTransform = 'scale(1.2) rotateY(90deg)'
      setTimeout(() => {
        callback && callback()
      }, 300)
    }, 500)
  },

  // 停止牌发亮
  closeCard () {
    clearInterval(this.timer)
  },

  // 洗牌
  reloadCard (id, iurl1) {
    this.counter = 0
    let list = document.getElementsByClassName(id)
    Array.prototype.forEach.call(list, (item) => {
      item.getElementsByTagName('img')[0].src = iurl1
      item.style.transform = ''
      item.style.webkitTransform = ''
      item.style.left = '0.7rem'
      item.style.top = '0rem'
    })
  }
}

const GoldenEgg = {
  timer: null,
  counter: 0,
  arr: [],
  // 轮播蛋
  carousel (list) {
    this.counter = 0
    this.arr = []
    list.forEach((item) => {
      if (!item.isBroken) {
        this.arr.push(item.idx)
      }
    })
    this.timer = setInterval(() => {
      list.forEach((item) => {
        item.isSelect = false
      })
      list[this.arr[this.counter]].isSelect = true
      this.counter++
      if (this.counter > this.arr.length - 1) {
        this.counter = 0
      }
    }, 500)
  },
  // 停止轮播
  stopCarousel (list) {
    list.forEach((item) => {
      item.isSelect = false
    })
    clearInterval(this.timer)
  },

  // 砸蛋
  openEgg (list, idx, callback) {
    let timer2 = setInterval(() => {
      list[idx].isSelect = !list[idx].isSelect
    }, 500)
    setTimeout(() => {
      clearInterval(timer2)
      callback && callback()
    }, 2000)
  }
}

const ScratchyCard = {
  canvas: null,
  ctx: null,
  width: '',
  height: '',
  color: '',
  size: 0,
  init (id, width, height, color, size) {
    this.canvas = document.getElementById(id)
    this.canvas.width = this.width = width
    this.canvas.height = this.height = height
    this.ctx = this.canvas.getContext('2d')
    this.size = size
    this.color = color
    this.drawMask()
  },
  touchEnd (callback) {
    let data = this.ctx.getImageData(0, 0, this.width, this.height).data
    let count = 0
    for (let i = 0; i < data.length; i += 4) {
      if (data[i] && data[i + 1] && data[i + 2] && data[i + 3]) {
        count++
      }
    }
    if (count <= this.width * this.height * 0.7) {
      callback && callback()
    }
  },
  windowToCanvas (e) {
    let x = e.targetTouches[0].clientX
    let y = e.targetTouches[0].clientY
    let box = this.canvas.getBoundingClientRect()
    return {
      x: x - box.left,
      y: y - box.top
    }
  },
  drawMask () {
    this.ctx.save()
    this.ctx.fillStyle = this.color
    this.ctx.beginPath()
    this.ctx.fillRect(0, 0, this.width, this.height)
    this.ctx.restore()
  },
  drawEraser (loc) {
    this.ctx.save()
    this.ctx.beginPath()
    this.ctx.arc(loc.x, loc.y, 15, 0, Math.PI * 2, false)
    this.ctx.clip()
    this.ctx.clearRect(0, 0, this.width, this.height)
    this.ctx.restore()
  }
}

const Squareup = {
  rollStart: null,
  index: 1,
  speed: 54,
  time: 400,
  round: 1,
  prize: 2,
  list: [],
  callback: null,
  // 初始化
  init (obj, callback) {
    obj.forEach((item) => {
      item.isShow = false
    })
    this.list = obj
    this.callback = callback || this.callback
    this.index = 0
    this.speed = 54
    this.time = 400
    this.round = 1
    this.prize = 1
  },
  // 开始抽奖
  run () {
    this.list.forEach((item) => {
      item.isShow = false
    })
    this.rollStart = setTimeout(this.run.bind(this), this.time)
    if (this.index >= 8) {
      this.index = 0
      this.round++
    }
    if (this.round <= 2) {
      this.speed -= 4
      this.time -= this.speed
    } else {
      this.speed += 4
      this.time += this.speed
    }
    if (this.index === this.prize && this.round === 5) {
      clearTimeout(this.rollStart)
      this.callback && this.callback()
    }
    this.list[this.index].isShow = true
    this.index++
  }
}

const Boson = {
  timer: null,
  index: 0,
  gap: 0,
  round: 0,
  init () {
    this.timer = null
    this.index = 0
    this.round = 0
  },
  // 开始抽奖
  run (style, callback) {
    this.gap = Number(style.width.split('rem')[0])
    this.timer = setInterval(() => {
      this.index++
      style.backgroundPositionY = '-' + this.index * this.gap + 'rem'
      if (this.index === 4) {
        this.index = 0
        this.round++
      }
      if (this.round === 3) {
        clearInterval(this.timer)
        callback && callback()
      }
    }, 100)
  }
}

export { Turntable, Flop, GoldenEgg, ScratchyCard, Squareup, Boson }
