import * as React from 'react'
import Email from '@material-ui/icons/Email'
import withStyles from '@material-ui/core/styles/withStyles'
import styles from './styles'

interface IEmpty {
  classes: any
}

const Empty: React.SFC<IEmpty> = ({ classes }) => (
  <div className={classes.empty}>
    <Email className={classes.emptyIcon} />
    <p className={classes.emptyText}>暂无更多消息</p>
  </div>
)

export default withStyles(styles as any)(Empty)