import React, { Component } from 'react'
import { connect } from 'react-redux'
import IconButton from '@material-ui/core/IconButton'
import Notifications from '@material-ui/icons/Notifications'
import ProfileIcon from '@material-ui/icons/AccountCircle'
import LinearProgress from '@material-ui/core/LinearProgress'
import { Link } from 'react-router-dom'
import compose from 'lodash/fp/flowRight'
import { chagnTabHandle, recordTopicPos, requestNextPageTopicList, initPageData } from '../../actions'
import { Tab, FabBtn, Appbar, CardItem, CircularProgress } from '../../components/Home'

class Home extends Component {
  componentDidMount() {
    const { chagnTabHandle, initPageData, scrollY, tab } = this.props
    // 如果store有上次浏览记录，回滚显示
    if (scrollY || tab) {
      initPageData().then(_ => window.scrollTo(0, scrollY))
    } else {
      chagnTabHandle('')
    }
    window.addEventListener('scroll', this.loadNextPageData)
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.loadNextPageData)
  }
  loadNextPageData = (e) => {
    const { isLoading, requestNextPageTopicList, list } = this.props
    if (!list.length || isLoading) {
      return
    }
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      requestNextPageTopicList()
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
    recordTopicPos(tab, window.scrollY, page, pageSize)
    history.push(`/topic/${item.id}`)
  }
  render() {
    const { list, changeTabLoading, isLoading, tab, accesstoken } = this.props
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
      {isLoading && <LinearProgress />}
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
    isLoading: Boolean(isLoading && list.length),
    scrollY,
    changeTabLoading: Boolean(isLoading && !list.length)
  }
}

const mapDispatchToProps = (dispatch) => ({
  initPageData: compose(dispatch, initPageData),
  chagnTabHandle: compose(dispatch, chagnTabHandle),
  recordTopicPos: compose(dispatch, recordTopicPos),
  requestNextPageTopicList: compose(dispatch, requestNextPageTopicList)
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)