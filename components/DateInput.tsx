import React, { useState, useEffect } from "react";
import { useField } from "formik";

const getFirstDay = (date: Date) => {
  const selectedDate = new Date(date);
  selectedDate.setDate(1);
  // 0 is Sunday 6 is Saturday
  return selectedDate.getDay();
};

const getTotalDaysInMonth = (date: Date, add = 1) => {
  const selectedDate = new Date(date);
  selectedDate.setMonth(selectedDate.getMonth() + add);
  selectedDate.setDate(0);
  return selectedDate.getDate();
};

const getDays = (
  previousMonthLength: number,
  visibleMonthStartDay: number,
  visibleMonthLength: number,
  visibleMonthYear: number,
  visibleMonth: number
) => {
  const result = [];
  const previousMonthStartDay =
    previousMonthLength - (visibleMonthStartDay - 1);
  for (let i = previousMonthStartDay; i <= previousMonthLength; i++) {
    result.push({
      day: i,
      incrementMonth: -1,

      year: visibleMonth === 0 ? visibleMonthYear - 1 : visibleMonthYear
    });
  }
  for (let i = 1; i <= visibleMonthLength; i++) {
    result.push({
      day: i,
      incrementMonth: 0,
      year: visibleMonthYear,
      month: visibleMonth
    });
  }
  if (result.length % 7) {
    const tailingDays = 7 - (result.length % 7);
    for (let i = 1; i <= tailingDays; i++) {
      result.push({
        day: i,
        incrementMonth: +1,

        year: visibleMonth === 11 ? visibleMonthYear + 1 : visibleMonthYear
      });
    }
  }
  return result;
};
const getWeeks = (days: any[]) => {
  const result = [];
  let dayIndex = 0;
  let week = [];
  for (let day of days) {
    week.push(day);
    if (dayIndex === 6) {
      result.push([...week]);
      week = [];
      dayIndex = 0;
      continue;
    }
    dayIndex++;
  }
  return result;
};
const getMonthLabel = (month: number) => {
  const date = new Date(2020, month, 3);
  return date.toLocaleDateString(undefined, { month: "long" });
};

const useCalendar = (date?: any): any => {
  const todaysDate = new Date();
  const [selectedDate, setSelectedDate] = useState(date && new Date(date));
  const [visibleDate, setVisibleDate] = useState(new Date(date || Date.now()));
  const [previousMonthLength, setPreviousMonthLength] = useState();
  const [visibleMonthYear, setVisibleMonthYear] = useState();
  const [visibleMonthLength, setVisibleMonthLength] = useState();
  const [visibleMonth, setVisibleMonth] = useState();
  const [visibleMonthStartDay, setVisibleMonthStartDay] = useState();
  const chooseMonth = (year: number, month: number) => {
    const yearDate = new Date(year, month, visibleDate.getDate());
    moveToDate(yearDate);
  };
  const incrementMonth = (increment: number) => {
    chooseMonth(visibleMonthYear, visibleMonth + increment);
  };
  const chooseYear = (year: number) => {
    const yearDate = new Date(
      year,
      visibleDate.getMonth(),
      visibleDate.getDate()
    );
    moveToDate(yearDate);
  };
  const incrementYear = (increment: number) => {
    chooseYear(visibleMonthYear + increment);
  };
  const moveToDate = (date: Date) => {
    setVisibleDate(new Date(date));
    setVisibleMonth(date.getMonth());
    setVisibleMonthStartDay(getFirstDay(date));
    setVisibleMonthLength(getTotalDaysInMonth(date));
    setPreviousMonthLength(getTotalDaysInMonth(date, 0));
    setVisibleMonthYear(date.getFullYear());
  };

  const days = getDays(
    previousMonthLength,
    visibleMonthStartDay,
    visibleMonthLength,
    visibleMonthYear,
    visibleMonth
  );
  const weeks = getWeeks(days);
  useEffect(() => {
    moveToDate(selectedDate || todaysDate);
  }, []);
  return [
    {
      month: {
        visible: {
          length: visibleMonthLength,
          index: visibleMonth,
          start: visibleMonthStartDay,
          label: getMonthLabel(visibleMonth)
        },
        previous: {
          length: previousMonthLength
        },
        increment: incrementMonth,
        choose: chooseMonth
      },
      selected: {
        year: selectedDate && selectedDate.getFullYear(),
        month: selectedDate && selectedDate.getMonth(),
        day: selectedDate && selectedDate.getDate(),
        value: selectedDate ? selectedDate.toLocaleDateString() : ""
      },
      days,
      weeks,
      year: {
        choose: chooseYear,
        increment: incrementYear
      },
      today: {
        year: todaysDate.getFullYear(),
        month: todaysDate.getMonth(),
        day: todaysDate.getDate()
      }
    },
    moveToDate,
    setSelectedDate
  ];
};

const DateInput = ({
  label,
  required = false,
  name = label,
  id = name,
  value: passedValue = "",
  yearsOptions = []
}: {
  label: string,
  required: boolean,
  name?: string,
  id?: string,
  value?: string,
  yearsOptions?: number[]
}) => {
  const [isOpen, setIsOpen] = useState();
  const [field, meta] = useField(name);
  const [
    {
      month: {
        visible: currentMonth,
        previous: previousMonth,
        increment: incrementMonth
      },
      year: { choose: chooseYear },
      selected,
      weeks,
      today
    },
    moveToDate,
    setDate
  ] = useCalendar(field.value || passedValue);
  useEffect(() => {
    if (field.value) setDate(new Date(field.value))
  }, [field.value])
  return (
    <div
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
        aria-hidden="false"
        aria-label="Date picker: June"
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
          {yearsOptions.length > 0 && <div className="slds-shrink-none">
            <label className="slds-assistive-text" htmlFor={`${id}-cal`}>
              Pick a Year
            </label>
            <div className="slds-select_container">
              <select
                className="slds-select"
                id={`${id}-cal`}
                onChange={e => chooseYear(+e.target.value)}
              >
                {yearsOptions.map(option => <option>{option}</option>)}
                <option>2014</option>
                <option>2015</option>
                <option>2016</option>
              </select>
            </div>
          </div>}
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
          <tbody>
            {weeks.map((week: any, index: number) => {
              return (
                <tr key={index}>
                  {week.map((day: any, index: number) => (
                    <td
                      key={index}
                      onClick={() => {
                        setDate(new Date(day.year, day.month, day.day));
                        field.onChange({
                          target: {
                            name,
                            value: new Date(
                              day.year,
                              day.month,
                              day.day
                            ).toLocaleDateString()
                          }
                        });
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
    </div>
  );
};

export default DateInput;
