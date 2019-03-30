import * as React from 'react'
import { withStyles, Theme } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'

const styles = (theme: Theme) => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
})

interface IErrorPage {
  classes: any
}

const ErrorPage: React.SFC<IErrorPage> = ({ children, classes }) => {
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
