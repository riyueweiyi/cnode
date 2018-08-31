import React, { Component } from 'react'
import { connect } from 'react-redux'
import IconButton from '@material-ui/core/IconButton'
import Notifications from '@material-ui/icons/Notifications'
import ProfileIcon from '@material-ui/icons/AccountCircle'
import { Link } from 'react-router-dom'
import compose from 'lodash/fp/flowRight'
import { chagnTabHandle, recordTopicPos } from '../../actions'
import { Tab, FabBtn, Appbar, CardItem, CircularProgress } from '../../components/Home'

class Home extends Component {
  componentDidMount() {
    const { chagnTabHandle, scrollY, tab } = this.props
    if (scrollY && tab) {
      // 如果store有上次浏览记录，回滚显示
      chagnTabHandle(tab).then(_ => window.scrollTo(0, scrollY)) 
    } else {
      chagnTabHandle('')
    }
  }
  publishBtnClickHandle = () => {
    const { history } = this.props
    history.push('/publish')
  }
  chagnTabHandle = (e, value) => {
    const { chagnTabHandle } = this.props
    chagnTabHandle(value)
  }
  goUserPage = () => {
    const { accesstoken, loginName, history } = this.props
    history.push(accesstoken ? `/user/${loginName}` : '/login?redirectUrl=user')
  }
  cardItemClickHandle = (item) => {
    const { history, tab, page, pageSize, recordTopicPos } = this.props
    // 记录滚动的位置和主题总数
    recordTopicPos(tab, window.scrollY, page * pageSize)
    history.push(`/topic/${item.id}`)
  }
  render() {
    const { list, changeTabLoading, tab, accesstoken } = this.props
    return <div>
      <Appbar right={
        <React.Fragment>
          {
            accesstoken && <IconButton color="inherit" component={Link} to="/message">
              <Notifications />
            </IconButton>
          }
          <IconButton
            color="inherit"
            onClick={this.goUserPage}
          >
            <ProfileIcon />
          </IconButton>
        </React.Fragment>
      }
      >
        Home
      </Appbar>
      <Tab tab={tab} handleChange={this.chagnTabHandle}>
        {
          changeTabLoading && <CircularProgress />
        }
        {
          list.map(item => <CardItem key={item.id} onClick={this.cardItemClickHandle} item={item} />)
        }
      </Tab>
      <FabBtn onClick={this.publishBtnClickHandle} />
    </div>
  }
}

const mapStateToProps = (state) => {
  const { topics: { list, tab, isLoading, page, pageSize, scrollY }, userInfo: { accesstoken, loginName } } = state
  return {
    page,
    pageSize,
    accesstoken,
    loginName,
    list,
    tab,
    isLoading,
    scrollY,
    changeTabLoading: isLoading && page === 1
  }
}

const mapDispatchToProps = (dispatch) => ({
  chagnTabHandle: compose(dispatch, chagnTabHandle),
  recordTopicPos: compose(dispatch, recordTopicPos)
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)