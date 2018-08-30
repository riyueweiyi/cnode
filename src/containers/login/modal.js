import React, { Component } from 'react'
import { LoginModal } from '../../components/Login'
import Login from './index'

class LoginModalWrapper extends Component {
  render() {
    return <LoginModal closeBtn={this.props.closeBtn}><Login /></LoginModal>
  }
}

export default LoginModalWrapper