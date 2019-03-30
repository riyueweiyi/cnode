
import { ActionType, IAppAction } from '../actions'
import { Reducer } from 'redux'

const initialState = {
  error: false,
  accesstoken: void 0,
  loginname: void 0
}

export type ILogin = Readonly<typeof initialState>

// 权限认证
export const reducer: Reducer = function (state: ILogin = initialState, { type, payload }: IAppAction) {
  switch(type) {
    case ActionType.RECEIVE_ACCESSSTOKEN:
      return {
        ...state,
        error: false,
        ...payload
      }
    case ActionType.ERROR_ACCESSTOKEN: {
      return {
        ...state,
        accesstoken: void 0,
        loginname: void 0,
        error: true
      }
    }
    default:
      return state
  }
}
