import { REQUEST_USERINFO, RECEIVE_USERINFO } from '../actions'

const initState = {
  status: 'beforeunload', // beforeunload loading success error
  user: null,
  errMsg: ''
}

export default (state = initState, action) => {
  switch(action.type) {
    case REQUEST_USERINFO:
      return {
        ...state,
        status: 'loading'
      }
    case RECEIVE_USERINFO:
      return {
        ...state,
        user: action.data,
        status: action.success ? 'success' : 'error',
        errMsg: !action.success && action.error_msg
      }
    default:
      return state
  }
}
