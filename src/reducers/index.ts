import { combineReducers } from 'redux'
import { reducer as reduxFormReducer } from 'redux-form'
import { reducer as userInfo, ILogin } from './login'
import { reducer as snackBar, ISnackBar } from './snackBar'
import { reducer as message, IMessage } from './message'
import { reducer as user, IUserType } from './user'
import { reducer as topic, ITopicType } from './topic'
import { reducer as modal, IModalType } from './modal'
import { reducer as topics, ITopicsType } from './topics'

const reducers = {
  userInfo,
  snackBar,
  message,
  user,
  topic,
  topics,
  loginModal: modal,
  form: reduxFormReducer
}

export const rootReducer = combineReducers(reducers)