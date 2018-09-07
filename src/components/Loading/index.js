import React from 'react'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import LinearProgress from '@material-ui/core/LinearProgress'
import Typography from '@material-ui/core/Typography'
import styles from './styles'

const Loading = ({ text = 'Loading...', classes }) => {
  return <React.Fragment>
    <LinearProgress />
    <Typography
      variant="headline"
      color="primary"
      align="center"
      gutterBottom
      paragraph
      className={classes.wrapper}
    >
      {text}
    </Typography>
  </React.Fragment>
}

Loading.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(Loading)
