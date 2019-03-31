import * as React from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import List from '@material-ui/core/List'
import { connect } from 'react-redux'
import compose from 'lodash/fp/flowRight'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import ArrowBack from '@material-ui/icons/ArrowBack'
import { getMessage, showSnackBar } from '../../actions'
import ErrorPage from '../../components/Error'
import { Section, Empty, Loading } from '../../components/Message'
import Pixel from '../../utils'
import styles from './styles'
import { Dispatch } from 'redux';
import { IMessage, IStyle } from '../../type'
import { State } from '../../reducers'
import { RouteComponentProps } from 'react-router-dom'

interface IOwnProps {
  error: boolean,
  errMsg: string,
  messages: IMessage[],
  loading: boolean,
  accesstoken: string,
  hasnotReadMessages: boolean
}
const mapStateToProps = (state: State): IOwnProps => {
  const { message: { status, errMsg, hasnotReadMessages, hasReadMessages }, userInfo: { accesstoken = '' } } = state
  return {
    error: status === 'error',
    errMsg,
    messages: hasnotReadMessages.concat(hasReadMessages),
    loading: ['loading', 'beforeload'].includes(status),
    accesstoken,
    hasnotReadMessages: !!hasnotReadMessages.length
  }
}

interface IProps {
  getMessage: (showLoading?: boolean) => void,
  showSnackBar: (content: string, variant: string) => void
}
const mapDispatchToProps = (dispatch: Dispatch<any>): IProps => ({
  getMessage: compose(dispatch, getMessage),
  showSnackBar: compose(dispatch, showSnackBar)
})



class Topic extends React.Component<IProps & IOwnProps & RouteComponentProps & IStyle> {
  // 标记单个消息为已读
  listItemClickHandle = ({ id, topic, has_read }: IMessage) => {
    const { history, accesstoken } = this.props
    if (!has_read) {
      Pixel.post(`/message/mark_one/${id}`, { accesstoken }).then(_ => history.push(`/topic/${topic.id}`)).catch(_ => showSnackBar(_.error_msg, 'error'))
    } else {
      history.push(`/topic/${topic.id}`)
    }
  }
  goBack = () => {
    this.props.history.go(-1)
  }
  // 标记全部消息为已读
  markAll = () => {
    const { accesstoken, getMessage } = this.props
    Pixel.post('/message/mark_all', { accesstoken }).then(_ => {
      showSnackBar('标记成功', 'success')
      getMessage()
    }).catch(_ => showSnackBar(_.error_msg, 'error'))
  }
  componentDidMount() {
    const { getMessage } = this.props
    window.scrollY && window.scrollTo(0, 0)
    getMessage(true)
  }
  render() {
    const { loading, errMsg, error, classes, messages, hasnotReadMessages } = this.props
    if (loading) {
      return <Loading text="Loading..." />
    }
    if (error) {
      return <ErrorPage>{errMsg}</ErrorPage>
    }
    const messageList = [{
      title: '通知列表',
      messages
    }]
    return <div>
      <AppBar position="static" color="inherit">
        <Toolbar>
          <IconButton color="primary" onClick={this.goBack} aria-label="Close">
            <ArrowBack />
          </IconButton>
          <Typography variant="title" color="primary">
            消息
          </Typography>
        </Toolbar>
      </AppBar>
      {
        messages.length ?
          <List className={classes.root} subheader={<li />}>
            {messageList.map(section => <Section
              hasnotReadMessages={hasnotReadMessages}
              key={section.title}
              section={section}
              markAll={this.markAll}
              onClick={this.listItemClickHandle}
            />)}
          </List> :
          <Empty />
      }
    </div>
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Topic))
