import React from 'react'
import { Field, reduxForm } from 'redux-form'
import Button from '@material-ui/core/Button'
import PropTypes from 'prop-types'
import withStyles from '@material-ui/core/styles/withStyles'
import { renderTextField } from '../Form/field'
import ArrowForward from '@material-ui/icons/ArrowForward'
import ArrowBack from '@material-ui/icons/ArrowBack'
import validate from './validate'
import styles from './style'

const TitleForm = ({ classes, handleSubmit, previousPage }) => {
  return <form onSubmit={handleSubmit}>
    <Field
      name="title"
      component={renderTextField}
      label="标题"
      placeholder="标题不少于10个字"
      autoFocus
    />
    <div className={classes.wrapper}>
      <Button
        type="button"
        color="secondary"
        onClick={previousPage}
      >
        <ArrowBack/>
        返回
      </Button>
      <Button
        type="submit"
        color="primary"
      >
        下一步
        <ArrowForward/>
      </Button>
    </div>
  </form>
}

TitleForm.propTypes = {
  classes: PropTypes.object.isRequired,
}

const TitleFormWrapper = reduxForm({
  form: 'publishForm',
  destroyOnUnmount: false,        // <------ preserve form data
  forceUnregisterOnUnmount: true,
  validate
})(TitleForm)

export default withStyles(styles)(TitleFormWrapper)