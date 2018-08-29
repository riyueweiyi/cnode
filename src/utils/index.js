const PixelUI = {}

PixelUI.ajax = function (config) {
  return new Promise((resolve, reject) => {
    const BASE_URL = 'https://cnodejs.org/api/v1'
    let defaultConfig = {
      url: '',  // 请求url
      type: 'GET',  // 请求方式
      data: {}, // 请求数据
      dataType: 'json',
      timeout: 5000,  // 超时时间
    }
    defaultConfig = Object.assign(defaultConfig, config)

    let params = []
    for (let attr in defaultConfig.data) {
      params.push(`${attr}=${defaultConfig.data[attr]}`)
    }
    params = params.join('&')

    defaultConfig.type = defaultConfig.type.toUpperCase()
    defaultConfig.url = BASE_URL + defaultConfig.url

    let xhr = new XMLHttpRequest()
    xhr.timeout = defaultConfig.timeout
    // 超时设定
    xhr.ontimeout = function () {
      alert('请求超时，请重新！')
      xhr.abort()
    }
    xhr.onprogress = function (e) {
      if (e.lengthComputable) {
        console.log(e.loaded + '/' + e.total)
      }
    }
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        var head = xhr.getAllResponseHeaders()
        var response = xhr.responseText
        if (/application\/json/.test(head) || (defaultConfig.dataType === 'json' && /^(\{|\[)([\s\S])*?(\]|\})$/.test(response))) {
          response = JSON.parse(response)
        }
        if (xhr.status === 200) {
          resolve(response)
        } else {
          reject(response)
        }
      }
    }
    if (defaultConfig.type === 'GET') {
      xhr.open(defaultConfig.type, defaultConfig.url + '?' + params, true)
      xhr.send()
    } else {
      xhr.open(defaultConfig.type, defaultConfig.url, true)
      xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded')
      xhr.send(params)
    }
  })
}

PixelUI.post = (url, data) => PixelUI.ajax({
  url,
  type: 'POST',
  data,
})

PixelUI.get = (url, data) => PixelUI.ajax({
  url,
  data
})

PixelUI.utils = {
  timeDifference(current = new Date(), previous) {
    var msPerMinute = 60 * 1000
    var msPerHour = msPerMinute * 60
    var msPerDay = msPerHour * 24
    var msPerMonth = msPerDay * 30
    var msPerYear = msPerDay * 365
    var elapsed = current - previous

    if (elapsed < msPerMinute) {
      return Math.round(elapsed / 1000) + ' 秒前'
    } else if (elapsed < msPerHour) {
      return Math.round(elapsed / msPerMinute) + ' 分钟前'
    } else if (elapsed < msPerDay) {
      return Math.round(elapsed / msPerHour) + ' 小时前'
    } else if (elapsed < msPerMonth) {
      return Math.round(elapsed / msPerDay) + ' 天前'
    } else if (elapsed < msPerYear) {
      return Math.round(elapsed / msPerMonth) + ' 个月前'
    } else {
      return Math.round(elapsed / msPerYear) + ' 年前'
    }
  }
}

export default PixelUI