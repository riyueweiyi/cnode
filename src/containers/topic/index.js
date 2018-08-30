import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reset } from 'redux-form'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import IconButton from '@material-ui/core/IconButton'
import FavoriteIcon from '@material-ui/icons/Favorite'
import ListSubheader from '@material-ui/core/ListSubheader'
import compose from 'lodash/fp/flowRight'
import {
  getTopicDetail,
  showReplyDrawer,
  hideReplyDrawer,
  showLoginModal,
  showSnackBar
} from '../../actions'
import {
  Loading,
  Content,
  Reply as ReplyItem,
  Form as ReplyForm,
  Tabbar,
  Drawer
} from '../../components/Topic'
import LoginModal from '../login/modal'
import Pixel from '../../utils'

class Topic extends Component {
  componentDidMount() {
    window.scrollY && window.scrollTo(0, 0);
    this.getTopicDetail()
  }
  // 返回
  goBack = () => {
    this.props.history.go(-1)
  }
  getTopicDetail = (needShowLoading = true) => {
    const { match, getTopicDetailById, accesstoken } = this.props
    getTopicDetailById(match.params.id, { accesstoken }, needShowLoading)
  }
  // 收藏主题
  collectBtnClickHandle = (isCollect) => {
    const { match, accesstoken, showSnackBar, showLoginModal } = this.props
    if (!accesstoken) {
      showLoginModal()
      return
    }
    Pixel.post(isCollect ? '/topic_collect/de_collect' : '/topic_collect/collect', {
      accesstoken,
      topic_id: match.params.id
    }).then(_ => {
      showSnackBar(isCollect ? '取消收藏' : '收藏成功', 'success')
      this.getTopicDetail(false)
    }).catch(res => showSnackBar(res.error_msg, 'error'))
  }
  // 点赞
  upClickHanle = (item) => {
    const { accesstoken, showSnackBar, showLoginModal } = this.props
    if (!accesstoken) {
      showLoginModal()
      return
    }
    Pixel.post(`/reply/${item.id}/ups`, { accesstoken })
      .then(_ => this.getTopicDetail(false))
      .catch(_ => showSnackBar(_.error_msg, 'error'))
  }
  // 评论主题
  onSubmit = (values) => {
    const {
      match,
      accesstoken,
      reset,
      reply,
      showReplyDrawerModal,
      hideReplyDrawer,
      showSnackBar,
      showLoginModal
    } = this.props
    if (!values.reply) {
      showSnackBar('请输入评论', 'error')
      return
    }
    if (!accesstoken) {
      showLoginModal()
      return
    }
    const content = showReplyDrawerModal ? `@${reply.author.loginname} ${values.reply} ` : values.reply
    Pixel.post(`/topic/${match.params.id}/replies`, {
      accesstoken,
      content,
      ...(reply ? { reply_id: reply.id } : {})
    }).then(_ => {
      showSnackBar('回复成功', 'success')
      reset('replyForm')
      showReplyDrawerModal && hideReplyDrawer()
      this.getTopicDetail(false)
    }).catch(_ => showSnackBar(_.error_msg, 'error'))
  }
  render() {
    const { detail, isLoading, reply, showReplyDrawerModal, showReplyDrawer, hideReplyDrawer } = this.props
    if (isLoading || !detail) {
      return <Loading />
    }
    return <Paper>
      <Tabbar goBack={this.goBack} detail={detail} />
      <Content detail={detail} />
      <List subheader={<ListSubheader>评论</ListSubheader>}>
        {
          detail.replies.map(item => <ReplyItem
            key={item.id}
            item={item}
            upClickHanle={this.upClickHanle}
            replyItemClickHandle={showReplyDrawer}
          />)
        }
        <ListItem>
          <ListItemText primary="到底了..." />
        </ListItem>
      </List>
      {
        !showReplyDrawerModal ?
          <ReplyForm
            fixed
            onSubmit={this.onSubmit}
            right={
              <IconButton
                aria-label="Favorite"
                onClick={_ => this.collectBtnClickHandle(detail.is_collect)}
                color={detail.is_collect ? 'secondary' : 'default'}
              >
                <FavoriteIcon />
              </IconButton>
            }
          /> :
          <Drawer
            show={showReplyDrawerModal}
            onSubmit={this.onSubmit}
            onClose={hideReplyDrawer}
            reply={reply}
          />
      }
      <LoginModal closeBtn />
    </Paper>
  }
}

const mapStateToProps = (state) => {
  const { topic: { isLoading, detail, showReplyDrawer: showReplyDrawerModal, reply }, userInfo: { accesstoken } } = state
  return {
    detail,
    isLoading,
    accesstoken,
    showReplyDrawerModal,
    reply
  }
}

const mapDispatchToProps = dispatch => ({
  getTopicDetailById: compose(dispatch, getTopicDetail),
  reset: compose(dispatch, reset),
  showReplyDrawer: compose(dispatch, showReplyDrawer),
  hideReplyDrawer: compose(dispatch, hideReplyDrawer),
  showSnackBar: compose(dispatch, showSnackBar),
  showLoginModal: compose(dispatch, showLoginModal)
})

export default connect(mapStateToProps, mapDispatchToProps)(Topic)