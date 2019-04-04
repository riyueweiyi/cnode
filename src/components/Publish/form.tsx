import * as React from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import ArrowBack from '@material-ui/icons/ArrowBack'
import TabForm from './tab'
import TitleForm from './title'
import ContentForm from './content'
import styles from './style'
import { PublicTopic, IStyle } from '../../type'

interface IPublishForm {
  page: number,
  nextPage: () => void,
  previousPage: () => void,
  goBack: () => void,
  onSubmit: (e: PublicTopic) => void
}

const PublishForm: React.SFC<IPublishForm & IStyle> = ({ classes, page, nextPage, previousPage, onSubmit, goBack }) => {
  return <React.Fragment>
    <IconButton color="primary" className={classes.backBtn} onClick={goBack} aria-label="Close">
      <ArrowBack />
    </IconButton>
    <main className={classes.layout}>
      <Typography
        variant="headline"
        color="primary"
        align="center"
        gutterBottom
        paragraph
      >
        发帖
      </Typography>
      {page === 1 && <TabForm onSubmit={nextPage} />}
      {page === 2 && <TitleForm previousPage={previousPage} onSubmit={nextPage} />}
      {page === 3 && <ContentForm previousPage={previousPage} onSubmit={onSubmit} />}
    </main>
  </React.Fragment>
}

export default withStyles(styles)(PublishForm)