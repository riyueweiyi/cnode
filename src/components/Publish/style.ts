import green from '@material-ui/core/colors/green'
import { Theme, createStyles } from '@material-ui/core/styles'

const styles = (theme: Theme) => createStyles({
  layout: {
    display: 'flex',
    flexDirection: 'column',
    width: 'auto',
    height: 'calc(100vh - 64px)',
    justifyContent: 'center',
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    }
  },
  backBtn: {
    marginLeft: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 2
  },
  wrapper: {
    position: 'relative',
    marginTop: theme.spacing.unit * 2,
    display: 'flex',
    justifyContent: 'space-between'
  },
  right: {
    display: 'flex',
    marginTop: theme.spacing.unit * 2,
    justifyContent: 'flex-end'
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
})

export default styles