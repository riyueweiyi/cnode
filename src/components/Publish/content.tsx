import * as React from 'react'
import { Field, reduxForm, InjectedFormProps } from 'redux-form'
import Button from '@material-ui/core/Button'
import withStyles from '@material-ui/core/styles/withStyles'
import ArrowForward from '@material-ui/icons/ArrowForward'
import ArrowBack from '@material-ui/icons/ArrowBack'
import { renderTextField } from '../Form/field'
import styles from './style'
import validate from './validate'
import { PublicTopic, IStyle } from '../../type'

interface IContentForm {
  previousPage: () => void
}
const ContentForm: React.SFC<IContentForm & IStyle & InjectedFormProps<PublicTopic>> = ({ classes, handleSubmit, previousPage }) => {
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
        <ArrowBack />
        返回
      </Button>
      <Button
        type="submit"
        color="primary"
      >
        提交
        <ArrowForward />
      </Button>
    </div>
  </form>
}

const Form = withStyles(styles)(ContentForm)
const ContentFormWrapper = reduxForm<PublicTopic, IContentForm>({
  form: 'publishForm',
  destroyOnUnmount: false,        // <------ preserve form data
  forceUnregisterOnUnmount: true,
  validate
})(Form as any)

export default ContentFormWrapper