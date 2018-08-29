import Pixel from '../utils'
export const RECEIVE_ACCESSSTOKEN = 'receive_accesstoken'
export const ERROR_ACCESSTOKEN = 'error_accesstoken'
export const SHOW_SNACK_BAR = 'show_snack_bar'
export const HIDE_SNACK_BAR = 'hide_snack_bar'
export const REQUEST_MESSAGE = 'request_message'
export const RECEIVE_MESSAGE = 'receive_message'
export const FAIL_MESSAGE = 'fail_message'
export const REQUEST_USERINFO = 'request_userinfo'
export const RECEIVE_USERINFO = 'receive_userinfo'
export const REQUEST_TOPIC_DETAIL = 'request_topic_detail'
export const RECEIVE_TOPIC_DETAIL = 'receive_topic_detail'
export const SHOW_REPLY_DRAWER = 'show_reply_drawer'
export const HIDE_REPLY_DRAWER = 'hide_reply_drawer'

// 登陆成功
export function receiveAccesstoken(accesstoken, loginName) {
  return {
    type: RECEIVE_ACCESSSTOKEN,
    accesstoken,
    loginName
  }
}

export function errorAccesstoken() {
  return {
    type: ERROR_ACCESSTOKEN
  }
}

// 显示信息
export function showSnackBar(content, variant) {
  return {
    type: SHOW_SNACK_BAR,
    content,
    variant
  }
}

export function hideSnackBar() {
  return {
    type: HIDE_SNACK_BAR
  }
}

export function requestMessage() {
  return {
    type: REQUEST_MESSAGE
  }
}

export function requestTopicDetail() {
  return {
    type: REQUEST_TOPIC_DETAIL
  }
}

export function receiveTopicDetail(res) {
  return {
    type: RECEIVE_TOPIC_DETAIL,
    ...res
  }
}

export function receiveMessage(hasReadMessage, hasnotReadMessage) {
  return {
    type: RECEIVE_MESSAGE,
    hasnotReadMessage,
    hasReadMessage
  }
}

export function failMessage(errMsg) {
  return {
    type: FAIL_MESSAGE,
    errMsg
  }
}

export function requestUserinfo() {
  return {
    type: REQUEST_USERINFO
  }
}

export function receiveUserinfo(res) {
  return {
    type: RECEIVE_USERINFO,
    ...res
  }
}

export function showReplyDrawer(reply) {
  return {
    type: SHOW_REPLY_DRAWER,
    reply
  }
}

export function hideReplyDrawer() {
  return {
    type: HIDE_REPLY_DRAWER
  }
}

// 登陆
export function login(body, callback) {
  return (dispatch) => {
    Pixel.post('/accesstoken', body, function (res) {
      dispatch(receiveAccesstoken(body.accesstoken, res.loginname))
      dispatch(showSnackBar('登录成功', 'success'))
      callback && callback()
    }, function (err) {
      dispatch(errorAccesstoken())
      dispatch(showSnackBar(err.error_msg, 'error'))
    })
  }
}
// 发布主题
export function publish(body, callback) {
  return (dispatch) => {
    Pixel.post('/topics', body, function (res) {
      dispatch(showSnackBar('发布成功', 'success'))
      callback && callback(res)
    }, function (err) {
      dispatch(showSnackBar(err.error_msg, 'error'))
    })
  }
}

// 获取消息
export function getMessage(params, needShowLoading) {
  return (dispatch) => {
    needShowLoading && dispatch(requestMessage())
    Pixel.get('/messages', params, function (res) {
      dispatch(receiveMessage(res.data.has_read_messages, res.data.hasnot_read_messages))
    }, function (res) {
      dispatch(failMessage(res.error_msg))
      dispatch(showSnackBar(res.error_msg, 'error'))
    })
  }
}

export function getUserinfo(loginname) {
  return (dispatch) => {
    dispatch(requestUserinfo())
    Pixel.get(`/user/${loginname}`, null, (res) => {
      dispatch(receiveUserinfo(res))
    }, (res) => {
      dispatch(receiveUserinfo(res))
      dispatch(showSnackBar(res.error_msg, 'error'))
    })
  }
}

export function getTopicDetail(id, params, needShowLoading) {
  return (dispatch) => {
    needShowLoading && dispatch(requestTopicDetail())
    Pixel.get(`/topic/${id}`, params || null, (res) => {
      dispatch(receiveTopicDetail(res))
    }, (res) => {
      dispatch(receiveTopicDetail(res))
      dispatch(showSnackBar(res.error_msg, 'error'))
    })
  }
}