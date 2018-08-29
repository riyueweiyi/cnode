import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import ArrowBack from '@material-ui/icons/ArrowBack'
import compose from 'lodash/fp/flowRight'
import TabForm from './tab'
import TitleForm from './title'
import ContentForm from './content'
import styles from './style'
import { publish } from '../../actions'

class Publish extends Component {
  state = {
    page: 1
  }
  onSubmit = ({ tab, title, content }) => {
    const { publish, accesstoken, history } = this.props
    publish({
      accesstoken,
      tab,
      title,
      content
    }, (res) => {
      res.success && history.replace('/')
    })
  }
  nextPage = () => {
    this.changePage(1)
  }
  previousPage = () => {
    this.changePage(-1)
  }
  changePage = (step) => {
    this.setState({ page: this.state.page + step })
  }
  goBack = () => {
    this.props.history.go(-1)
  }
  render() {
    const { classes } = this.props
    const { page } = this.state
    return <React.Fragment>
      <IconButton color="primary" className={classes.backBtn} onClick={this.goBack} aria-label="Close">
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
        {page === 1 && <TabForm onSubmit={this.nextPage} />}
        {page === 2 && <TitleForm previousPage={this.previousPage} onSubmit={this.nextPage} />}
        {page === 3 && <ContentForm previousPage={this.previousPage} onSubmit={this.onSubmit} />}
      </main>
    </React.Fragment>
  }
}

Publish.propTypes = {
  classes: PropTypes.object.isRequired,
}

const mapDispatchToProps = (dispatch) => ({
  publish: compose(dispatch, publish)
})

const mapStateToProps = (state) => {
  const { userInfo: { accesstoken } } = state
  return {
    accesstoken
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Publish))