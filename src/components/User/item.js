import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import ListItem from '@material-ui/core/ListItem'
import Avatar from '@material-ui/core/Avatar'
import Divider from '@material-ui/core/Divider'
import ListItemText from '@material-ui/core/ListItemText'
import Typography from '@material-ui/core/Typography'
import styles from './styles'
import Pixel from '../../utils'
const timeDifference = Pixel.utils.timeDifference

const Item = function ({ topic, onClick, classes }) {
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


Item.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Item)