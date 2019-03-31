import * as React from 'react'
import { withStyles } from '@material-ui/core/styles'
import ListItem from '@material-ui/core/ListItem'
import Avatar from '@material-ui/core/Avatar'
import Divider from '@material-ui/core/Divider'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'
import styles from './styles'
import Pixel from '../../utils'
import { IUserTopic, IStyle } from '../../type'
const timeDifference = Pixel.utils.timeDifference

interface IItem {
  onClick: (e: React.MouseEvent) => void,
  topic: IUserTopic
}

const Item: React.SFC<IItem & IStyle> = function ({ topic, onClick, classes }) {
  return <React.Fragment>
    <ListItem
      button
      onClick={onClick}
    >
      <Avatar src={topic.author.avatar_url}></Avatar>
      <ListItemText
        primary={
          <div>
            <Typography variant="subheading" align="justify" gutterBottom>
              {topic.author.loginname}<sub className={classes.time}>{timeDifference(new Date(), new Date(topic.last_reply_at))}</sub>
            </Typography>
            <Typography gutterBottom className={classes.topicTitle}>
              {topic.title}
            </Typography>
          </div>
        }
      />
    </ListItem>
    <li>
      <Divider inset />
    </li>
  </React.Fragment>
}

export default withStyles(styles as any)(Item)