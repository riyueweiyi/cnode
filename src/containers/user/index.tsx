import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import List from '@material-ui/core/List'
import WorkIcon from '@material-ui/icons/Work'
import HowToRegIcon from '@material-ui/icons/HowToReg'
import compose from 'lodash/fp/flowRight'
import { getUserinfo } from '../../actions'
import { Avatar, Section, Loading } from '../../components/User'
import ErrorPage from '../../components/Error'
import { State } from '../../reducers'
import { ILoginName, IUserTopic } from '../../type'

interface IProps {
  error: boolean,
  errMsg: string,
  user: any,
  loading: boolean,
  loginname: ILoginName
}

const mapStateToProps = (state: State): IProps => {
  const { user: { user, status, errMsg }, userInfo: { loginname } } = state
  return {
    error: status === 'error',
    errMsg,
    user,
    loading: ['beforeload', 'loading'].includes(status),
    loginname: loginname as unknown as ILoginName
  }
}

interface IPropsfn {
  getUserinfo: (i: ILoginName) => void
}

const mapDispatchToProps = (dispatch: Dispatch<any>): IPropsfn => ({
  getUserinfo: compose(dispatch, getUserinfo)
})

class User extends React.Component<IProps & IPropsfn & { match: any, history: any}> {
  componentDidMount() {
    const { getUserinfo, match, loginname } = this.props
    window.scrollY && window.scrollTo(0, 0)
    getUserinfo(match.params.loginname || loginname)
  }
  // 查看主题详情
  listItemClickHandle = ({ id }: IUserTopic) => {
    this.props.history.push(`/topic/${id}`)
  }
  goBack = () => {
    this.props.history.go(-1)
  }
  render() {
    const { loading, error, errMsg, user } = this.props
    if (loading) {
      return <Loading text="loading" />
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

export default connect(mapStateToProps, mapDispatchToProps)(User)