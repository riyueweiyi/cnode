import { ActionType, IAppAction } from '../actions'
import { Reducer } from 'redux'

const initState = false
export type IModalType = Readonly<typeof initState>

export const reducer: Reducer =  (state: IModalType = initState, { type }: IAppAction) => {
  switch (type) {
    case ActionType.SHOW_LOGIN_MODAL:
      return true
    case ActionType.HIDE_LOGIN_MODAL:
      return false
    default:
      return state
  }
}