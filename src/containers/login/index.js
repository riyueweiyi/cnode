import React, { Component } from 'react'
import { reset } from 'redux-form'
import compose from 'lodash/fp/flowRight'
import { connect } from 'react-redux'
import { login, hideLoginModal } from '../../actions'
import { LoginForm } from '../../components/Login'

class Login extends Component {
  onSubmit = (values) => {
    this.props.login(values).then(res => {
      const { hasError, loginName, accesstoken, hideLoginModal, reset } = this.props
      if (!hasError) {
        reset('loginForm')
        window.sessionStorage.setItem('userInfo', JSON.stringify({ loginName, accesstoken }))
        hideLoginModal()
      }
    })
  }
  render() {
    return <LoginForm onSubmit={this.onSubmit} />
  }
}

const mapDispatchToProps = (dispatch) => ({
  login: compose(dispatch, login),
  reset: compose(dispatch, reset),
  hideLoginModal: compose(dispatch, hideLoginModal)
})

const mapStateToProps = (state) => {
  const { userInfo: { hasError, loginName, accesstoken } } = state
  return {
    hasError,
    loginName,
    accesstoken
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)