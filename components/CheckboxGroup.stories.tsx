import React from "react";
import { Formik, Form } from "formik";
import CheckboxGroup from "./CheckboxGroup";
import Layout from "./Layout";

export default { title: "CheckboxGroup" };

export const withoutAll = () => (
  <Layout>
    <Formik onSubmit={console.log} initialValues={{ nothing: [] }}>
      <Form>
      <CheckboxGroup
        onChange={(...args) => console.log(...args)}
        options={[{ label: "something", value: true }, { label: "something else" }]}
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
        options={[{ label: "something", value: true }, { label: "something else", name: 'somethingElse' }]}
        name="nothing"
        label="Nothing"
      />
      <button type="submit">Submit</button>
      </Form>
    </Formik>
  </Layout>
);
