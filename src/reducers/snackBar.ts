import { ActionType } from '../actions'
import { Reducer } from 'redux'
import { createReducer } from './utils'

const initialState = {
  content: '',
  variant: 'info'
}

export type ISnackBar = Readonly<typeof initialState>

export const reducer: Reducer = createReducer<ISnackBar>(initialState, {
  [ActionType.SHOW_SNACK_BAR] (state: ISnackBar, payload) {
    return {
      ...state,
      ...payload
    }
  },
  [ActionType.HIDE_SNACK_BAR] (state: ISnackBar) {
    return {
      ...state,
      content: ''
    }
  }
})
