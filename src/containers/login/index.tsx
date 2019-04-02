import * as React from 'react'
import { reset } from 'redux-form'
import { Dispatch } from 'redux'
import compose from 'lodash/fp/flowRight'
import { connect } from 'react-redux'
import { login, hideLoginModal } from '../../actions'
import { LoginForm, ModalWrapper } from '../../components/Login'
import { State } from '../../reducers'
import { ILoginForm } from '../../type'
import { RouteComponentProps } from 'react-router'


interface IPropsFn {
  login: (params: ILoginForm) => (dispatch: Dispatch<any>) => Promise<any>,
  reset: (form: string) => void,
  hideLoginModal: () => void
}
const mapDispatchToProps = (dispatch: Dispatch<any>): IPropsFn => ({
  login(params: ILoginForm) {
    return dispatch(login(params))
  },
  reset: compose(dispatch, reset),
  hideLoginModal: compose(dispatch, hideLoginModal)
})

interface IProps {
  error: boolean,
  loginname: string,
  accesstoken: string
}

const mapStateToProps = (state: State): IProps => {
  const { userInfo: { error, loginname = '', accesstoken = '' } } = state
  return {
    error,
    loginname,
    accesstoken
  }
}

class Login extends React.Component<IProps & IPropsFn & RouteComponentProps & {
  modal: boolean,
  closeBtn: boolean
}> {
  static defaultProps = {
    modal: false, // 是否作为 modal 打开
    closeBtn: false, // modal 打开是否显示关闭按钮
  }
  getParameterByName(name: string, url: string) {
    if (!url) url = window.location.href
    name = name.replace(/[\[\]]/g, '\\$&')
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)')
    const results = regex.exec(url)
    if (!results) return null
    if (!results[2]) return ''
    return decodeURIComponent(results[2].replace(/\+/g, ' '))
  }
  onSubmit = async (values: ILoginForm) => {
    await this.props.login(values)
    const { error, loginname, accesstoken, hideLoginModal, reset, modal, history, location } = this.props
    if (!error) {
      reset('loginForm')
      window.sessionStorage.setItem('userInfo', JSON.stringify({ loginname, accesstoken }))
      // 如果是 login 是 modal 模式则关闭否则重定向 url
      if (modal) {
        hideLoginModal()
      } else {
        const url = this.getParameterByName('redirectUrl', location.search)
        history.replace(`/${url || ''}`)
      }
    }
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



export default connect(mapStateToProps, mapDispatchToProps)(Login)