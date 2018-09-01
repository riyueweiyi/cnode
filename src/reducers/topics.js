import { RECEIVE_TOPICS, REQUEST_NEXT_PAGE_TOPIC_LIST, REQUEST_TOPICS, RECORD_TOPIC_POS, CHANGE_TAB, FAIL_TOPICS } from '../actions'

const initState = {
  list: [],
  status: 'beforeunload', // beforeunload loading success error
  tab: '',
  page: 1,
  pageSize: 15,
  scrollY: 0,
  errorMsg: ''
}

export default (state = initState, action) => {
  switch (action.type) {
    case REQUEST_TOPICS:
      return {
        ...state,
        status: 'loading'
      }
    case RECEIVE_TOPICS:
      return {
        ...state,
        list: action.page === 1 ? action.topics : [...state.list, ...action.topics],
        status: 'success'
      }
    case FAIL_TOPICS:
      return {
        ...state,
        status: 'error',
        page: action.page > 1 ? action.page - 1 : 1, // 加载失败回退到上一页
        errorMsg: action.errMsg
      }
    case CHANGE_TAB:
      return {
        ...state,
        page: 1,
        scrollY: 0,
        list: [],
        pageSize: 15,
        errMsg: '',
        status: 'beforeunload',
        tab: action.tab
      }
    case RECORD_TOPIC_POS:
      return {
        ...state,
        list: [],
        scrollY: action.scrollY,
        tab: action.tab,
        page: action.page,
        pageSize: action.pageSize
      }
    case REQUEST_NEXT_PAGE_TOPIC_LIST:
      return {
        ...state,
        page: state.page + 1
      }
    default:
      return state
  }
}
