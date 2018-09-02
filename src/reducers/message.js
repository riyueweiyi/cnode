import { REQUEST_MESSAGE, FAIL_MESSAGE, RECEIVE_MESSAGE } from '../actions'

const initState = {
  status: 'beforeload', // 请求状态 beforeload loading success error
  errMsg: '',
  hasReadMessages: [],
  hasnotReadMessages: []
}

export default function (state = initState, action) {
  switch (action.type) {
    case REQUEST_MESSAGE:
      return {
        ...state,
        status: 'loading'
      }
    case RECEIVE_MESSAGE:
      return {
        ...state,
        status: 'success',
        errMsg: '',
        hasnotReadMessages: action.hasnotReadMessage,
        hasReadMessages: action.hasReadMessage
      }
    case FAIL_MESSAGE:
      return {
        ...state,
        status: 'error',
        errMsg: action.errMsg
      }
    default:
      return state
  }
}
