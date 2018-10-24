// 获取url参数
function getURLParameter (name) {
  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null
};

// 随机生成ifa
function randomString (length) {
  var time = new Date().getTime()
  var str = ''
  var strtime = ''
  var res = ''
  for (; str.length < length; str += Math.random().toString(36).substr(2));
  strtime = time + str.substr(0, length)
  res = strtime.split('').sort(function () { return Math.random() - 0.5 }).join('')
  setCookie('ifa', res, 1)
  return res
};

// 设置cookie
function setCookie (name, value, expiredays) {
  var exdate = new Date()
  exdate.setDate(exdate.getDate() + expiredays)
  document.cookie = name + '=' + escape(value) + ';path=/' + ((expiredays == null) ? '' : ';expires=' + exdate.toGMTString())
};

// 获取cookie
function getCookie (name) {
  if (document.cookie.length > 0) {
    var start = document.cookie.indexOf(name + '=')
    if (start !== -1) {
      start = start + name.length + 1
      var end = document.cookie.indexOf(';', start)
      if (end === -1) end = document.cookie.length
      return unescape(document.cookie.substring(start, end))
    }
  };
  return ''
};

// 转码
function uacp (a) {
  var b, c
  for (a = unescape(a), b = String.fromCharCode(a.charCodeAt(0) - a.length), c = 1; c < a.length; c++) b += String.fromCharCode(a.charCodeAt(c) - b.charCodeAt(c - 1))
  return b
};

// 获取当前域名
function getHost () {
  var localHost = window.location.host
  var host = ''
  if (localHost.indexOf('localhost') > -1 || localHost.indexOf('172.16.5.64') > -1) {
    host = '//api.91doujin.com'
  } else {
    host = '//api.' + localHost.split('.')[1] + '.com'
  }
  return host
};

// 把对象转换成url参数
function formatDataUrl (data) {
  if (!(data instanceof Object && typeof data.length !== 'number')) {
    return ''
  }
  return Object.keys(data)
    .map(key => `${key}=${encodeURIComponent(data[key])}`)
    .join('&')
}

// 把url参数转成对象
function formatUrlData (data) {
  var _data = {}
  for (let key in data) {
    _data[key] = decodeURIComponent(data[key])
  }
  return _data
}

// 后退返回活动页面
function pushHistory (tid) {
  if (onJudgeWeixin()) {
    return false
  } else {
    let state = {
      title: 'title',
      url: '#'
    }
    window.history.pushState(state, 'title', '#')
    window.addEventListener('popstate', function (e) {
      if (!sessionStorage.getItem('isBack')) {
        sessionStorage && sessionStorage.setItem('isBack', 'true')
        let _tid = getURLParameter('tid')
        let _data = window.location.search.replace(_tid, tid)
        window.location.href = '/home/index.html' + _data
      }
    }, false)
  }
}

// 判断是否在微信浏览器内
function onJudgeWeixin () {
  var ua = navigator.userAgent.toLowerCase()
  return ua.match(/MicroMessenger/i) === 'micromessenger'
}

export {getURLParameter, randomString, setCookie, getCookie, uacp, getHost, formatDataUrl, formatUrlData, pushHistory, onJudgeWeixin}
