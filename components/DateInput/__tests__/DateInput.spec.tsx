import "@testing-library/jest-dom";
import React from "react";
import { Formik, Form } from "formik";
import Layout from "../../Layout";
import { render, fireEvent, screen } from "@testing-library/react";
import DateInput from "../DateInput";
import {getFormat} from '../parseDate'

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
  let languageGetter;
  beforeEach(() => {
    languageGetter = jest.spyOn(window.navigator, 'language', 'get');
  })
  jest.useFakeTimers();
  it ('should render', () => {
    render(
      <Wrapper initialValue="">
        <DateInput name="date" label="Date" />
      </Wrapper>
    );
    fireEvent.click(screen.getByTestId(/input/i));
    jest.runAllTimers();
    expect(screen.getByTestId("wrapper").classList.contains("slds-is-open"));
  })
  it("should render `DateInput` with initialValue", () => {
    render(
      <Wrapper initialValue="05/01/2020">
        <DateInput name="date" label="Date" />
      </Wrapper>
    );
    const input = screen.getByTestId(/input/i) as HTMLInputElement
    if (input)
    expect(input.value).toEqual('5/1/2020')
    fireEvent.click(input);
    const calendar = screen.getByTestId(/tbody/i);
    expect(Array.from(calendar.childNodes).length).toEqual(6);
  });
  it("should render `DateInput` with initialValue in de", () => {
    languageGetter.mockReturnValue('de')
    getFormat()
    render(
      <Wrapper initialValue="01.05.2020">
        <DateInput name="date" label="Date" />
      </Wrapper>
    );
    const input = screen.getByTestId(/input/i) as HTMLInputElement
    if (input)
    expect(input.value).toEqual('01.05.2020')
    fireEvent.click(input);
    const calendar = screen.getByTestId(/tbody/i);
    expect(Array.from(calendar.childNodes).length).toEqual(6);
  });
});
test.todo('get all the functions working')
