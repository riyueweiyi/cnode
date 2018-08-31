import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch
} from 'react-router-dom'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import blue from '@material-ui/core/colors/blue'
import configureStore from './store/configureStore'
import routes from './routes'
import registerServiceWorker from './registerServiceWorker'
import { receiveAccesstoken, recordTopicPos } from './actions'
import App from './containers/App'
import './reset.css'

const theme = createMuiTheme({
  palette: {
    primary: blue,
  },
})

const userInfo = JSON.parse(sessionStorage.getItem('userInfo')) || {}
const tabInfo = JSON.parse(sessionStorage.getItem('tabInfo')) || {}
const store = configureStore()
store.dispatch(receiveAccesstoken(userInfo.accesstoken, userInfo.loginName))
store.dispatch(recordTopicPos(tabInfo.tab, tabInfo.scrollY, tabInfo.page, tabInfo.pageSize))

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
