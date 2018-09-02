import React, { Component } from 'react'
import { connect } from 'react-redux'
import IconButton from '@material-ui/core/IconButton'
import Notifications from '@material-ui/icons/Notifications'
import ProfileIcon from '@material-ui/icons/AccountCircle'
import LinearProgress from '@material-ui/core/LinearProgress'
import Typography from '@material-ui/core/Typography'
import compose from 'lodash/fp/flowRight'
import { Link } from 'react-router-dom'
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
    // 记录浏览位置
    this.recordScrollY()
    window.removeEventListener('scroll', this.loadNextPageData)
  }
  loadNextPageData = (e) => {
    const { loading, requestNextPageTopicList, list } = this.props
    if (!list.length || loading) {
      return
    }
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      requestNextPageTopicList()
    }
  }
  chagnTabHandle = (e, value) => {
    const { chagnTabHandle } = this.props
    chagnTabHandle(value)
  }
  goUserPage = () => {
    const { accesstoken, loginName, history } = this.props
    history.push(accesstoken ? `/user/${loginName}` : '/login?redirectUrl=user')
  }
  recordScrollY = () => {
    const { tab, page, pageSize, recordTopicPos } = this.props
    // 记录滚动的位置和主题总数
    recordTopicPos(tab, window.scrollY, page, pageSize)
  }
  cardItemClickHandle = (item) => {
    const { history } = this.props
    history.push(`/topic/${item.id}`)
  }
  render() {
    const { list, firstPageLoading, loading, error, errMsg, tab, accesstoken } = this.props
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
          firstPageLoading && <CircularProgress />
        }
        {
          error && <Typography align="center" gutterBottom color="secondary" component="p" >{errMsg}</Typography>
        }
        {
          list.map(item => <CardItem key={item.id} onClick={this.cardItemClickHandle} item={item} />)
        }
      </Tab>
      {loading && <LinearProgress />}
      <FabBtn component={Link} to="/publish" />
    </div>
  }
}

const mapStateToProps = (state) => {
  const { topics: { errMsg, list, tab, status, page, pageSize, scrollY }, userInfo: { accesstoken, loginName } } = state
  return {
    error: status === 'error',
    errMsg,
    page,
    pageSize,
    accesstoken,
    loginName,
    list,
    tab,
    loading: Boolean(status === 'loading' && list.length), // 加载下一页loading
    scrollY,
    firstPageLoading: Boolean(status === 'loading' && !list.length) // 加载第一页loading
  }
}

const mapDispatchToProps = (dispatch) => ({
  initPageData: compose(dispatch, initPageData),
  chagnTabHandle: compose(dispatch, chagnTabHandle),
  recordTopicPos: compose(dispatch, recordTopicPos),
  requestNextPageTopicList: compose(dispatch, requestNextPageTopicList)
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)