import { ActionType } from '../actions'
import { Reducer } from 'redux'
import { createReducer } from './utils'
const initState = {
  detail: null,
  status: 'beforeload', // beforeload loading success error
  errMsg: '',
  reply: null,
  showReplyDrawer: false
}

export type ITopicType = Readonly<typeof initState>

export const reducer: Reducer = createReducer<ITopicType>(initState, {
  [ActionType.REQUEST_TOPIC_DETAIL] (state: ITopicType) {
    return {
      ...state,
      status: 'loading'
    }
  },
  [ActionType.RECEIVE_TOPIC_DETAIL] (state: ITopicType, payload) {
    return {
      ...state,
      detail: payload.data,
      status: payload.success ? 'success' : 'error',
      errMsg: payload.error_msg || ''
    }
  },
  [ActionType.SHOW_REPLY_DRAWER]: (state: ITopicType, payload: any) => {
    return {
      ...state,
      showReplyDrawer: true,
      reply: payload.reply
    }
  },
  [ActionType.HIDE_REPLY_DRAWER]: (state: ITopicType ) => {
    return {
      ...state,
      showReplyDrawer: false,
      reply: null
    }
  }
})
