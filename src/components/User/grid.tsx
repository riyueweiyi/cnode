import * as React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import FolderIcon from '@material-ui/icons/Folder'
import EmailIcon from '@material-ui/icons/Email'
import styles from './styles'
import { IStyle } from '../../type';

const GridWrapper: React.SFC<IStyle> = function ({ classes }) {
  return  <Grid container spacing={24} className={classes.marginNomarl}>
  <Grid
    item
    container
    direction="row"
    justify="center"
    alignItems="center"
    xs={6}
  >
    <Button fullWidth className={classes.button}>
      <FolderIcon color="primary" /> 我的收藏
    </Button>
  </Grid>
  <Grid
    item
    container
    direction="row"
    justify="center"
    alignItems="center"
    xs={6}
  >
    <Button fullWidth className={classes.button}>
      <EmailIcon color="secondary" /> 消息中心
    </Button>
  </Grid>
</Grid>
}


GridWrapper.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles as any)(GridWrapper)