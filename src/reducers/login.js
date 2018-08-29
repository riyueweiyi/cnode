
import { RECEIVE_ACCESSSTOKEN, ERROR_ACCESSTOKEN } from '../actions'

const initialState = {
  hasError: false,
  accesstoken: void 0,
  loginName: void 0
}
// 权限认证
export default function (state = initialState, action) {
  switch(action.type) {
    case RECEIVE_ACCESSSTOKEN:
      return {
        ...state,
        hasError: false,
        accesstoken: action.accesstoken,
        loginName: action.loginName
      }
    case ERROR_ACCESSTOKEN: {
      return {
        ...state,
        accesstoken: void 0,
        loginName: void 0,
        hasError: true
      }
    }
    default:
      return state
  }
}
