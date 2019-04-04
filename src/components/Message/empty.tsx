import * as React from 'react'
import Email from '@material-ui/icons/Email'
import withStyles from '@material-ui/core/styles/withStyles'
import styles from './styles'
import { IStyle } from '../../type'

const Empty: React.SFC<IStyle> = ({ classes }) => (
  <div className={classes.empty}>
    <Email className={classes.emptyIcon} />
    <p className={classes.emptyText}>暂无更多消息</p>
  </div>
)

export default withStyles(styles)(Empty)