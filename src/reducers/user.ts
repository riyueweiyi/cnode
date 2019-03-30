import { ActionType, IAppAction } from '../actions'
import { Reducer } from 'redux'

const initState = {
  status: 'beforeload', // beforeload loading success error
  user: null,
  errMsg: ''
}

export type IUserType = Readonly<typeof initState>

export const reducer: Reducer = (state: IUserType = initState, { type, payload }: IAppAction) => {
  switch (type) {
    case ActionType.REQUEST_USERINFO:
      return {
        ...state,
        status: 'loading'
      }
    case ActionType.RECEIVE_USERINFO:
      return {
        ...state,
        user: payload.data,
        status: payload.success ? 'success' : 'error',
        errMsg: !payload.success && payload.error_msg
      }
    default:
      return state
  }
}
