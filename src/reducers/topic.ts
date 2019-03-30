import { ActionType, IAppAction } from '../actions'
import { Reducer } from 'redux'

const initState = {
  detail: null,
  status: 'beforeload', // beforeload loading success error
  errMsg: '',
  reply: null,
  showReplyDrawer: false
}

export type ITopicType = Readonly<typeof initState>

export const reducer: Reducer =  (state: ITopicType = initState, {type, payload}: IAppAction) => {
  switch(type) {
    case ActionType.REQUEST_TOPIC_DETAIL:
      return {
        ...state,
        status: 'loading'
      }
    case ActionType.RECEIVE_TOPIC_DETAIL:
      return {
        ...state,
        detail: payload.data,
        status: payload.success ? 'success' : 'error',
        errMsg: payload.error_msg || ''
      }
    case ActionType.SHOW_REPLY_DRAWER:
    case ActionType.HIDE_REPLY_DRAWER:
      return {
        ...state,
        showReplyDrawer: payload.type === ActionType.SHOW_REPLY_DRAWER,
        reply: payload.type === ActionType.SHOW_REPLY_DRAWER ? payload.reply : null
      }
    default:
      return state
  }
}
