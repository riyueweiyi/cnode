import * as React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import Slide from '@material-ui/core/Slide'
import Dialog from '@material-ui/core/Dialog'
import withStyles from '@material-ui/core/styles/withStyles'
import compose from 'lodash/fp/flowRight'
import styles from './style'
import { hideLoginModal } from '../../actions'
import { IModalType } from '../../reducers/modal'

const Transition: React.SFC<{}> = function (props) {
  return <Slide direction="up" {...props} />
}

interface IModal {
  closeBtn: boolean,
  classes: any
}

interface IStateToProps {
  openModal: IModalType
}

interface IActionToProp {
  hideLoginModal: () => {}
}

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  hideLoginModal: compose(dispatch, hideLoginModal)
})

const mapStateToProps = (state: any): IStateToProps => {
  const { loginModal } = state
  return {
    openModal: loginModal
  }
}

class ModalWrapper extends React.Component<IModal & IStateToProps & IActionToProp, {}> {
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles as any)(ModalWrapper))