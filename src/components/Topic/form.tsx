import * as React from 'react'
import classNames from 'classnames'
import { Field, reduxForm, InjectedFormProps } from 'redux-form'
import IconButton from '@material-ui/core/IconButton'
import Grid from '@material-ui/core/Grid'
import withStyles from '@material-ui/core/styles/withStyles'
import SendIcon from '@material-ui/icons/Send'
import { renderTextFieldWithoutError } from '../Form/field'
import styles from './styles'
import { IReplyForm, IStyle } from '../../type'
interface IProps {
  fixed?: boolean,
  right?: React.ReactNode
}

const ReplyForm: React.SFC<IProps & IStyle & InjectedFormProps<IReplyForm>> = ({ classes, fixed, right, handleSubmit }) => {
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

function validate(values: IReplyForm) {
  const map: IReplyForm = {
    reply: '回复内容'
  }
  return ['reply'].reduce((errors, field) => {
    if (!values[field]) {
      errors[field] = `${map[field]} 不能为空`
    }
    return errors
  }, {} as any)
}
const Form = withStyles(styles)(ReplyForm)
const ReplyFormWrapper = reduxForm<IReplyForm, IProps>({
  form: 'replyForm',
  validate
})(Form)

export default ReplyFormWrapper