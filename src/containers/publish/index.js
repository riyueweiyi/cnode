import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reset } from 'redux-form'
import compose from 'lodash/fp/flowRight'
import { publish, showLoginModal } from '../../actions'
import PublishForm from '../../components/Publish'
import LoginForm from '../login'

class Publish extends Component {
  state = {
    page: 1
  }
  componentDidMount() {
    const { accesstoken, showLoginModal } = this.props
    !accesstoken && showLoginModal()
  }
  onSubmit = (form) => {
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
  changePage = (step) => {
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

const mapDispatchToProps = (dispatch) => ({
  publish: compose(dispatch, publish),
  reset: compose(dispatch, reset),
  showLoginModal: compose(dispatch, showLoginModal)
})

const mapStateToProps = (state) => {
  const { userInfo: { accesstoken } } = state
  return {
    accesstoken
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Publish)
