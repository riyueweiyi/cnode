import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Slide from '@material-ui/core/Slide'
import Dialog from '@material-ui/core/Dialog'
import withStyles from '@material-ui/core/styles/withStyles'
import compose from 'lodash/fp/flowRight'
import styles from './style'
import { hideLoginModal } from '../../actions'

function Transition(props) {
  return <Slide direction="up" {...props} />
}

class LoginModal extends Component {
  static defaultProps = {
    closeBtn: false
  }
  componentWillUnmount() {
    const { openModal, hideLoginModal } = this.props
    openModal && hideLoginModal()
  }
  render() {
    const { classes, closeBtn, openModal, hideLoginModal, children } = this.props
    return <Dialog
      fullScreen
      open={openModal}
      onClose={hideLoginModal}
      TransitionComponent={Transition}
    >
      {
        closeBtn && <IconButton color="primary" className={classes.closeBtn} onClick={hideLoginModal} aria-label="Close">
          <CloseIcon />
        </IconButton>
      }
      {
        children
      }
    </Dialog>
  }
}

LoginModal.propTypes = {
  classes: PropTypes.object.isRequired,
}

const mapDispatchToProps = (dispatch) => ({
  hideLoginModal: compose(dispatch, hideLoginModal)
})

const mapStateToProps = (state) => {
  const { loginModal } = state
  return {
    openModal: loginModal
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(LoginModal))