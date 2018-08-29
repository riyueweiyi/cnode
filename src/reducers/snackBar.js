import { SHOW_SNACK_BAR, HIDE_SNACK_BAR } from '../actions'

const initialState = {
  content: '',
  variant: 'info'
}

export default function (state = initialState, action) {
  switch(action.type) {
    case SHOW_SNACK_BAR:
      return {
        ...state,
        content: action.content,
        variant: action.variant
      }
    case HIDE_SNACK_BAR:
      return {
        ...state,
        content: ''
      }
    default:
      return state
  }
}
