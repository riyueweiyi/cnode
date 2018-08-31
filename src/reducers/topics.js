import { RECEIVE_TOPICS, REQUEST_TOPICS, RECORD_TOPIC_POS, CHANGE_TAB, FAIL_TOPICS } from '../actions'

const initState = {
  list: [],
  isLoading: false,
  error: false,
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
        isLoading: true
      }
    case RECEIVE_TOPICS:
      return {
        ...state,
        error: false,
        list: action.topics,
        isLoading: false
      }
    case FAIL_TOPICS:
      return {
        ...state,
        error: true,
        isLoading: false,
        errorMsg: action.errMsg
      }
    case CHANGE_TAB:
      return {
        ...state,
        page: 1,
        scrollY: 0,
        list: [],
        tab: action.tab
      }
    case RECORD_TOPIC_POS:
      return {
        ...state,
        scrollY: action.scrollY,
        tab: action.tab,
        page: action.page,
        pageSize: action.pageSize
      }
    default:
      return state
  }
}
