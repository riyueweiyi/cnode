import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import styles from './styles'

const CirProgress = ({ classes }) => (
  <div className={classes.circularProgress}>
    <CircularProgress size={50} />
  </div>
)

CirProgress.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(CirProgress)