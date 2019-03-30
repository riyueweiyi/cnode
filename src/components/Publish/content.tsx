import * as React from 'react'
import { Field, reduxForm } from 'redux-form'
import Button from '@material-ui/core/Button'
import withStyles from '@material-ui/core/styles/withStyles'
import ArrowForward from '@material-ui/icons/ArrowForward'
import ArrowBack from '@material-ui/icons/ArrowBack'
import { renderTextField } from '../Form/field'
import styles from './style'
import validate from './validate'

interface IContentForm {
  classes: any,
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void,
  previousPage: (e: React.MouseEvent) => void
}
const ContentForm: React.SFC<IContentForm> = ({ classes, handleSubmit, previousPage }) => {
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

const ContentFormWrapper = reduxForm({
  form: 'publishForm',
  destroyOnUnmount: false,        // <------ preserve form data
  forceUnregisterOnUnmount: true,
  validate
})(ContentForm as any)

export default withStyles(styles as any)(ContentFormWrapper as any)