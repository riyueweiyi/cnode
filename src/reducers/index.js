import { combineReducers } from 'redux'
import { reducer as reduxFormReducer } from 'redux-form'
import userInfo from './login'
import snackBar from './snackBar'
import message from './message'
import user from './user'
import topic from './topic'
import modal from './modal'

export default combineReducers({
  userInfo,
  snackBar,
  message,
  user,
  topic,
  loginModal: modal,
  form: reduxFormReducer
})
