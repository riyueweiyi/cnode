import { ActionType, IAppAction } from '../actions'
import { Reducer } from 'redux'
import { createReducer } from './utils'

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

export const reducer: Reducer = createReducer<ITopicsType> (initState, {
  [ActionType.REQUEST_TOPICS] (state: ITopicsType) {
    return {
      ...state,
      status: 'loading'
    }
  },
  [ActionType.RECEIVE_TOPICS] (state: ITopicsType, payload) {
    return {
      ...state,
      list: payload.page === 1 ? payload.topics : [...state.list, ...payload.topics],
      status: 'success'
    }
  },
  [ActionType.FAIL_TOPICS] (state: ITopicsType, payload) {
    return {
      ...state,
      status: 'error',
      page: payload.page > 1 ? payload.page - 1 : 1, // 加载失败回退到上一页
      errorMsg: payload.errMsg
    }
  },
  [ActionType.CHANGE_TAB] (state: ITopicsType, payload) {
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
  },
  [ActionType.RECORD_TOPIC_POS] (state: ITopicsType, payload) {
    return {
      ...state,
      list: [],
      ...payload
    }
  },
  [ActionType.REQUEST_NEXT_PAGE_TOPIC_LIST] (state: ITopicsType) {
    return {
      ...state,
      page: state.page + 1
    }
  }
})
