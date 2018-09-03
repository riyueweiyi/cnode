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
export const SHOW_LOGIN_MODAL = 'show_login_modal'
export const HIDE_LOGIN_MODAL = 'hide_login_modal'
export const REQUEST_TOPICS = 'request_topics'
export const RECEIVE_TOPICS = 'receive_topics'
export const FAIL_TOPICS = 'fail_topics'
export const CHANGE_TAB = 'change_tab'
export const RECORD_TOPIC_POS = 'record_topic_pos'
export const REQUEST_NEXT_PAGE_TOPIC_LIST = 'request_next_page_topic_list'

// 请求主题
export function requestTopics() {
  return {
    type: REQUEST_TOPICS
  }
}

// 成功响应主题
export function receiveTopics(topics, page) {
  return {
    type: RECEIVE_TOPICS,
    topics,
    page
  }
}

// 响应主题失败
export function failTopics(errMsg) {
  return {
    type: FAIL_TOPICS,
    errMsg
  }
}

// 记录用户浏览主题位置
export function recordTopicPos(tab, scrollY, page, pageSize) {
  return {
    type: RECORD_TOPIC_POS,
    scrollY,
    tab,
    page,
    pageSize
  }
}

// 获取下一页主题
export function requestNextPageTopic() {
  return {
    type: REQUEST_NEXT_PAGE_TOPIC_LIST
  }
}

// 切换浏览主题tab
export function changeTab(tab) {
  return {
    type: CHANGE_TAB,
    tab
  }
}

// 显示登录弹窗
export function showLoginModal() {
  return {
    type: SHOW_LOGIN_MODAL
  }
}

// 隐藏登录弹窗
export function hideLoginModal() {
  return {
    type: HIDE_LOGIN_MODAL
  }
}

// 登陆成功
export function receiveAccesstoken(accesstoken, loginName) {
  return {
    type: RECEIVE_ACCESSSTOKEN,
    accesstoken,
    loginName
  }
}

// 登陆失败
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

// 隐藏信息
export function hideSnackBar() {
  return {
    type: HIDE_SNACK_BAR
  }
}

// 请求消息
export function requestMessage() {
  return {
    type: REQUEST_MESSAGE
  }
}

// 请求主题详情
export function requestTopicDetail() {
  return {
    type: REQUEST_TOPIC_DETAIL
  }
}

// 获取主题详情
export function receiveTopicDetail(res) {
  return {
    type: RECEIVE_TOPIC_DETAIL,
    ...res
  }
}

// 响应消息
export function receiveMessage(hasReadMessage, hasnotReadMessage) {
  return {
    type: RECEIVE_MESSAGE,
    hasnotReadMessage,
    hasReadMessage
  }
}

// 响应消息失败
export function failMessage(errMsg) {
  return {
    type: FAIL_MESSAGE,
    errMsg
  }
}

// 请求用户信息
export function requestUserinfo() {
  return {
    type: REQUEST_USERINFO
  }
}

// 响应用户信息
export function receiveUserinfo(res) {
  return {
    type: RECEIVE_USERINFO,
    ...res
  }
}

// 显示评论drawer
export function showReplyDrawer(reply) {
  return {
    type: SHOW_REPLY_DRAWER,
    reply
  }
}

// 隐藏评论drawer
export function hideReplyDrawer() {
  return {
    type: HIDE_REPLY_DRAWER
  }
}

// 登陆
export function login(body) {
  return (dispatch) => {
    return Pixel.post('/accesstoken', body).then(res => {
      dispatch(receiveAccesstoken(body.accesstoken, res.loginname))
      dispatch(showSnackBar('登录成功', 'success'))
      return res
    }).catch(err => {
      dispatch(errorAccesstoken())
      dispatch(showSnackBar(err.error_msg, 'error'))
    })
  }
}

// 加载主题
export function getTopicList(tab, page, limit) {
  return (dispatch) => {
    dispatch(requestTopics())
    return Pixel.get('/topics', { tab, page, limit }).then(res => {
      dispatch(receiveTopics(res.data, page))
      return res
    }).catch(_ => {
      dispatch(showSnackBar(_.error_msg, 'error'))
      dispatch(failTopics(_.error_msg, page))
    })
  }
}

// 初始化页面数据
export function initPageData() {
  return (dispatch, getState) => {
    const { topics: {tab, page, pageSize } } = getState()
    return dispatch(getTopicList(tab, 1, page * pageSize)) // 加载所有数据
  }
}

// 切换主题tab
export function chagnTabHandle(tabValue) {
  return (dispatch, getState ) => {
    dispatch(changeTab(tabValue))
    const { topics: {tab, page, pageSize } } = getState()
    return dispatch(getTopicList(tab, page, pageSize)) // 返回promise
  }
}

// 获取下一页主题
export function requestNextPageTopicList() {
  return (dispatch, getState) => {
    dispatch(requestNextPageTopic())
    const { topics: { tab, page, pageSize }} = getState()
    return dispatch(getTopicList(tab, page, pageSize))
  }
}

// 发布主题
export function publish(body) {
  return (dispatch, getState) => {
    const { userInfo: { accesstoken } } = getState()
    return Pixel.post('/topics', {
      ...body,
      accesstoken
    }).then(res => {
      dispatch(showSnackBar('发布成功', 'success'))
      return res
    }).catch(err => {
      dispatch(showSnackBar(err.error_msg, 'error'))
    })
  }
}

// 获取消息
export function getMessage(showLoading) {
  return (dispatch, getState) => {
    const { userInfo: { accesstoken } } = getState()
    showLoading && dispatch(requestMessage())
    return Pixel.get('/messages', { accesstoken }).then((res) => {
      const { has_read_messages, hasnot_read_messages } = res.data
      dispatch(receiveMessage(has_read_messages, hasnot_read_messages))
      return res
    }).catch(res => {
      dispatch(failMessage(res.error_msg))
      dispatch(showSnackBar(res.error_msg, 'error'))
    })
  }
}

// 获取用户信息
export function getUserinfo(loginname) {
  return (dispatch) => {
    dispatch(requestUserinfo())
    return Pixel.get(`/user/${loginname}`, null).then((res) => {
      dispatch(receiveUserinfo(res))
      return res
    }).catch((res) => {
      dispatch(receiveUserinfo(res))
      dispatch(showSnackBar(res.error_msg, 'error'))
    })
  }
}

// 获取主题详情
export function getTopicDetail(id, showLoading) {
  return (dispatch, getState) => {
    const { userInfo: { accesstoken } } = getState()
    showLoading && dispatch(requestTopicDetail())
    return Pixel.get(`/topic/${id}`, { accesstoken }).then((res) => {
      dispatch(receiveTopicDetail(res))
      return res
    }).catch((res) => {
      dispatch(receiveTopicDetail(res))
      dispatch(showSnackBar(res.error_msg, 'error'))
    })
  }
}
