/**
author:SunZhibin
time:2018.07.11
description:请求api接口
 **/
import Ajax from '$aweso/utils/fetch'
import Jssha from 'jssha'
import {uacp} from '$aweso/utils/utils'
function getToken (callback) {
  Ajax({
    type: 'POST',
    url: '/api/token',
    async: true,
    data: {},
    success: function (data) {
      let hmac
      let _data = {}
      let shaObj = new Jssha('SHA-1', 'TEXT')
      _data.token = data.token
      _data.sig = data.sig
      _data.prnd = 'test'
      shaObj.setHMACKey(uacp('}ichidÇÅl'), 'TEXT')
      shaObj.update(_data.token)
      shaObj.update(_data.sig)
      shaObj.update(_data.prnd)
      hmac = shaObj.getHMAC('HEX')
      _data.e = hmac
      getReward(_data, callback)
    },
    fail: function (err) {
      console.log(err)
    }
  })
}
function getReward (requestData, callback) {
  Ajax({
    type: 'POST',
    url: '/pixel/imp/new',
    async: true,
    data: requestData,
    success: function (data, textStatus, xhr) {
      window.name = 'm_adid=' + data.adid + '&m_appid=' + data.appid + '&m_slotid=' + data.slotid + '&payload=' + data.payload
      callback && callback(data, textStatus, xhr)
    },
    fail: function (xhr, type) {
      console.log(xhr)
    }
  })
}
function postLpImp (callback) {
  Ajax({
    type: 'GET',
    url: '/ma/imp',
    async: true,
    data: {},
    success: function (res) {
      callback && callback(res)
    },
    fail: function (err) {
      console.log(err)
    }
  })
}
function postLpClk (e, event, callback) {
  let clkData = {
    ts: new Date().getTime(),
    event: event,
    touchx: e.pageX,
    touchy: e.pageY
  }
  Ajax({
    type: 'GET',
    url: '/lp/report/clk',
    data: clkData,
    async: true,
    success: function (res) {
      callback && callback(res)
    },
    fail: function (xhr, type) {
      callback && callback()
    }
  })
}
function postAdImp (adid) {
  let clkData = {
    ts: new Date().getTime(),
    adid: adid
  }
  Ajax({
    type: 'GET',
    url: '/mejoy/lottery/imp',
    async: true,
    data: clkData,
    success: function (res) {

    },
    fail: function (xhr, type) {

    }
  })
}
function postAdClk (curl, callback) {
  Ajax({
    type: 'other',
    url: curl + '&pix=1',
    data: {},
    async: true,
    success: function (res) {
      callback && callback(res)
    },
    fail: function (xhr, type) {
      callback && callback()
    }
  })
}
function getTimes (callback) {
  Ajax({
    url: '/lp/ctl',
    type: 'post',
    async: true,
    data: {},
    success: function (res) {
      callback && callback(res)
    },
    fail: function (err) {
      console.log(err)
    }
  })
}

function getJson (callback) {
  Ajax({
    url: '/lp/show_config',
    type: 'GET',
    async: true,
    data: {},
    success: function (res) {
      callback && callback(res)
    },
    fail: function (err) {
      console.log(err)
    }
  })
}
function getLpList (count, callback) {
  Ajax({
    url: '/lp/list',
    type: 'post',
    async: true,
    data: {
      count
    },
    success: function (data) {
      callback && callback(data)
    },
    fail: function (xhr) {
      console.log(xhr)
    }
  })
}

export {getTimes, postLpImp, getToken, postAdImp, postAdClk, postLpClk, getJson, getLpList}
