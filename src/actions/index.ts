import { Action, Dispatch } from 'redux'
import Pixel from '../utils'
import {
  ILoginName,
  AllTabKey,
  LoadTopicsParams,
  PublicTopic,
  ILoginForm
} from '../type'
import { State } from '../reducers'
export enum ActionType {
  RECEIVE_ACCESSSTOKEN,
  ERROR_ACCESSTOKEN,
  SHOW_SNACK_BAR,
  HIDE_SNACK_BAR,
  REQUEST_MESSAGE,
  RECEIVE_MESSAGE,
  FAIL_MESSAGE,
  REQUEST_USERINFO,
  RECEIVE_USERINFO,
  REQUEST_TOPIC_DETAIL,
  RECEIVE_TOPIC_DETAIL,
  SHOW_REPLY_DRAWER,
  HIDE_REPLY_DRAWER,
  SHOW_LOGIN_MODAL,
  HIDE_LOGIN_MODAL,
  REQUEST_TOPICS,
  RECEIVE_TOPICS,
  FAIL_TOPICS,
  CHANGE_TAB,
  RECORD_TOPIC_POS,
  REQUEST_NEXT_PAGE_TOPIC_LIST
}
export interface IAppAction extends Action<ActionType> {
  payload?: any
}

/**
 * 
 * @param type action type
 * @param argNames params 
 */
function makeActionCreator(type: ActionType, ...argNames: string[]): (...args: any[]) => IAppAction {
  return function(...args: any[]): IAppAction {
    const action: IAppAction = { 
      type
    }
    if (argNames.length === 0 && args.length === 1) {
      action.payload = args[0]
      return action
    }
    argNames.reduce((action: IAppAction, arg: string, index: number) => {
      action.payload = action.payload || {}
      action.payload[arg] = args[index]
      return action
    }, action)
    return action
  }
}

// 请求主题
export const requestTopics = makeActionCreator(ActionType.REQUEST_TOPICS)

// 成功响应主题
export const receiveTopics = makeActionCreator(ActionType.RECEIVE_TOPICS, 'topics', 'page')

// 响应主题失败
export const failTopics = makeActionCreator(ActionType.FAIL_TOPICS)

// 记录用户浏览主题位置
export const recordTopicPos = makeActionCreator(ActionType.RECORD_TOPIC_POS)

// 获取下一页主题
export const requestNextPageTopic = makeActionCreator(ActionType.REQUEST_NEXT_PAGE_TOPIC_LIST)

// 切换浏览主题tab
export const changeTab = makeActionCreator(ActionType.CHANGE_TAB, 'tab')

// 显示登录弹窗
export const showLoginModal = makeActionCreator(ActionType.SHOW_LOGIN_MODAL)

// 隐藏登录弹窗
export const hideLoginModal = makeActionCreator(ActionType.HIDE_LOGIN_MODAL)

// 登陆成功
export const receiveAccesstoken = makeActionCreator(ActionType.RECEIVE_ACCESSSTOKEN)

// 登陆失败
export const errorAccesstoken = makeActionCreator(ActionType.ERROR_ACCESSTOKEN)

// 显示信息
export const showSnackBar = makeActionCreator(ActionType.SHOW_SNACK_BAR, 'content', 'variant')

// 隐藏信息
export const hideSnackBar = makeActionCreator(ActionType.HIDE_SNACK_BAR)

// 请求消息
export const requestMessage = makeActionCreator(ActionType.REQUEST_MESSAGE)

// 请求主题详情
export const requestTopicDetail = makeActionCreator(ActionType.REQUEST_TOPIC_DETAIL)

// 获取主题详情
export const receiveTopicDetail = makeActionCreator(ActionType.RECEIVE_TOPIC_DETAIL)
// 响应消息
export const receiveMessage = makeActionCreator(ActionType.RECEIVE_MESSAGE)

// 响应消息失败
export const failMessage = makeActionCreator(ActionType.FAIL_MESSAGE, 'errMsg')
// 请求用户信息
export const requestUserinfo = makeActionCreator(ActionType.REQUEST_USERINFO)

// 响应用户信息
export const receiveUserinfo = makeActionCreator(ActionType.RECEIVE_USERINFO)

// 显示评论drawer
export const showReplyDrawer = makeActionCreator(ActionType.SHOW_REPLY_DRAWER, 'reply')

