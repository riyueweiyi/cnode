import React from 'react'
import FormHelperText from '@material-ui/core/FormHelperText'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'

const createFormField = (Component, showFormHeplerText) => ({ input, label, meta: { touched, error }, children, ...custom }) => {
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

const createFormSelectField = showSelectFormHelperText => createFormField(Select, showSelectFormHelperText)
const createFormTextField = showTextFormHelperText => createFormField(Input, showTextFormHelperText)
export const renderSelectField = createFormSelectField(true)
export const renderSelectFieldWithoutError = createFormSelectField(false)
export const renderTextField = createFormTextField(true)
export const renderTextFieldWithoutError = createFormTextField(false)