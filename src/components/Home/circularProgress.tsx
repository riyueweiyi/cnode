import * as React from 'react'
import { withStyles } from '@material-ui/core/styles'
import CircularProgress from '@material-ui/core/CircularProgress'
import { circularProgress } from './styles'
import { IStyle } from '../../type'

const CirProgress: React.SFC<IStyle> = ({ classes }) => (
  <div className={classes.circularProgress}>
    <CircularProgress size={50} />
  </div>
)

export default withStyles(circularProgress)(CirProgress)