import React, { Component } from 'react'
import { connect } from 'react-redux'
import List from '@material-ui/core/List'
import WorkIcon from '@material-ui/icons/Work'
import HowToRegIcon from '@material-ui/icons/HowToReg'
import compose from 'lodash/fp/flowRight'
import { getUserinfo } from '../../actions'
import { Avatar, Section, Loading } from '../../components/User'
import ErrorPage from '../../components/Error'

class User extends Component {
  componentDidMount() {
    const { getUserinfo, match, loginName } = this.props
    getUserinfo(match.params.loginname || loginName)
  }
  listItemClickHandle = ({ id }) => {
    this.props.history.push(`/topic/${id}`)
  }
  goBack = () => {
    this.props.history.go(-1)
  }
  render() {
    const { loading, error, errMsg, user } = this.props
    if (loading) {
      return <Loading />
    }
    if (error) {
      return <ErrorPage>{errMsg}</ErrorPage>
    }
    const sections = [
      {
        title: '创作内容',
        icon: HowToRegIcon,
        topics: user.recent_topics
      },
      {
        title: '最近参与',
        icon: WorkIcon,
        topics: user.recent_replies
      }
    ]
    return <React.Fragment>
      <Avatar user={user} goBack={this.goBack} />
      <List subheader={<li />}>
        {
          sections.map(section => (
            <Section key={section.title} section={section} listItemClickHandle={this.listItemClickHandle} />
          ))
        }
      </List>
    </React.Fragment>
  }
}

const mapStateToProps = (state) => {
  const { user: { user, status, errMsg }, userInfo: { loginName } } = state
  return {
    error: status === 'error',
    errMsg,
    user,
    loading: ['beforeunload', 'loading'].some(i => i === status),
    loginName
  }
}

const mapDispatchToProps = dispatch => ({
  getUserinfo: compose(dispatch, getUserinfo)
})

export default connect(mapStateToProps, mapDispatchToProps)(User)