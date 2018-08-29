import React from 'react'
import Email from '@material-ui/icons/Email'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import styles from './styles'

const Empty = ({ classes }) => (
  <div className={classes.empty}>
    <Email className={classes.emptyIcon} />
    <p className={classes.emptyText}>暂无更多消息</p>
  </div>
)

Empty.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Empty)