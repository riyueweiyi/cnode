import { ActionType } from '../actions'
import { Reducer } from 'redux'
import { createReducer } from './utils'

const initState = {
  status: 'beforeload', // beforeload loading success error
  user: null,
  errMsg: ''
}

export type IUserType = Readonly<typeof initState>

export const reducer: Reducer = createReducer<IUserType>(initState, {
  [ActionType.REQUEST_USERINFO] (state: IUserType) {
    return {
      ...state,
      status: 'loading'
    }
  },
  [ActionType.RECEIVE_USERINFO] (state: IUserType, payload) {
    return {
      ...state,
      user: payload.data,
      status: payload.success ? 'success' : 'error',
      errMsg: !payload.success && payload.error_msg
    }
  }
})
