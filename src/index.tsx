import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import {
  HashRouter as Router,
  Switch
} from 'react-router-dom'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import blue from '@material-ui/core/colors/blue'
import configureStore from './store/configureStore'
import routes from './routes'
import registerServiceWorker from './registerServiceWorker'
import { receiveAccesstoken, recordTopicPos } from './actions'
import App from './containers/App'
import { ILoginInfo, TopicPos } from './type'
import './reset.css'

const theme = createMuiTheme({
  palette: {
    primary: blue,
  },
})

const userInfo: ILoginInfo = JSON.parse(sessionStorage.getItem('userInfo') as string) || {}
const tabInfo: TopicPos = JSON.parse(sessionStorage.getItem('tabInfo') as string) || {}
const store = configureStore()
store.dispatch(receiveAccesstoken(userInfo))
store.dispatch(recordTopicPos(tabInfo))

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <App>
        <Router>
          <Switch>
            {routes}
          </Switch>
        </Router>
      </App>
    </MuiThemeProvider>
  </Provider>, document.getElementById('root')
)
registerServiceWorker()
