import React from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import Drawer from '@material-ui/core/Drawer'
import Typography from '@material-ui/core/Typography'
import ReplyForm from './form'
import styles from './styles'

const DrawerModal = ({ reply, onSubmit, classes, show, onClose }) => {
  return <Drawer
    anchor="bottom"
    open={show}
    onClose={onClose}
  >
    <Typography className={classes.drawerTitle} color="primary" variant="subheading" gutterBottom noWrap>
      回复 {reply.author.loginname} 的评论 :
    </Typography>
    <ReplyForm onSubmit={onSubmit} />
  </Drawer>
}

DrawerModal.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(DrawerModal)
