import {formatDataUrl, getURLParameter, getCookie, randomString, getHost} from '$aweso/utils/utils'
let host = getHost()
let requestData = {
  app_key: getURLParameter('app_key'),
  slot_id: getURLParameter('slot_id'),
  ifa: getCookie('ifa') ? getCookie('ifa') : getURLParameter('ifa') ? getURLParameter('ifa') : randomString(10),
  tid: getURLParameter('tid') ? getURLParameter('tid') : '',
  stype: getURLParameter('stype') ? getURLParameter('stype') : '1'
}
function ajax (options) {
  /**
   * 传入方式默认为对象
   **/
  options = options || {}
  /**
   * 默认为GET请求
   **/
  options.type = (options.type || 'GET').toUpperCase()

  /**
   * 默认data
   **/
  options.data = options.data || {}

  /**
   * 默认为异步请求
   **/
  options.async = options.async === undefined ? true : options.async
  /**
   * 对需要传入的参数的处理
   **/
  let requestParams = Object.keys(options.data).length === 0 ? '?' + formatDataUrl(requestData) : '?' + formatDataUrl(requestData) + '&' + formatDataUrl(options.data)
  let xhr

  /**
   * 创建一个 ajax请求
   * W3C标准和IE标准
   */
  if (window.XMLHttpRequest) {
    /**
    * W3C标准
    **/
    xhr = new XMLHttpRequest()
  } else {
    /**
    * IE标准
    **/
    xhr = new ActiveXObject('Microsoft.XMLHTTP')
  }
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      let status = xhr.status
      if (status >= 200 && status < 300) {
        if (xhr.responseText && JSON.parse(xhr.responseText)) {
          options.success && options.success(JSON.parse(xhr.responseText), xhr.responseXML)
        } else {
          options.success && options.success(xhr.responseText, xhr.responseXML)
        }
      } else {
        options.fail && options.fail(status)
      }
    }
  }
  if (options.type === 'GET') {
    xhr.open('GET', host + options.url + requestParams, options.async)
    xhr.send(null)
  } else if (options.type === 'POST') {
    /**
       *打开请求  特殊处理，把参数拼接到url
       * */
    xhr.open('POST', host + options.url + requestParams, options.async)
    /**
       * POST请求设置请求头
       * */
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    /**
       * 发送请求参数
       */
    xhr.send()
  } else if (options.type === 'OTHER') {
    xhr.open('GET', options.url, options.async)
    xhr.send(null)
  }
}

export default ajax
