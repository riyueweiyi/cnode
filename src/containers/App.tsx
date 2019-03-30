import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import Snackbar from '@material-ui/core/Snackbar'
import SnackbarContent from '../components/SnackbarContent'
import { hideSnackBar, IAppAction } from '../actions'
import { TopicPos, AllTabKey } from '../type'
import { State } from '../reducers'

interface IProps {
  content: string,
  variant: string,
  tabInfo: TopicPos
}
const mapStateToProps = (state: State): IProps => {
  const { snackBar: { content, variant }, topics } = state
  return {
    content,
    variant,
    tabInfo: {
      page: topics.page,
      pageSize: topics.pageSize,
      tab: topics.tab as AllTabKey,
      scrollY: topics.scrollY
    }
  }
}

type IPropsFn = {
  hideSnackBar: () => void
}
const mapDispatchToProps = (dispatch: Dispatch<IAppAction>): IPropsFn => {
  return {
    hideSnackBar: () => {
      dispatch(hideSnackBar())
    }
  }
}

class App extends React.Component<IProps & IPropsFn & { children?: React.ReactElement }> {
  handleClose = () => {
    this.props.hideSnackBar()
  }
  onbeforeunloadHandle = () => {
    const { tabInfo } = this.props
    sessionStorage.setItem('tabInfo', JSON.stringify(tabInfo))
  }
  componentDidMount() {
    window.addEventListener('beforeunload', this.onbeforeunloadHandle)
  }
  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.onbeforeunloadHandle)
  }
  render() {
    const { content, variant } = this.props
    return (
      <React.Fragment>
        <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={!!content}
          autoHideDuration={2000}
          onClose={this.handleClose}
        >
          <SnackbarContent
            onClose={this.handleClose}
            variant={variant}
            message={content}
          />
        </Snackbar>
        {this.props.children}
      </React.Fragment>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)