import React from 'react'
import { useFormikContext } from "formik";
import Button from "./Button";

const SubmitButton = () => {
  const { isSubmitting } = useFormikContext();
  return (
    <Button type="submit" disabled={isSubmitting} variant="brand">
      Submit Form
    </Button>
  );
};

export default SubmitButton;
