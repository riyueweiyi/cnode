import * as React from 'react'
import { withStyles, Theme } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { IStyle } from '../../type'

const styles = (theme: Theme) => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
})

const ErrorPage: React.SFC<IStyle> = ({ children, classes }) => {
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

export default withStyles(styles)(ErrorPage)
