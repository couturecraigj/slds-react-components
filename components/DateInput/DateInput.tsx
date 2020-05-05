import React, { useState, useEffect } from "react";
import { useField } from "formik";
import useCalendar from "./hooks/useCalendar";

const DateInput = ({
  label,
  required = false,
  name = label,
  id = name,
  value: passedValue = "",
  yearsOptions = []
}: {
  label: string;
  required?: boolean;
  name?: string;
  id?: string;
  value?: string;
  yearsOptions?: number[];
}) => {
  const [isOpen, setIsOpen] = useState<boolean>();
  const [field, meta] = useField(name);

  const [
    {
      month: { visible: currentMonth, increment: incrementMonth },
      year: { choose: chooseYear },
      selected,
      weeks,
      today
    },
    moveToDate,
    setDate
  ] = useCalendar(field.value || passedValue);

  useEffect(() => {
    if (selected.ISOValue) {
      const timer = setTimeout(() => field.onChange(selected.ISOValue), 10);
      return () => clearTimeout(timer);
    }
    return () => {};
  }, [selected.ISOValue]);
  return (
    <div
      data-testid="wrapper"
      className={`slds-form-element slds-dropdown-trigger slds-dropdown-trigger_click ${isOpen &&
        `slds-is-open`} ${meta.touched && meta.error ? "slds-has-error" : ""}`}
    >
      <label className="slds-form-element__label" htmlFor={id}>
        {required && (
          <abbr className="slds-required" title="required">
            *{" "}
          </abbr>
        )}
        {label}
      </label>
      <div
        role="combobox"
        className="slds-form-element__control slds-input-has-icon slds-input-has-icon_right"
      >
        <input
          type="text"
          onFocus={() => setIsOpen(true)}
          id={id}
          data-testid="date-input"
          value={selected.value}
          autoComplete="none"
          placeholder=" "
          readOnly
          className="slds-input"
        />
        <button
          className="slds-button slds-button_icon slds-input__icon slds-input__icon_right"
          title="Select a date"
          type="button"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg className="slds-button__icon" aria-hidden="true">
            <use xlinkHref="./icons/utility-sprite/svg/symbols.svg#event"></use>
          </svg>
          <span className="slds-assistive-text">Select a date</span>
        </button>
      </div>
      <div
        data-testid="calendar"
        aria-hidden="false"
        aria-label={`Date picker: ${currentMonth.label}`}
        className="slds-datepicker slds-dropdown slds-dropdown_left"
        role="dialog"
      >
        <div className="slds-datepicker__filter slds-grid">
          <div className="slds-datepicker__filter_month slds-grid slds-grid_align-spread slds-grow">
            <div className="slds-align-middle">
              <button
                className="slds-button slds-button_icon slds-button_icon-container"
                type="button"
                onClick={() => incrementMonth(-1)}
                title="Previous Month"
              >
                <svg className="slds-button__icon" aria-hidden="true">
                  <use xlinkHref="./icons/utility-sprite/svg/symbols.svg#left"></use>
                </svg>
                <span className="slds-assistive-text">Previous Month</span>
              </button>
            </div>
            <h2
              aria-atomic="true"
              aria-live="assertive"
              className="slds-align-middle"
              data-testid="month"
              id="month"
            >
              {currentMonth.label}
            </h2>
            <div className="slds-align-middle">
              <button
                className="slds-button slds-button_icon slds-button_icon-container"
                type="button"
                onClick={() => incrementMonth(1)}
                title="Next Month"
              >
                <svg className="slds-button__icon" aria-hidden="true">
                  <use xlinkHref="./icons/utility-sprite/svg/symbols.svg#right"></use>
                </svg>
                <span className="slds-assistive-text">Next Month</span>
              </button>
            </div>
          </div>
          {yearsOptions.length > 0 && (
            <div className="slds-shrink-none">
              <label className="slds-assistive-text" htmlFor={`${id}-cal`}>
                Pick a Year
              </label>
              <div className="slds-select_container">
                <select
                  className="slds-select"
                  id={`${id}-cal`}
                  onChange={e => chooseYear(+e.target.value)}
                >
                  {yearsOptions.map(option => (
                    <option>{option}</option>
                  ))}
                  <option>2014</option>
                  <option>2015</option>
                  <option>2016</option>
                </select>
              </div>
            </div>
          )}
        </div>
        <table
          aria-labelledby="month"
          aria-multiselectable="true"
          className="slds-datepicker__month"
          role="grid"
        >
          <thead>
            <tr id="weekdays">
              <th id="Sunday" scope="col">
                <abbr title="Sunday">Sun</abbr>
              </th>
              <th id="Monday" scope="col">
                <abbr title="Monday">Mon</abbr>
              </th>
              <th id="Tuesday" scope="col">
                <abbr title="Tuesday">Tue</abbr>
              </th>
              <th id="Wednesday" scope="col">
                <abbr title="Wednesday">Wed</abbr>
              </th>
              <th id="Thursday" scope="col">
                <abbr title="Thursday">Thu</abbr>
              </th>
              <th id="Friday" scope="col">
                <abbr title="Friday">Fri</abbr>
              </th>
              <th id="Saturday" scope="col">
                <abbr title="Saturday">Sat</abbr>
              </th>
            </tr>
          </thead>
          <tbody data-testid="tbody">
            {weeks.map((week: any, index: number) => {
              return (
                <tr key={index}>
                  {week.map((day: any, index: number) => (
                    <td
                      key={index}
                      onClick={() => {
                        setDate(new Date(day.year, day.month, day.day));
                        setIsOpen(false);
                      }}
                      aria-selected={
                        selected.year === day.year &&
                        selected.day === day.day &&
                        selected.month === day.month
                          ? "true"
                          : "false"
                      }
                      role="gridcell"
                      className={
                        day.incrementMonth !== 0
                          ? "slds-disabled-text"
                          : selected.year === day.year &&
                            selected.day === day.day &&
                            selected.month === day.month
                          ? "slds-is-selected"
                          : today.year === day.year &&
                            today.day === day.day &&
                            today.month === day.month
                          ? "slds-is-today"
                          : ""
                      }
                    >
                      <span className="slds-day">{day.day}</span>
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
        <button
          type="button"
          onClick={() => moveToDate(new Date())}
          className="slds-button slds-align_absolute-center slds-text-link"
        >
          Today
        </button>
      </div>
      {meta.touched && meta.error ? (
        <div className="slds-form-element__help" id={`${name}-form-error`}>
          {meta.error}
        </div>
      ) : null}
    </div>
  );
};

export default DateInput;
