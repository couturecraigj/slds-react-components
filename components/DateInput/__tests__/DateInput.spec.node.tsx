import "@testing-library/jest-dom";
import React from "react";
import ReactDOMServer from 'react-dom/server'
import { Formik, Form } from "formik";
import Layout from "../../Layout";
import DateInput from "../DateInput";

const originalError = console.error

beforeAll(() => {
  console.error = (...args) => {
    if (/Warning.*not wrapped in act/.test(args[0])) {
      return
    }
    originalError.call(console, ...args)
  }
})

afterAll(() => {
  console.error = originalError
})
const Wrapper = ({ children, initialValue }: {children: any, initialValue?: string}) => (
  <Layout>
    <Formik onSubmit={console.log} initialValues={{ date: initialValue }}>
      <Form>{children}</Form>
    </Formik>
  </Layout>
);
// test.todo("test initial value");

describe("DateInput", () => {
  jest.useFakeTimers();
  it ('should render', () => {
    const renderedString = ReactDOMServer.renderToString(
      <Wrapper initialValue="">
        <DateInput name="date" label="Date" />
      </Wrapper>
    );
    jest.runAllTimers();
    expect(renderedString).toBeDefined();
  });
});
