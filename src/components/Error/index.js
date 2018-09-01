import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
})

function ErrorPage(props) {
  const { classes, children } = props
  return (
    <div>
      <Paper className={classes.root} elevation={0}>
        <Typography variant="headline" align="center" color="secondary"  >
          {children}
        </Typography>
      </Paper>
    </div>
  )
}

ErrorPage.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(ErrorPage)