// 隐藏评论drawer
export const hideReplyDrawer = makeActionCreator(ActionType.HIDE_REPLY_DRAWER)

// 登陆
export function login(body: ILoginForm) {
  return async (dispatch: Dispatch<IAppAction>) => {
    try {
      const res = await Pixel.post('/accesstoken', body)
      dispatch(receiveAccesstoken({
        accesstoken: body.accesstoken, 
        loginname: res.loginname
      }))
      dispatch(showSnackBar('登录成功', 'success'))
      return res
    }
    catch (err) {
      dispatch(errorAccesstoken())
      dispatch(showSnackBar(err.error_msg, 'error'))
    }
  }
}

// 加载主题
export function getTopicList(params: LoadTopicsParams) {
  return async (dispatch: Dispatch<IAppAction>) => {
    dispatch(requestTopics())
    try {
      const res = await Pixel.get('/topics', params)
      dispatch(receiveTopics(res.data, params.page))
      return res
    }
    catch (_) {
      dispatch(showSnackBar(_.error_msg, 'error'))
      dispatch(failTopics({
        errMsg: _.error_msg,
        page: params.page
      }))
    }
  }
}

// 初始化页面数据
export function initPageData() {
  return (dispatch: Dispatch<any>, getState: () => State) => {
    const { topics: { tab, page, pageSize } } = getState()
    return dispatch(getTopicList({
      tab: tab as AllTabKey, 
      page: 1,
      limit: page * pageSize
    })) // 加载所有数据
  }
}

// 切换主题tab
export function changeTabHandle(tabValue: AllTabKey) {
  return (dispatch: Dispatch<any>, getState: () => State) => {
    dispatch(changeTab(tabValue))
    const { topics: { tab, page, pageSize: limit } } = getState()
    return dispatch(getTopicList({ tab: tab as AllTabKey, page, limit})) // 返回promise
  }
}

// 获取下一页主题
export function requestNextPageTopicList() {
  return (dispatch: Dispatch<any>, getState: () => State) => {
    dispatch(requestNextPageTopic())
    const { topics: { tab, page, pageSize: limit } } = getState()
    return dispatch(getTopicList({ tab: tab as AllTabKey, page, limit }))
  }
}

// 发布主题
export function publish(body: PublicTopic) {
  return async (dispatch: Dispatch<IAppAction>, getState: () => State) => {
    const { userInfo: { accesstoken } } = getState()
    try {
      const res = await Pixel.post('/topics', {
        ...body,
        accesstoken
      })
      dispatch(showSnackBar('发布成功', 'success'))
      return res
    }
    catch (err) {
      dispatch(showSnackBar(err.error_msg, 'error'))
    }
  }
}

// 获取消息
export function getMessage(showLoading?: boolean) {
  return async (dispatch: Dispatch<IAppAction>, getState: () => State) => {
    const { userInfo: { accesstoken } } = getState()
    showLoading && dispatch(requestMessage())
    try {
      const res = await Pixel.get('/messages', { accesstoken })
      dispatch(receiveMessage({ ...res.data }))
      return res
    }
    catch (res_1) {
      dispatch(failMessage(res_1.error_msg))
      dispatch(showSnackBar(res_1.error_msg, 'error'))
    }
  }
}

// 获取用户信息
export function getUserinfo(loginname: ILoginName | string) {
  return async (dispatch: Dispatch<IAppAction>) => {
    dispatch(requestUserinfo())
    try {
      const res = await Pixel.get(`/user/${loginname}`, null)
      dispatch(receiveUserinfo(res))
      return res
    }
    catch (err) {
      dispatch(receiveUserinfo(err))
      dispatch(showSnackBar(err.error_msg, 'error'))
    }
  }
}

// 获取主题详情
export function getTopicDetail(id: string, showLoading: boolean) {
  return async (dispatch: Dispatch<IAppAction>, getState: () => State) => {
    const { userInfo: { accesstoken } } = getState()
    showLoading && dispatch(requestTopicDetail())
    try {
      const res = await Pixel.get(`/topic/${id}`, { accesstoken })
      dispatch(receiveTopicDetail(res))
      return res
    }
    catch (res_2) {
      dispatch(receiveTopicDetail(res_2))
      dispatch(showSnackBar(res_2.error_msg, 'error'))
    }
  }
}
