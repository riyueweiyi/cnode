import { REQUEST_MESSAGE, FAIL_MESSAGE, RECEIVE_MESSAGE } from '../actions'

const initState = {
  isLoading: false,
  hasError: false,
  errMsg: '',
  hasReadMessages: [],
  hasnotReadMessages: []
}

export default function (state = initState, action) {
  switch (action.type) {
    case REQUEST_MESSAGE:
      return {
        ...state,
        isLoading: true
      }
    case RECEIVE_MESSAGE:
      return {
        ...state,
        isLoading: false,
        hasError: false,
        errMsg: '',
        hasnotReadMessages: action.hasnotReadMessage,
        hasReadMessages: action.hasReadMessage
      }
    case FAIL_MESSAGE:
      return {
        ...state,
        isLoading: false,
        hasError: true,
        errMsg: action.errMsg
      }
    default:
      return state
  }
}
