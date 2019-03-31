import * as React from 'react'
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { flex } from './styles'
import { IStyle } from '../../type'

interface IAppBarWrapper extends IStyle {
  right: React.ReactNode
}

const AppBarWrapper: React.SFC<IAppBarWrapper> = ({ classes, children, right }) => {
  return <AppBar position="fixed">
    <Toolbar>
      <Typography variant="title" color="inherit" className={classes.flex}>
        {children}
      </Typography>
      {right}
    </Toolbar>
  </AppBar>
}

export default withStyles(flex)(AppBarWrapper)