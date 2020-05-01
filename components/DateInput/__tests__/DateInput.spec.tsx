import "@testing-library/jest-dom";
import React from "react";
import { Formik, Form } from "formik";
import Layout from "../../Layout";
import { render, fireEvent, screen } from "@testing-library/react";
import DateInput from "../DateInput";

// const originalError = console.error
// beforeAll(() => {
//   console.error = (...args) => {
//     if (/Warning.*not wrapped in act/.test(args[0])) {
//       return
//     }
//     originalError.call(console, ...args)
//   }
// })

// afterAll(() => {
//   console.error = originalError
// })
// const Wrapper = ({ children, initialValue }: {children: any, initialValue?: string}) => (
//   <Layout>
//     <Formik onSubmit={console.log} initialValues={{ date: initialValue }}>
//       <Form>{children}</Form>
//     </Formik>
//   </Layout>
// );
// test.todo("test initial value");

// test("render `DateInput`", () => {
//   render(
//     <Wrapper initialValue="">
//       <DateInput name="date" label="Date" />
//     </Wrapper>
//   );
//   fireEvent.click(screen.getByTestId(/input/i));
//   expect(screen.getByTestId("wrapper").classList.contains("slds-is-open"));
// });
// test("render `DateInput` with initialValue", () => {
//   render(
//     <Wrapper initialValue="01-02-2020">
//       <DateInput name="date" label="Date" />
//     </Wrapper>
//   );
//   const input = screen.getByTestId(/input/i)
//   expect(input.value).toEqual('1/2/2020')
//   fireEvent.click(input);
//   const calendar = screen.getByTestId(/tbody/i);
//   expect(Array.from(calendar.childNodes).length).toEqual(5);

// });
test.todo('get all the functions working')
