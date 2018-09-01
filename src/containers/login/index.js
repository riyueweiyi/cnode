import React, { Component } from 'react'
import { reset } from 'redux-form'
import compose from 'lodash/fp/flowRight'
import { connect } from 'react-redux'
import { login, hideLoginModal } from '../../actions'
import { LoginForm, ModalWrapper } from '../../components/Login'

class Login extends Component {
  static defaultProps = {
    modal: false, // 是否作为 modal 打开
    closeBtn: false, // modal 打开是否显示关闭按钮
  }
  getParameterByName(name, url) {
    if (!url) url = window.location.href
    name = name.replace(/[\[\]]/g, '\\$&')
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)')
    const results = regex.exec(url)
    if (!results) return null
    if (!results[2]) return ''
    return decodeURIComponent(results[2].replace(/\+/g, ' '))
  }
  onSubmit = (values) => {
    this.props.login(values).then(res => {
      const { error, loginName, accesstoken, hideLoginModal, reset, modal, history, location } = this.props
      if (!error) {
        reset('loginForm')
        window.sessionStorage.setItem('userInfo', JSON.stringify({ loginName, accesstoken }))
        // 如果是 login 是 modal 模式则关闭否则重定向 url
        if (modal) {
          hideLoginModal()
        } else {
          const url = this.getParameterByName('redirectUrl', location.search)
          history.replace(`/${url}`)
        }
      }
    })
  }
  render() {
    const { closeBtn, modal } = this.props
    if (modal) {
      return (<ModalWrapper closeBtn={closeBtn}>
        <LoginForm onSubmit={this.onSubmit} />
      </ModalWrapper>)
    }
    return <LoginForm onSubmit={this.onSubmit} />
  }
}

const mapDispatchToProps = (dispatch) => ({
  login: compose(dispatch, login),
  reset: compose(dispatch, reset),
  hideLoginModal: compose(dispatch, hideLoginModal)
})

const mapStateToProps = (state) => {
  const { userInfo: { error, loginName, accesstoken } } = state
  return {
    error,
    loginName,
    accesstoken
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)