import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { reset } from 'redux-form'
import { connect } from 'react-redux'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Slide from '@material-ui/core/Slide'
import Dialog from '@material-ui/core/Dialog'
import withStyles from '@material-ui/core/styles/withStyles'
import compose from 'lodash/fp/flowRight'
import styles from './style'
import LoginForm from './form'
import { login } from '../../actions'

function Transition(props) {
  return <Slide direction="up" {...props} />
}

class LoginModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: true, // 
    }
  }
  onSubmit = (values) => {
    this.props.login(values).then(res => {
      const { hasError, loginName, accesstoken, history, reset } = this.props
      if (!hasError) {
        reset('loginForm')
        window.sessionStorage.setItem('userInfo', JSON.stringify({ loginName, accesstoken }))
        history.push('/')
      }
    })
  }
  render() {
    const { classes } = this.props
    return <Dialog
      fullScreen
      open={this.state.open}
      onClose={this.handleClose}
      TransitionComponent={Transition}
    >
      <IconButton color="primary" className={classes.closeBtn} onClick={this.handleClose} aria-label="Close">
        <CloseIcon />
      </IconButton>
      <LoginForm onSubmit={this.onSubmit} />
    </Dialog>
  }
}

LoginModal.propTypes = {
  classes: PropTypes.object.isRequired,
}

const mapDispatchToProps = (dispatch) => ({
  login: compose(dispatch, login),
  reset: compose(dispatch, reset)
})

const mapStateToProps = (state) => {
  const { hasError, loginName, accesstoken } = state.userInfo
  return {
    hasError,
    loginName,
    accesstoken
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(LoginModal))