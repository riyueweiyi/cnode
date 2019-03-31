import { ActionType, IAppAction } from '../actions'
import { Reducer } from 'redux'

const initState = {
  list: [],
  status: 'beforeload', // beforeload loading success error
  tab: '',
  page: 1,
  pageSize: 15,
  scrollY: 0,
  errorMsg: ''
}

export type ITopicsType = Readonly<typeof initState>

export const reducer: Reducer = (state: ITopicsType = initState, { type, payload }: IAppAction) => {
  switch (type) {
    case ActionType.REQUEST_TOPICS:
      return {
        ...state,
        status: 'loading'
      }
    case ActionType.RECEIVE_TOPICS:
      return {
        ...state,
        list: payload.page === 1 ? payload.topics : [...state.list, ...payload.topics],
        status: 'success'
      }
    case ActionType.FAIL_TOPICS:
      return {
        ...state,
        status: 'error',
        page: payload.page > 1 ? payload.page - 1 : 1, // 加载失败回退到上一页
        errorMsg: payload.errMsg
      }
    case ActionType.CHANGE_TAB:
      return {
        ...state,
        page: 1,
        scrollY: 0,
        list: [],
        pageSize: 15,
        errorMsg: '',
        status: 'beforeload',
        tab: payload.tab
      }
    case ActionType.RECORD_TOPIC_POS:
      return {
        ...state,
        list: [],
        ...payload
      }
    case ActionType.REQUEST_NEXT_PAGE_TOPIC_LIST:
      return {
        ...state,
        page: state.page + 1
      }
    default:
      return state
  }
}
