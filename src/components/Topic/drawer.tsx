import * as React from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import Drawer from '@material-ui/core/Drawer'
import Typography from '@material-ui/core/Typography'
import ReplyForm from './form'
import styles from './styles'
import { IAuthor, IReplyForm, IStyle } from '../../type'

interface IDrawer {
  reply: {
    author: IAuthor
  },
  onSubmit: (e: IReplyForm) => void,
  show: boolean,
  onClose: (e: React.MouseEvent) => void
}

const DrawerModal: React.SFC<IDrawer & IStyle> = ({ reply, onSubmit, classes, show, onClose }) => {
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

export default withStyles(styles)(DrawerModal)
