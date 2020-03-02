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

const options = [
  {
    label: "Only Maintenance events within date range",
    name: "onlyIncludeMXWithinDateRange",
    value: true
  },
  {
    label: "Search Aircraft that are missing Service Centers",
    name: "searchMissingServiceCenter",
    value: false
  },
  {
    label:
      "Search within so many miles of My Location or the designated Service Center",
    name: "searchDistance",
    value: false
  },
  {
    label: "Exclude Maintenance events associated with opportunities",
    name: "excludeMXAssociatedWithOpptys",
    value: true
  },
  {
    label: "Show only Maintenance events that are 0 hours",
    name: "showOnlyMXThatAreZeroHours",
    value: false
  },
  {
    label: "Exclude Deferred Maintenance",
    name: "excludeDeferredMX",
    value: true
  },
  { label: "Search ALL Maintenance Records", name: "searchAllServiceMXRecords", value: false },
  { label: "Exclude fleet", name: "excludeFleet", value: true },
  {
    label:
      "Remember this query incase I reload the page (experimental)",
    name: "rememberMyPreviousSearch",
    value: false
  // },
  // {
  //   label: "My internet connection is slow (experimental)",
  //   name: "slowConnection",
  //   value: false
  }
];

const InitialValuesChangeForm = ({setInitialValues = (e?:any): any|void => {}}) => {
  const formik = useFormikContext();
  const onReset = () => {
    setInitialValues({nothing: []})
    formik.resetForm({values: {nothing: []}});
  };
  return (
    <Form>
      <CheckboxGroup
        // disabled
        onChange={console.log}
        selectAll
        options={options}
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
