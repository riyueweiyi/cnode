import * as React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Avatar from '@material-ui/core/Avatar'
import IconButton from '@material-ui/core/IconButton'
import ArrowBack from '@material-ui/icons/ArrowBack'
import styles from './styles'
import { IAuthor, IStyle } from '../../type'

interface IUser extends IAuthor {
  score: number
}
interface IAvatarWrapper {
  goBack: (e: React.MouseEvent) => void,
  user: IUser
}

const AvatarWrapper: React.SFC<IAvatarWrapper & IStyle> = function ({ user, classes, goBack }) {
  return <div className={classes.bg}>
    <IconButton color="inherit" className={classes.backBtn} onClick={goBack} aria-label="Close">
      <ArrowBack />
    </IconButton>
    <div className={classes.avatarWrapper}>
      <div>
        <Typography variant="headline" className={classes.loginname} gutterBottom>
          {user.loginname}
        </Typography>
        <Typography variant="caption" className={classes.score} gutterBottom align="left">
          积分: {user.score}
        </Typography>
      </div>
      <Avatar srcSet={user.avatar_url} className={classes.avatar} />
    </div>
  </div>
}

export default withStyles(styles)(AvatarWrapper)