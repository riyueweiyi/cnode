import { IAppAction } from '../actions'
import { Reducer } from 'redux'

interface IFns<T> {
  [key: string]: (state: T, payload?: any) => T
}
export const createReducer = function <T>(initialState: T, handlers: IFns<T>): Reducer {
  return function reducer(state = initialState, { type, payload }: IAppAction) {
    if (handlers.hasOwnProperty(type)) {
      return handlers[type](state, payload)
    } else {
      return state
    }
  }
}
