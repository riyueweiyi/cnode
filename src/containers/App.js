import React, { Component } from 'react'
import { connect } from 'react-redux'
import Snackbar from '@material-ui/core/Snackbar'
import SnackbarContent from '../components/SnackbarContent'
import { hideSnackBar } from '../actions'

class App extends Component {
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

const mapStateToProps = (state) => {
  const { snackBar: { content, variant }, topics } = state
  return {
    content,
    variant,
    tabInfo: topics ? {
      page: topics.page,
      pageSize: topics.pageSize,
      tab: topics.tab,
      scrollY: topics.scrollY
    } : null
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    hideSnackBar: () => {
      dispatch(hideSnackBar())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)