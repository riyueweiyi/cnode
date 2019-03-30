import * as React from 'react'
import FormHelperText from '@material-ui/core/FormHelperText'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'

interface IElement {
  input: HTMLFormElement,
  label: string,
  meta: any,
  children?: React.ReactNode,
  [k: string]: any
}

const createFormField = (Component: React.ComponentType, showFormHeplerText: boolean) => ({ input, label, meta: { touched, error }, children, ...custom }: IElement) => {
  const hasError = Boolean(touched && error)
  return <FormControl error={hasError} fullWidth>
    {label && <InputLabel htmlFor={input.name}>{label}</InputLabel>}
    <Component
      {...input}
      {...custom}
    >
      {children}
    </Component>
    {showFormHeplerText && <FormHelperText id="name-error-text">{touched && error}</FormHelperText>}
  </FormControl>
}

const createFormSelectField = (showSelectFormHelperText: boolean) => createFormField(Select, showSelectFormHelperText)
const createFormTextField = (showTextFormHelperText: boolean) => createFormField(Input, showTextFormHelperText)
export const renderSelectField = createFormSelectField(true)
export const renderSelectFieldWithoutError = createFormSelectField(false)
export const renderTextField = createFormTextField(true)
export const renderTextFieldWithoutError = createFormTextField(false)