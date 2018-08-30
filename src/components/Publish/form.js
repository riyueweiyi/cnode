import React from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import ArrowBack from '@material-ui/icons/ArrowBack'
import TabForm from './tab'
import TitleForm from './title'
import ContentForm from './content'
import styles from './style'

const PublishForm = ({ classes, page, nextPage, previousPage, onSubmit, goBack }) => {
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

PublishForm.propTypes = {
  classes: PropTypes.object.isRequired
}

PublishForm.defaultProps = {
  page: 1,
  nextPage: _ => { },
  previousPage: _ => { },
  goBack: _ => { },
  onSubmit: _ => { }
}

export default withStyles(styles)(PublishForm)