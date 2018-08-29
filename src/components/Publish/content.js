import React from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import Button from '@material-ui/core/Button'
import withStyles from '@material-ui/core/styles/withStyles'
import ArrowForward from '@material-ui/icons/ArrowForward'
import ArrowBack from '@material-ui/icons/ArrowBack'
import { renderTextField } from '../Form/field'
import styles from './style'
import validate from './validate'

const ContentForm = ({ classes, handleSubmit, previousPage }) => {
  return <form onSubmit={handleSubmit}>
    <Field
      name="content"
      component={renderTextField}
      label="主题内容"
      multiline={true}
      rows={5}
      placeholder="请输入主题内容"
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
        提交
        <ArrowForward/>
      </Button>
    </div>
  </form>
}

ContentForm.propTypes = {
  classes: PropTypes.object.isRequired,
}

const ContentFormWrapper = reduxForm({
  form: 'publishForm',
  destroyOnUnmount: false,        // <------ preserve form data
  forceUnregisterOnUnmount: true,
  validate
})(ContentForm)

export default withStyles(styles)(ContentFormWrapper)