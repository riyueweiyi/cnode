import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import styles from './styles'

const FabBtn = ({ classes, onClick, ...props }) => (
  <Button variant="fab" className={classes.fab} onClick={onClick} {...props} color="primary" aria-label="Add">
    <AddIcon />
  </Button>
)

FabBtn.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(FabBtn)