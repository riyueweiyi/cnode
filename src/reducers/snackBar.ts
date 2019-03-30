import { ActionType, IAppAction } from '../actions'
import { Reducer } from 'redux'

const initialState = {
  content: '',
  variant: 'info'
}

export type ISnackBar = Readonly<typeof initialState>

export const reducer: Reducer =  function (state: ISnackBar = initialState, { type, payload }: IAppAction) {
  switch(type) {
    case ActionType.SHOW_SNACK_BAR:
      return {
        ...state,
        ...payload
      }
    case ActionType.HIDE_SNACK_BAR:
      return {
        ...state,
        content: ''
      }
    default:
      return state
  }
}
