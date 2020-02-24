import React from "react";
import { Formik, Form } from "formik";
import CheckboxGroup from "./CheckboxGroup";
import Layout from "./Layout";

export default { title: "CheckboxGroup" };

export const withLayout = () => (
  <Layout>
    <Formik onSubmit={console.log} initialValues={{ nothing: [] }}>
      <CheckboxGroup
        options={[{ label: "something", value: true }, { label: "something else" }]}
        name="nothing"
        label="Nothing"
      />
    </Formik>
  </Layout>
);
