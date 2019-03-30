import { ActionType, IAppAction } from '../actions'
import { Reducer } from 'redux'

const initState = {
  status: 'beforeload', // 请求状态 beforeload loading success error
  errMsg: '',
  hasReadMessages: [],
  hasnotReadMessages: []
}

export type IMessage = Readonly<typeof initState>

export const reducer: Reducer = function (state: IMessage = initState, { type, payload }: IAppAction) {
  switch (type) {
    case ActionType.REQUEST_MESSAGE:
      return {
        ...state,
        status: 'loading'
      }
    case ActionType.RECEIVE_MESSAGE:
      return {
        ...state,
        status: 'success',
        errMsg: '',
        ...payload
      }
    case ActionType.FAIL_MESSAGE:
      return {
        ...state,
        status: 'error',
        ...payload
      }
    default:
      return state
  }
}
