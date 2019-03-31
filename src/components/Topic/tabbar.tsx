import * as React from 'react'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import ArrowBack from '@material-ui/icons/ArrowBack'
import Typography from '@material-ui/core/Typography'
import AppBar from '@material-ui/core/AppBar'
import Avatar from '@material-ui/core/Avatar'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import styles from './styles'
import { IAuthor, IStyle } from '../../type'

interface ITabbar {
  goBack: (e: React.MouseEvent) => void,
  author: IAuthor,
  onClick: (e: string) => void
}

const Tabbar: React.SFC<ITabbar & IStyle> = ({ goBack, author, classes, onClick }) => {
  return <AppBar position="fixed">
    <Toolbar>
      <IconButton color="inherit" onClick={goBack} aria-label="Back">
        <ArrowBack />
      </IconButton>
      <div onClick={_ => onClick(author.loginname)} className={classes.avatarWrapper}>
        <Avatar src={author.avatar_url}></Avatar>
        <Typography color="inherit" variant="subheading" className={classes.loginname} noWrap>
          {author.loginname}
        </Typography>
      </div>
    </Toolbar>
  </AppBar>
}

Tabbar.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles as any)(Tabbar)
