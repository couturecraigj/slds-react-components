import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import { Formik, Form, useFormikContext } from "formik";
import Layout from "./Layout";
import Input from "./Input";

export default { title: "Input" };

export const dateInput = () => (
  <Layout>
    <Formik onSubmit={console.log} initialValues={{ nothing: "" }}>
      <Form>
        <Input type="date" name="nothing" label="Nothing" />
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  </Layout>
);

const InitialValuesChangeForm = ({
  setInitialValues = (e?: any): any | void => {}
}) => {
  const formik = useFormikContext();
  const onReset = () => {
    setInitialValues({ date: "4.6.2020" });
    formik.resetForm({ values: { nothing: [] } });
  };
  return (
    <Form>
      <Input
        // disabled
        type="date"
        name="date"
        label="Date"
      />
      <button type="submit">Submit</button>
      <button type="button" onClick={onReset}>
        Reset
      </button>
    </Form>
  );
};
const validateDate = Yup.object().shape({
  date: Yup.date().required("Need to enter a date")
});
export const withInitialValuesChange = () => {
  const [initialValues, setInitialValues] = useState({ date: "2020-12-14" });

  return (
    <Layout>
      <Formik
        onSubmit={console.log}
        initialValues={initialValues}
        validationSchema={validateDate}
      >
        <InitialValuesChangeForm setInitialValues={setInitialValues} />
      </Formik>
    </Layout>
  );
};
