import { Action, Dispatch } from 'redux'
import Pixel from '../utils'
import {
  ILoginName,
  TopicPos,
  AllTabKey,
  ILoginInfo,
  LoadTopicsParams,
  PublicTopic
} from '../type'
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

// 请求主题
export function requestTopics(): IAppAction {
  return {
    type: ActionType.REQUEST_TOPICS
  }
}

// 成功响应主题
export function receiveTopics(topics: any, page: number): IAppAction {
  return {
    type: ActionType.RECEIVE_TOPICS,
    payload: {
      topics,
      page
    }
  }
}

// 响应主题失败
export function failTopics(errMsg: string): IAppAction {
  return {
    type: ActionType.FAIL_TOPICS,
    payload: errMsg
  }
}

// 记录用户浏览主题位置
export function recordTopicPos(payload: TopicPos): IAppAction {
  return {
    type: ActionType.RECORD_TOPIC_POS,
    payload
  }
}

// 获取下一页主题
export function requestNextPageTopic(): IAppAction {
  return {
    type: ActionType.REQUEST_NEXT_PAGE_TOPIC_LIST
  }
}

// 切换浏览主题tab
export function changeTab(tab: AllTabKey): IAppAction {
  return {
    type: ActionType.CHANGE_TAB,
    payload: {
      tab
    }
  }
}

// 显示登录弹窗
export function showLoginModal(): IAppAction {
  return {
    type: ActionType.SHOW_LOGIN_MODAL
  }
}

// 隐藏登录弹窗
export function hideLoginModal(): IAppAction {
  return {
    type: ActionType.HIDE_LOGIN_MODAL
  }
}

// 登陆成功
export function receiveAccesstoken(payload: ILoginInfo): IAppAction {
  return {
    type: ActionType.RECEIVE_ACCESSSTOKEN,
    payload
  }
}

// 登陆失败
export function errorAccesstoken(): IAppAction {
  return {
    type: ActionType.ERROR_ACCESSTOKEN
  }
}

// 显示信息
export function showSnackBar(content: string, variant: string): IAppAction {
  return {
    type: ActionType.SHOW_SNACK_BAR,
    payload: {
      content,
      variant
    }
  }
}

// 隐藏信息
export function hideSnackBar(): IAppAction {
  return {
    type: ActionType.HIDE_SNACK_BAR
  }
}

// 请求消息
export function requestMessage(): IAppAction {
  return {
    type: ActionType.REQUEST_MESSAGE
  }
}

// 请求主题详情
export function requestTopicDetail(): IAppAction {
  return {
    type: ActionType.REQUEST_TOPIC_DETAIL
  }
}

// 获取主题详情
export function receiveTopicDetail(res: any): IAppAction {
  return {
    type: ActionType.RECEIVE_TOPIC_DETAIL,
    payload: {
      ...res
    }
  }
}

// 响应消息
export function receiveMessage(payload: any): IAppAction {
  return {
    type: ActionType.RECEIVE_MESSAGE,
    payload
  }
}

// 响应消息失败
export function failMessage(errMsg: string): IAppAction {
  return {
    type: ActionType.FAIL_MESSAGE,
    payload: {
      errMsg
    }
  }
}

// 请求用户信息
export function requestUserinfo(): IAppAction {
  return {
    type: ActionType.REQUEST_USERINFO
  }
}

// 响应用户信息
export function receiveUserinfo(res: any): IAppAction {
  return {
    type: ActionType.RECEIVE_USERINFO,
    payload: {
      ...res
    }
  }
}

// 显示评论drawer
export function showReplyDrawer(reply: any): IAppAction {
  return {
    type: ActionType.SHOW_REPLY_DRAWER,
    payload: {
      reply
    }
  }
}

// 隐藏评论drawer
export function hideReplyDrawer(): IAppAction {
  return {
    type: ActionType.HIDE_REPLY_DRAWER
  }
}

