import React from "react";
import { useFormikContext } from "formik";
import Button from "./Button";

const SubmitButton = ({ children = "Submit Form" }) => {
  const { isSubmitting } = useFormikContext();
  return (
    <Button type="submit" disabled={isSubmitting} variant="brand">
      {children}
    </Button>
  );
};

export default SubmitButton;
