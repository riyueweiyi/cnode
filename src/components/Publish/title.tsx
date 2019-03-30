import * as React from 'react'
import { Field, reduxForm, InjectedFormProps } from 'redux-form'
import Button from '@material-ui/core/Button'
import withStyles from '@material-ui/core/styles/withStyles'
import { renderTextField } from '../Form/field'
import ArrowForward from '@material-ui/icons/ArrowForward'
import ArrowBack from '@material-ui/icons/ArrowBack'
import validate from './validate'
import styles from './style'
import { PublicTopic } from '../../type'

interface ITitleForm {
  previousPage: () => void
}

const TitleForm: React.SFC<ITitleForm & { classes: any } & InjectedFormProps<PublicTopic>> = ({ classes, handleSubmit, previousPage }) => {
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

const Form = withStyles(styles as any)(TitleForm as any)
const TitleFormWrapper = reduxForm<PublicTopic, ITitleForm>({
  form: 'publishForm',
  destroyOnUnmount: false,        // <------ preserve form data
  forceUnregisterOnUnmount: true,
  validate
})(Form as any)

export default TitleFormWrapper