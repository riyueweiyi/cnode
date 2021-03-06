import * as React from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import Typography from '@material-ui/core/Typography'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import styles from './styles'
import Pixel from '../../utils'
import { ITopic, IStyle } from '../../type'
const timeDifference = Pixel.utils.timeDifference

interface IContent {
  detail: ITopic
}
const Content: React.SFC<IContent & IStyle> = ({ detail, classes }) => {
  return <React.Fragment>
    <CardContent className={classes.header}>
      <Typography variant="headline" gutterBottom>
        {detail.title}
      </Typography>
      <Typography className={classes.subheader} variant="body1" gutterBottom>
        <span>
          {detail.good && <sub className={classes.primary}>精华</sub>}
          {detail.top && <sub className={classes.secondary}>置顶</sub>}
        </span>
        {timeDifference(new Date(), new Date(detail.create_at))}
      </Typography>
      <Typography className={classes.descJob} dangerouslySetInnerHTML={{ __html: detail.content }}></Typography>
    </CardContent>
    <CardActions className={classes.cardActions}>
      <p className={classes.visit}>阅读 {detail.visit_count} 回复 {detail.reply_count}</p>
    </CardActions>
  </React.Fragment>
}

export default withStyles(styles)(Content)
