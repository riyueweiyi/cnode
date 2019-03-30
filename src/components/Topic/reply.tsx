import * as React from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import IconButton from '@material-ui/core/IconButton'
import ThumbUpIcon from '@material-ui/icons/ThumbUp'
import styles from './styles'
import { IReply } from '../../type'

interface IReplyItem {
  item: IReply,
  classes: any,
  replyItemClickHandle: (e: IReply) => void,
  upClickHandle: (e: IReply) => void,
  avatarClickHandle: (e: string) => void
}

const ReplyItem: React.SFC<IReplyItem> = ({ item, classes, replyItemClickHandle, upClickHandle, avatarClickHandle }) => {
  return <ListItem
    className={classes.listItem}
    button
    onClick={_ => replyItemClickHandle(item)}
  >
    <Avatar
      src={item.author.avatar_url}
      onClick={e => {
        e.stopPropagation()
        avatarClickHandle(item.author.loginname)
        }
      }
    />
    <ListItemText
      primary={item.author.loginname}
      secondary={
        <span dangerouslySetInnerHTML={{ __html: item.content }}></span>
      }
    />
    <ListItemSecondaryAction>
      <IconButton aria-label="Up" onClick={_ => upClickHandle(item)} color={item.is_uped ? 'secondary' : 'default'} className={classes.ups}>
        <ThumbUpIcon className={classes.upsIcon} /> {item.ups.length ? item.ups.length : ''}
      </IconButton>
    </ListItemSecondaryAction>
  </ListItem>
}

ReplyItem.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles as any)(ReplyItem)
