import React, { useState, useEffect } from "react";
import { Formik, Form, useFormikContext } from "formik";
import CheckboxGroup from "./CheckboxGroup";
import Layout from "./Layout";

export default { title: "CheckboxGroup" };

export const withoutAll = () => (
  <Layout>
    <Formik onSubmit={console.log} initialValues={{ nothing: [] }}>
      <Form>
        <CheckboxGroup
          onChange={(...args) => console.log(...args)}
          options={[
            { label: "something", value: true },
            { label: "something else" }
          ]}
          name="nothing"
          label="Nothing"
        />
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  </Layout>
);

export const withAll = () => (
  <Layout>
    <Formik onSubmit={console.log} initialValues={{ nothing: [] }}>
      <Form>
        <CheckboxGroup
          onChange={console.log}
          selectAll
          options={[
            { label: "something", value: true },
            { label: "something else", name: "somethingElse" }
          ]}
          name="nothing"
          label="Nothing"
        />
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  </Layout>
);

const InitialValuesChangeForm = ({setInitialValues = (e?:any): any|void => {}}) => {
  const formik = useFormikContext();
  const onReset = () => {
    setInitialValues({nothing: ['somethingElse']})
    formik.resetForm({values: {nothing: ['somethingElse']}});
  };
  return (
    <Form>
      <CheckboxGroup
        // disabled
        onChange={console.log}
        selectAll
        options={[
          { label: "something", value: true},
          { label: "something else", name: "somethingElse" }
        ]}
        name="nothing"
        label="Nothing"
      />
      <button type="submit">Submit</button>
      <button type="button" onClick={onReset}>
        Reset
      </button>
    </Form>
  );
};

export const withInitialValuesChange = () => {

  const [initialValues, setInitialValues] = useState({ nothing: [] });
  
  return (
    <Layout>
      <Formik
        onSubmit={console.log}
        initialValues={initialValues}
      >
        <InitialValuesChangeForm setInitialValues={setInitialValues} />
      </Formik>
    </Layout>
  );
};
