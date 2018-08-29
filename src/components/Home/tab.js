import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import Notifications from '@material-ui/icons/Notifications'
import AddIcon from '@material-ui/icons/Add'
import PersonIcon from '@material-ui/icons/Person'
import SwipeableViews from 'react-swipeable-views'
import Typography from '@material-ui/core/Typography'
import { Link } from 'react-router-dom'
import Pixel from '../../utils'
import styles from './styles'

function TabContainer({ children }) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  )
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
}

class FullWidthTabs extends React.Component {
  state = {
    value: 0,
  }

  handleChange = (event, value) => {
    this.setState({ value })
  }

  handleChangeIndex = index => {
    this.setState({ value: index })
  }

  render() {
    const { classes, theme } = this.props
    return (
      <React.Fragment>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="title" color="inherit" className={classes.flex}>
              Home
            </Typography>
            <IconButton color="inherit" component={Link} to="/message" aria-label="Menu">
              <Notifications />
            </IconButton>
            <IconButton
              aria-haspopup="true"
              color="inherit"
              component={Link} to="/user/riyueweiyi"
            >
              <PersonIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Tabs
          value={this.state.value}
          onChange={this.handleChange}
          fullWidth
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="全部" data-value="" />
          <Tab label="精华" data-value="good" />
          <Tab label="分享" data-value="share" />
          <Tab label="问答" data-value="ask" />
          <Tab label="招聘" data-value="job" />
        </Tabs>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
          <TabContainer dir={theme.direction}>
            ss
          </TabContainer>
          <TabContainer dir={theme.direction}>Item Two</TabContainer>
          <TabContainer dir={theme.direction}>Item Three</TabContainer>
          <TabContainer dir={theme.direction}>Item Four</TabContainer>
          <TabContainer dir={theme.direction}>Item Five</TabContainer>
        </SwipeableViews>
        <Button variant="fab" className={classes.fab} component={Link} to="/publish" color="primary" aria-label="Add">
          <AddIcon />
        </Button>
      </React.Fragment>
    )
  }
}

FullWidthTabs.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
}

export default withStyles(styles, { withTheme: true })(FullWidthTabs)