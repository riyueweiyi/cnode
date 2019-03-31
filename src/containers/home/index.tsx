import * as React from 'react'
import { connect } from 'react-redux'
import IconButton from '@material-ui/core/IconButton'
import Notifications from '@material-ui/icons/Notifications'
import ProfileIcon from '@material-ui/icons/AccountCircle'
import LinearProgress from '@material-ui/core/LinearProgress'
import Typography from '@material-ui/core/Typography'
import compose from 'lodash/fp/flowRight'
import { Link, RouteComponentProps } from 'react-router-dom'
import { changeTabHandle, recordTopicPos, requestNextPageTopicList, initPageData } from '../../actions'
import { Tab, FabBtn, Appbar, CardItem, CircularProgress } from '../../components/Home'
import { State } from '../../reducers'
import { ILoginInfo, TopicPos, AllTabKey, ITopic } from '../../type';
import { Dispatch } from 'redux'

interface IOwnProps extends TopicPos, ILoginInfo {
  error: boolean,
  errMsg: string,
  list: ITopic[],
  loading: boolean,
  firstPageLoading: boolean
}
const mapStateToProps = (state: State): IOwnProps => {
  const { topics: { errorMsg: errMsg, list, tab, status, page, pageSize, scrollY }, userInfo: { accesstoken = '', loginname = '' } } = state
  return {
    error: status === 'error',
    errMsg,
    page,
    pageSize,
    accesstoken,
    loginname,
    list,
    tab: tab as AllTabKey,
    loading: Boolean(status === 'loading' && list.length), // 加载下一页loading
    scrollY,
    firstPageLoading: Boolean(status === 'loading' && !list.length) // 加载第一页loading
  }
}

interface IProps {
  initPageData: () => void,
  changeTabHandle: (tabValue: AllTabKey) => void,
  recordTopicPos: (pos: TopicPos) => void,
  requestNextPageTopicList: () => void
}

const mapDispatchToProps = (dispatch: Dispatch<any>): IProps => ({
  initPageData: compose(dispatch, initPageData),
  changeTabHandle: compose(dispatch, changeTabHandle),
  recordTopicPos: compose(dispatch, recordTopicPos),
  requestNextPageTopicList: compose(dispatch, requestNextPageTopicList)
})
class Home extends React.Component<RouteComponentProps & IOwnProps & IProps> {
  async componentDidMount() {
    const { changeTabHandle, initPageData, scrollY, tab } = this.props
    // 如果store有上次浏览记录，回滚显示
    if (scrollY || tab) {
      await initPageData()
      window.scrollTo(0, scrollY)
    } else {
      changeTabHandle('' as AllTabKey)
    }
    window.addEventListener('scroll', this.loadNextPageData)
  }
  componentWillUnmount() {
    // 记录浏览位置
    this.recordScrollY()
    window.removeEventListener('scroll', this.loadNextPageData)
  }
  loadNextPageData = () => {
    const { loading, requestNextPageTopicList, list } = this.props
    if (!list.length || loading) {
      return
    }
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      requestNextPageTopicList()
    }
  }
  // 切换tab
  changeTabHandle = (e: React.ChangeEvent, value: AllTabKey) => {
    const { changeTabHandle } = this.props
    changeTabHandle(value)
  }
  // 查看个人主页
  goUserPage = () => {
    const { accesstoken, loginname, history } = this.props
    history.push(accesstoken ? `/user/${loginname}` : '/login?redirectUrl=user')
  }
  recordScrollY = () => {
    const { tab, page, pageSize, recordTopicPos } = this.props
    // 记录用户浏览的位置
    recordTopicPos({
      tab, 
      scrollY: window.scrollY,
      page,
      pageSize
    })
  }
  // 查看主题详情
  cardItemClickHandle = (item: ITopic) => {
    const { history } = this.props
    history.push(`/topic/${item.id}`)
  }
  gotoMsg = () => {
    const { history } = this.props
    history.push(`/message`)
  }
  render() {
    const { list, firstPageLoading, loading, error, errMsg, tab, accesstoken } = this.props
    return <div>
      <Appbar right={
        <React.Fragment>
          {
            accesstoken && <IconButton color="inherit" onClick={this.gotoMsg}>
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
      <Tab tab={tab} handleChange={this.changeTabHandle}>
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

export default connect(mapStateToProps, mapDispatchToProps)(Home)