import "@testing-library/jest-dom";
import React from "react";
import { Formik, Form } from "formik";
import Layout from "../../Layout";
import { render, fireEvent, screen } from "@testing-library/react";
import DateInput from "../DateInput";
import { getFormat } from "../parseDate";

const originalError = console.error;

beforeAll(() => {
  console.error = (...args) => {
    if (/Warning.*not wrapped in act/.test(args[0])) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});
const Wrapper = ({
  children,
  initialValue
}: {
  children: any;
  initialValue?: string;
}) => (
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
    languageGetter = jest.spyOn(window.navigator, "language", "get");
  });
  jest.useFakeTimers();
  it("should render", () => {
    render(
      <Wrapper initialValue="">
        <DateInput name="date" label="Date" />
      </Wrapper>
    );
    fireEvent.click(screen.getByTestId(/date-input/i));
    jest.runAllTimers();
    expect(screen.getByTestId("wrapper").classList.contains("slds-is-open"));
  });
  it("should render `DateInput` with initialValue", () => {
    render(
      <Wrapper initialValue="05/01/2020">
        <DateInput name="date" label="Date" />
      </Wrapper>
    );
    const input = screen.getByTestId(/date-input/i) as HTMLInputElement;
    if (input) expect(input.value).toEqual("5/1/2020");
    fireEvent.click(input);
    const calendar = screen.getByTestId(/tbody/i);
    expect(Array.from(calendar.childNodes).length).toEqual(6);
  });
  it("should render `DateInput` with initialValue in de", () => {
    languageGetter.mockReturnValue("de");
    getFormat();
    render(
      <Wrapper initialValue="2020-05-01">
        <DateInput name="date" label="Date" />
      </Wrapper>
    );
    const input = screen.getByTestId(/date-input/i) as HTMLInputElement;
    if (input) expect(input.value).toEqual("01.05.2020");
    fireEvent.click(input);
    const calendar = screen.getByTestId(/tbody/i);
    const month = screen.getByTestId(/month/i);
    expect(month.innerHTML).toEqual("May");
    expect(Array.from(calendar.childNodes).length).toEqual(6);
  });
  it("should render the date when passed ISO style date", () => {
    languageGetter.mockReturnValue("en-US");
    getFormat();
    render(
      <Wrapper initialValue="2020-05-04">
        <DateInput name="date" label="Date" />
      </Wrapper>
    );
    const input = screen.getByTestId(/date-input/i) as HTMLInputElement;
    expect(input.value).toEqual("5/4/2020");
  });
  it("should render the current month for en-US", () => {
    languageGetter.mockReturnValue("en-US");
    getFormat();
    render(
      <Wrapper initialValue="2020-05-04">
        <DateInput name="date" label="Date" />
      </Wrapper>
    );
    const input = screen.getByTestId(/month/i);
    expect(input.innerHTML).toEqual("May");
  });
  it("should render the current month for de-DE", () => {
    languageGetter.mockReturnValue("de-DE");
    getFormat();
    render(
      <Wrapper initialValue="2020-05-04">
        <DateInput name="date" label="Date" />
      </Wrapper>
    );
    const input = screen.getByTestId(/month/i);
    expect(input.innerHTML).toEqual("May");
  });
  it("should render the correct amount of weeks on 31.05.2020 for de-DE", () => {
    languageGetter.mockReturnValue("de-DE");
    getFormat();
    render(
      <Wrapper initialValue="2020-05-31">
        <DateInput name="date" label="Date" />
      </Wrapper>
    );
    const calendar = screen.getByTestId(/tbody/i);
    expect(Array.from(calendar.childNodes).length).toEqual(6);
  });
});
test.todo("get all the functions working");
