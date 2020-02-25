import React from "react";
import { useFormikContext } from "formik";
import Button from "./Button";
const ResetButton = ({ children = "Reset Form" }) => {
  const { resetForm, isSubmitting } = useFormikContext();
  return (
    <Button
      variant="destructive"
      disabled={isSubmitting}
      onClick={() => resetForm()}
    >
      {children}
    </Button>
  );
};

export default ResetButton;
