import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { Field, reduxForm } from 'redux-form'
import IconButton from '@material-ui/core/IconButton'
import Grid from '@material-ui/core/Grid'
import withStyles from '@material-ui/core/styles/withStyles'
import SendIcon from '@material-ui/icons/Send'
import { renderTextFieldWithoutError } from '../Form/field'
import styles from './styles'

const ReplyForm = ({ classes, fixed, right, handleSubmit }) => {
  const formClass = classNames([fixed ? classes.formFixed : classes.form])
  return <form className={formClass} onSubmit={handleSubmit}>
    <Grid container justify="space-between" spacing={8} alignItems="flex-start">
      <Grid item xs={right ? 8 : 10}>
        <Field
          name="reply"
          component={renderTextFieldWithoutError}
          placeholder="请输入评论"
          inputProps={{
            'aria-label': 'description',
          }}
        />
      </Grid>
      <Grid item xs={right ? 4 : 2}>
        <IconButton type="submit">
          <SendIcon />
        </IconButton>
        {right}
      </Grid>
    </Grid>
  </form>
}

ReplyForm.propTypes = {
  classes: PropTypes.object.isRequired,
}

function validate(values) {
  const map = {
    reply: '回复内容'
  }
  return ['reply'].reduce((errors, field) => {
    if (!values[field]) {
      errors[field] = `${map[field]} 不能为空`
    }
    return errors
  }, {})
}

const ReplyFormWrapper = reduxForm({
  form: 'replyForm',
  validate
})(ReplyForm)

export default withStyles(styles)(ReplyFormWrapper)