import * as React from 'react'
import { connect } from 'react-redux'
import { reset } from 'redux-form'
import compose from 'lodash/fp/flowRight'
import { publish, showLoginModal } from '../../actions'
import PublishForm from '../../components/Publish'
import LoginForm from '../login'
import { Dispatch } from 'redux'
import { State } from '../../reducers'
import { PublicTopic } from '../../type'

const initState = {
  page: 1
}

type IState = Readonly<typeof initState>

interface IProps {
  accesstoken: string
}

interface IpropsFn {
  publish: (body: PublicTopic) => Promise<any>,
  reset: (s: string) => {},
  showLoginModal: () => {}
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  publish: compose(dispatch, publish),
  reset: compose(dispatch, reset),
  showLoginModal: compose(dispatch, showLoginModal)
})

const mapStateToProps = (state: State): IProps => {
  const { userInfo: { accesstoken = '' } } = state
  return {
    accesstoken
  }
}

class Publish extends React.Component<IpropsFn & IProps & { history: any }, IState> {
  readonly state = initState
  componentDidMount() {
    const { accesstoken, showLoginModal } = this.props
    !accesstoken && showLoginModal()
  }
  onSubmit = (form: PublicTopic) => {
    const { publish, history, reset } = this.props
    publish(form).then((res) => {
      reset('publishForm')
      res.success && history.replace('/')
    })
  }
  nextPage = () => {
    this.changePage(1)
  }
  previousPage = () => {
    this.changePage(-1)
  }
  changePage = (step: number) => {
    this.setState({ page: this.state.page + step })
  }
  goBack = () => {
    this.props.history.go(-1)
  }
  render() {
    return <React.Fragment>
      <PublishForm
        page={this.state.page}
        goBack={this.goBack}
        previousPage={this.previousPage}
        nextPage={this.nextPage}
        onSubmit={this.onSubmit}
      />
      <LoginForm modal />
    </React.Fragment>
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Publish)
