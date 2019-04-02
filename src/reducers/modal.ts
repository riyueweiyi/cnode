import { ActionType } from '../actions'
import { Reducer } from 'redux'
import { createReducer } from './utils'

const initState = false
export type IModalType = boolean

export const reducer: Reducer =  createReducer<IModalType>(initState, {
  [ActionType.SHOW_LOGIN_MODAL]() {
    return true
  },
  [ActionType.HIDE_LOGIN_MODAL] () {
    return false
  }
})
