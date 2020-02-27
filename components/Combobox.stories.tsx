import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import Combobox from "./Combobox";
import Layout from "./Layout";

export default { title: "Combobox" };

export const withoutChosen = () => (
  <Layout>
    <Formik onSubmit={console.log} initialValues={{ nothing: '' }}>
      <Form>
      <Combobox
        onChange={(...args) => console.log(...args)}
        options={[{ label: "something", value: 'true' }, { label: "something else" }]}
        name="nothing"
        label="Nothing"
      />
      <button type="submit">Submit</button>
      </Form>
    </Formik>
    
  </Layout>
);

export const withChosenDelayedOptions = () => {
  const [options, setOptions] = useState([])
  useEffect(() => {
    setTimeout(() => {
      setOptions([{ label: "something", value: 'true' }, { label: "something else" }])
    }, 300)
  }, [])
  return (
  <Layout>
    <Formik onSubmit={console.log} initialValues={{ nothing: 'true' }}>
      <Form>
      <Combobox
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

export const withChosen = () => (
  <Layout>
    <Formik onSubmit={console.log} initialValues={{ nothing: 'true' }}>
      <Form>
      <Combobox
        onChange={(...args) => console.log(...args)}
        options={[{ label: "something", value: 'true' }, { label: "something else" }]}
        name="nothing"
        label="Nothing"
      />
      <button type="submit">Submit</button>
      </Form>
    </Formik>
    
  </Layout>
);
