import { REQUEST_TOPIC_DETAIL, RECEIVE_TOPIC_DETAIL, SHOW_REPLY_DRAWER, HIDE_REPLY_DRAWER } from '../actions'

const initState = {
  detail: null,
  status: 'beforeload', // beforeload loading success error
  errMsg: '',
  reply: null,
  showReplyDrawer: false
}

export default (state = initState, action) => {
  switch(action.type) {
    case REQUEST_TOPIC_DETAIL:
      return {
        ...state,
        status: 'loading'
      }
    case RECEIVE_TOPIC_DETAIL:
      return {
        ...state,
        detail: action.data,
        status: action.success ? 'success' : 'error',
        errMsg: action.error_msg || ''
      }
    case SHOW_REPLY_DRAWER:
    case HIDE_REPLY_DRAWER:
      return {
        ...state,
        showReplyDrawer: action.type === SHOW_REPLY_DRAWER,
        reply: action.type === SHOW_REPLY_DRAWER ? action.reply : null
      }
    default:
      return state
  }
}
