
import { ActionType } from '../actions'
import { Reducer } from 'redux'
import { createReducer } from './utils'

const initialState = {
  error: false,
  accesstoken: void 0,
  loginname: void 0
}

export type ILogin = Readonly<typeof initialState>

// 权限认证
export const reducer: Reducer = createReducer<ILogin>(initialState, {
  [ActionType.RECEIVE_ACCESSSTOKEN] (state: ILogin, payload: any) {
    return {
      ...state,
      error: false,
      ...payload
    }
  },
  [ActionType.ERROR_ACCESSTOKEN] (state: ILogin) {
    return {
      ...state,
      accesstoken: void 0,
      loginname: void 0,
      error: true
    }
  }
})
