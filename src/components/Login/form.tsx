import * as React from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import Button from '@material-ui/core/Button'
import ArrowForward from '@material-ui/icons/ArrowForward'
import FormControl from '@material-ui/core/FormControl'
import CircularProgress from '@material-ui/core/CircularProgress'
import withStyles from '@material-ui/core/styles/withStyles'
import Typography from '@material-ui/core/Typography'
import styles from './style'
import { renderTextField } from '../Form/field'

interface ILogin {
  classes: any,
  handleSubmit(e: React.FormEvent<HTMLFormElement>): void,
  submitting: boolean
}
const Login: React.SFC<ILogin> = ({ classes, handleSubmit = _ => {}, submitting = false }: ILogin) => {
  return <main className={classes.layout}>
    <Typography
      variant="headline"
      color="primary"
      align="center"
      gutterBottom
      paragraph
    >
      Sign in
    </Typography>
    <form className={classes.form} onSubmit={handleSubmit}>
      <Field
        name="accesstoken"
        component={renderTextField}
        label="accesstoken"
        autoFocus
      />
      <FormControl className={classes.wrapper} margin="normal">
        <Button
          type="submit"
          color="primary"
        >
          登录 <ArrowForward />
        </Button>
        {submitting && <CircularProgress size={24} className={classes.buttonProgress} />}
      </FormControl>
    </form>
  </main>
}

function validate(values: { [x: string]: any; }) {
  return ['accesstoken'].reduce((errors, field) => {
    if (!values[field]) {
      errors[field] = `${field} 不能为空`
    }
    return errors
  }, {} as any)
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
}

const LoginForm = reduxForm({
  form: 'loginForm',
  validate
})(Login as any)

export default withStyles(styles as any)(LoginForm as any)