
const styles = theme => ({
  bg: {
    position: 'relative',
    background: 'url(/images/bg.jpg) no-repeat center 0',
    backgroundSize: '100% 100%'
  },
  backBtn: {
    position: 'absolute',
    color: '#fff',
    left: theme.spacing.unit * 2,
    top: theme.spacing.unit
  },
  avatarWrapper: {
    display: 'flex',
    height: '10rem',
    padding: theme.spacing.unit * 3,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  loginname: {
    color: theme.palette.common.white
  },
  time: {
    float: 'right',
    fontSize: '14px',
    color: '#999'
  },
  topicTitle: {
    fontSize: '14px',
    color: '#999'
  },
  score: {
    fontSize: '14px',
    color: '#999'
  },
  avatar: {
    width: 80,
    height: 80,
    border: '2px solid transparent',
    boxShadow: theme.shadows[1]
  },
  listSection: {
    backgroundColor: theme.palette.common.white,
  },
  ul: {
    backgroundColor: theme.palette.common.white,
    padding: 0,
  },
  listSubTitle: {
    display: 'flex',
    alignItems: 'center',
  },
  listSubTitleIcon: {
    marginRight: theme.spacing.unit,
    fontSize: 18
  },
  marginNomarl: {
    margin: 0,
    width: '100%'
  },
  button: {
    color: '#666'
  }
})

export default styles