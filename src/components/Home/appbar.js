import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import styles from './styles'

const AppBarWrapper = ({ classes, children, right }) => {
  return <AppBar position="fixed">
    <Toolbar>
      <Typography variant="title" color="inherit" className={classes.flex}>
        {children}
      </Typography>
      {right}
    </Toolbar>
  </AppBar>
}

AppBarWrapper.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(AppBarWrapper)