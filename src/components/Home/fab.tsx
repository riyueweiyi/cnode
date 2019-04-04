import * as React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import { fab } from './styles'
import { IStyle } from '../../type'

interface IFab extends IStyle {
  onclick(e: React.MouseEvent): void,
  [k: string]: any
}
const FabBtn: React.SFC<IFab> = ({ classes, onClick, ...props }) => (
  <Button variant="fab" className={classes.fab} onClick={onClick} {...props} color="primary" aria-label="Add">
    <AddIcon />
  </Button>
)

export default withStyles(fab, { withTheme: true })(FabBtn)