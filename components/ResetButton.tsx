import React from 'react'
import {useFormikContext} from 'formik'
import Button from './Button'
const ResetButton = () => {
  const {resetForm} = useFormikContext();
  return <Button variant="destructive" onClick={() => resetForm()}>Reset Form</Button>
}

export default ResetButton;