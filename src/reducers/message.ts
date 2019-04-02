import { ActionType } from '../actions'
import { Reducer } from 'redux'
import { createReducer } from './utils'

const initState = {
  status: 'beforeload', // 请求状态 beforeload loading success error
  errMsg: '',
  hasReadMessages: [],
  hasnotReadMessages: []
}

export type IMessage = Readonly<typeof initState>

export const reducer: Reducer = createReducer<IMessage>(initState, {
  [ActionType.REQUEST_MESSAGE] (state: IMessage) {
    return {
      ...state,
      status: 'loading'
    }
  },
  [ActionType.RECEIVE_MESSAGE] (state: IMessage, payload) {
    return {
      ...state,
      status: 'success',
      errMsg: '',
      ...payload
    }
  },
  [ActionType.FAIL_MESSAGE] (state: IMessage, payload) {
    return {
      ...state,
      status: 'error',
      ...payload
    }
  }
})
