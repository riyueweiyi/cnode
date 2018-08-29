import { REQUEST_USERINFO, RECEIVE_USERINFO } from '../actions'

const initState = {
  isLoading: false,
  user: null,
  hasError: false,
  errorMsg: ''
}

export default (state = initState, action) => {
  switch(action.type) {
    case REQUEST_USERINFO:
      return {
        ...state,
        isLoading: true
      }
    case RECEIVE_USERINFO:
      return {
        ...state,
        isLoading: false,
        user: action.data,
        hasError: !action.success,
        errorMsg: action.error_msg || ''
      }
    default:
      return state
  }
}
