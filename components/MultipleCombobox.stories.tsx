import React, {useEffect, useState} from "react";
import { Formik, Form } from "formik";
import MultipleCombobox from "./MultipleCombobox";
import Layout from "./Layout";

export default { title: "MultipleCombobox" };

export const withChosenValue = () => (
  <Layout>
    <Formik onSubmit={console.log} initialValues={{ nothing: ["try"] }}>
      <Form>
        <MultipleCombobox
          onChange={(...args) => console.log(...args)}
          options={[
            { label: "something", value: "try" },
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

export const withChosenValueAndDelayedOptions = () => {
  const [options, setOptions] = useState([])
  useEffect(() => {
    setTimeout(() => {
      setOptions([
        { label: "something", value: "try" },
        { label: "something else" }
      ])
    }, 300)
  }, [])
  return (
  <Layout>
    <Formik onSubmit={console.log} initialValues={{ nothing: ["try"] }}>
      <Form>
        <MultipleCombobox
          onChange={(...args) => console.log(...args)}
          options={options}
          name="nothing"
          label="Nothing"
        />
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  </Layout>
)};

export const withoutChosenValue = () => (
  <Layout>
    <Formik onSubmit={console.log} initialValues={{ nothing: [] }}>
      <Form>
        <MultipleCombobox
          onChange={console.log}
          options={[
            { label: "something", value: "true" },
            { label: "something else", value: "somethingElse" }
          ]}
          name="nothing"
          label="Nothing"
        />
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  </Layout>
);
