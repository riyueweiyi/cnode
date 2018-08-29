import React, { Component } from 'react'
import PropTypes from 'prop-types'
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
import { Section, Empty, Loading } from '../../components/Message'
import Pixel from '../../utils'
import styles from './styles'

class Topic extends Component {
  // 标记单个消息为已读
  listItemClickHandle = ({ id, topic, has_read }) => {
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
    const { accesstoken } = this.props
    Pixel.post('/message/mark_all', { accesstoken }).then(_ => {
      showSnackBar('标记成功', 'success')
      this.getAllMessage(false)
    }).catch(_ => showSnackBar(_.error_msg, 'error'))
  }
  componentDidMount() {
    this.getAllMessage()
  }
  getAllMessage(needShowLoading = true) {
    const { getMessage, accesstoken } = this.props
    getMessage({ accesstoken }, needShowLoading)
  }
  render() {
    const { isLoading, classes, messages, hasnotReadMessages } = this.props
    if (isLoading) {
      return <Loading text="Loading..." />
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

Topic.propTypes = {
  classes: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => {
  const { message: { hasnotReadMessages, hasReadMessages, isLoading }, userInfo: { accesstoken } } = state
  return {
    messages: hasnotReadMessages.concat(hasReadMessages),
    isLoading,
    accesstoken,
    hasnotReadMessages: hasnotReadMessages.length
  }
}

const mapDispatchToProps = dispatch => ({
  getMessage: compose(dispatch, getMessage),
  showSnackBar: compose(dispatch, showSnackBar)
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Topic))
