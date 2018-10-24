function getToken (callback) {
  getReward({}, callback)
}

const empty = () => {
}

function getReward (requestData, cb = empty) {
  window.name = 'm_adid=100010&m_appid=2&m_slotid=2&payload=0011'
  const data = {
    adid: 100010,
    title: '中信星座定制卡',
    curl: '//api.91doujin.com/ca/clk?adid=100010&app_key=test2&slot_id=2&tid=0013',
    ad_curl: 'https://creditcard.ecitic.com/h5/shenqing/yan_x/xz.html?foot_s=0&head_s=0&foot_s=0&head_s=0&sid=SJR360CJW2',
    iurl: '//mejoy-static.91doujin.com/uploads/1524642633.gif',
    type: 1,
    appid: 2,
    slotid: 2,
    button_title: '点我领取',
    expire_at: '2019-1-3',
    payload: '0013',
    atopv: true,
    miniprogram_appid: '',
    miniprogram_page: '',
    err_code: 0,
    err_msg: ''
  }
  setTimeout(() => cb(data, requestData), 200)
}

function postLpImp (callback = empty) {
  setTimeout(() => callback({}), 200)
}

function postLpClk (e, event, callback = empty) {
  setTimeout(() => callback({ err_code: 0, err_msg: '' }), 200)
}

function postAdImp (adid, callback = empty) {
  setTimeout(() => callback({ err_code: 0, err_msg: '' }), 200)
}

function postAdClk (curl, callback = empty) {
  setTimeout(() => callback({ err_code: 0, err_msg: '' }), 200)
}

function getTimes (callback = empty) {
  setTimeout(() => callback({ times: 8 }), 200)
}

function getJson (callback = empty) {
  setTimeout(() => callback([]), 200)
}

function getLpList (count, callback = empty) {
  setTimeout(
    () =>
      callback([
        {
          iurl: '//mejoy-static.91doujin.com/lp/golden_egg_ch/banner.png',
          curl:
            '//mejoy-static.91doujin.com/activity_t/index.html?app_key=test2&ifa=6h627491b3161567xu33m0u&slot_id=2&tid=6135'
        },
        {
          iurl: '//mejoy-static.91doujin.com/lp/claw_crane_ch/index.png',
          curl:
            '//mejoy-static.91doujin.com/activity_t/index.html?app_key=test2&ifa=6h627491b3161567xu33m0u&slot_id=2&tid=7611'
        }
      ]),
    200
  )
}

export {
  getTimes,
  postLpImp,
  getToken,
  postAdImp,
  postAdClk,
  postLpClk,
  getJson,
  getLpList
}
