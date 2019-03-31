import * as React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import Pixel from '../../utils'
import { CardItemStyle } from './styles'
import { TabType, ITopic, IStyle } from '../../type'

const tab: TabType = {
  'good': '精华',
  'share': '分享',
  'ask': '问答',
  'job': '招聘'
}
const timeDifference: Function = Pixel.utils.timeDifference

interface ICardItem extends IStyle {
  onClick(e: ITopic): void,
  item: ITopic
}

const CardItem: React.SFC<ICardItem> = ({ classes, onClick, item }) => {
  return <Card onClick={_ => onClick(item)} className={classes.card}>
    <CardHeader
      avatar={
        <Avatar aria-label="Recipe" src={item.author.avatar_url} />
      }
      action={
        <div className={classes.tag}>
          <Typography className={classes.tab} component="span">{tab[item.tab]}</Typography>
          {item.good && <Typography color="secondary" component="span">精华</Typography>}
          {item.top && <Typography color="primary" component="span">置顶</Typography>}
        </div>
      }
      title={item.author.loginname}
      subheader={timeDifference(new Date(), new Date(item.create_at))}
    />
    <CardContent className={classes.cardContent}>
      <Typography variant="subheading" gutterBottom>{item.title}</Typography>
    </CardContent>
    <CardActions className={classes.actions}>
      <Typography variant="caption">{item.visit_count} 浏览 · {item.reply_count} 评论</Typography>
    </CardActions>
  </Card>
}

export default withStyles(CardItemStyle)(CardItem)