// 登陆
export function login(body: { accesstoken: string }) {
  return async (dispatch: Dispatch<IAppAction>) => {
    try {
      const res = await Pixel.post('/accesstoken', body);
      dispatch(receiveAccesstoken({
        accesstoken: body.accesstoken, 
        loginname: res.loginname
      }));
      dispatch(showSnackBar('登录成功', 'success'));
      return res;
    }
    catch (err) {
      dispatch(errorAccesstoken());
      dispatch(showSnackBar(err.error_msg, 'error'));
    }
  }
}

// 加载主题
export function getTopicList(params: LoadTopicsParams) {
  return async (dispatch: Dispatch<IAppAction>) => {
    dispatch(requestTopics())
    try {
      const res = await Pixel.get('/topics', params);
      dispatch(receiveTopics(res.data, params.page));
      return res;
    }
    catch (_) {
      dispatch(showSnackBar(_.error_msg, 'error'));
      dispatch(failTopics(_.error_msg));
    }
  }
}

// 初始化页面数据
export function initPageData() {
  return (dispatch: Dispatch<any>, getState: Function) => {
    const { topics: { tab, page, pageSize } } = getState()
    return dispatch(getTopicList({
      tab: tab as AllTabKey, 
      page: 1,
      limit: page * pageSize
    })) // 加载所有数据
  }
}

// 切换主题tab
export function chagnTabHandle(tabValue: AllTabKey) {
  return (dispatch: Dispatch<any>, getState: Function) => {
    dispatch(changeTab(tabValue))
    const { topics: { tab, page, pageSize: limit } } = getState()
    return dispatch(getTopicList({ tab: tab as AllTabKey, page, limit})) // 返回promise
  }
}

// 获取下一页主题
export function requestNextPageTopicList() {
  return (dispatch: Dispatch<any>, getState: Function) => {
    dispatch(requestNextPageTopic())
    const { topics: { tab, page, pageSize: limit } } = getState()
    return dispatch(getTopicList({ tab: tab as AllTabKey, page, limit }))
  }
}

// 发布主题
export function publish(body: PublicTopic) {
  return async (dispatch: Dispatch<IAppAction>, getState: Function) => {
    const { userInfo: { accesstoken } } = getState()
    try {
      const res = await Pixel.post('/topics', {
        ...body,
        accesstoken
      });
      dispatch(showSnackBar('发布成功', 'success'));
      return res;
    }
    catch (err) {
      dispatch(showSnackBar(err.error_msg, 'error'));
    }
  }
}

// 获取消息
export function getMessage(showLoading: boolean) {
  return async (dispatch: Dispatch<IAppAction>, getState: Function) => {
    const { userInfo: { accesstoken } } = getState()
    showLoading && dispatch(requestMessage())
    try {
      const res = await Pixel.get('/messages', { accesstoken });
      dispatch(receiveMessage({ ...res.data }));
      return res;
    }
    catch (res_1) {
      dispatch(failMessage(res_1.error_msg));
      dispatch(showSnackBar(res_1.error_msg, 'error'));
    }
  }
}

// 获取用户信息
export function getUserinfo(loginname: ILoginName) {
  return async (dispatch: Dispatch<IAppAction>) => {
    dispatch(requestUserinfo())
    try {
      const res = await Pixel.get(`/user/${loginname}`, null);
      dispatch(receiveUserinfo(res));
      return res;
    }
    catch (err) {
      dispatch(receiveUserinfo(err));
      dispatch(showSnackBar(err.error_msg, 'error'));
    }
  }
}

// 获取主题详情
export function getTopicDetail(id: string, showLoading: boolean) {
  return async (dispatch: Dispatch<IAppAction>, getState: Function) => {
    const { userInfo: { accesstoken } } = getState()
    showLoading && dispatch(requestTopicDetail())
    try {
      const res = await Pixel.get(`/topic/${id}`, { accesstoken });
      dispatch(receiveTopicDetail(res));
      return res;
    }
    catch (res_2) {
      dispatch(receiveTopicDetail(res_2));
      dispatch(showSnackBar(res_2.error_msg, 'error'));
    }
  }
}
