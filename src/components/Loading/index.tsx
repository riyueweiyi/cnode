import * as React from 'react'
import { withStyles, Theme } from '@material-ui/core/styles'
import LinearProgress from '@material-ui/core/LinearProgress'
import Typography from '@material-ui/core/Typography'
import { IStyle } from '../../type'

const styles = (_: Theme) => ({
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexCirection: 'column',
    height: 'calc(100vh - 5px)'
  }
})

interface ILoading extends IStyle {
  text: string
}

const Loading: React.SFC<ILoading> = ({ text = 'Loading...', classes }: ILoading) => {
  return <React.Fragment>
    <LinearProgress />
    <Typography
      variant="headline"
      color="primary"
      align="center"
      gutterBottom
      paragraph
      className={classes.wrapper}
    >
      {text}
    </Typography>
  </React.Fragment>
}

export default withStyles(styles)(Loading)
