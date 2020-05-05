import { useState, useEffect } from "react";
import {
  getTotalDaysInMonth,
  getFirstDay,
  getDays,
  getWeeks,
  getMonthLabel,
  getISODate
} from "../utils";
import { toLocale } from "../parseDate";

const useCalendar = (date?: any): any => {
  const todaysDate = new Date();
  const [selectedDate, setSelectedDate] = useState(date && new Date(date));
  const [visibleDate, setVisibleDate] = useState(new Date(date || Date.now()));
  const handleSelectDate = (date: Date) => {
    date = date && new Date(getISODate(date));
    setSelectedDate(date);
    moveToDate(date);
    // setSelectedISODate(date && new Date(getISODate(date)))
  };
  const [previousMonthLength, setPreviousMonthLength] = useState<number>(
    getTotalDaysInMonth(visibleDate, 0)
  );
  const [visibleMonthYear, setVisibleMonthYear] = useState<number>(
    visibleDate.getUTCFullYear()
  );

  const [visibleMonthLength, setVisibleMonthLength] = useState<number>(
    getTotalDaysInMonth(visibleDate)
  );

  const [visibleMonth, setVisibleMonth] = useState<number>(
    visibleDate.getUTCMonth()
  );
  const [visibleMonthStartDay, setVisibleMonthStartDay] = useState<number>(
    getFirstDay(visibleDate)
  );
  const chooseMonth = (year: number, month: number) => {
    const yearDate = new Date(year, month, visibleDate.getUTCDate());
    moveToDate(yearDate);
  };
  const incrementMonth = (increment: number) => {
    chooseMonth(visibleMonthYear, visibleMonth + increment);
  };
  const chooseYear = (year: number) => {
    const yearDate = new Date(
      year,
      visibleDate.getUTCMonth(),
      visibleDate.getUTCDate()
    );
    moveToDate(yearDate);
  };
  const incrementYear = (increment: number) => {
    chooseYear(visibleMonthYear + increment);
  };
  const moveToDate = (date: Date) => {
    setVisibleDate(new Date(date));
    setVisibleMonth(date.getUTCMonth());
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
        year: selectedDate && selectedDate.getUTCFullYear(),
        month: selectedDate && selectedDate.getUTCMonth(),
        day: selectedDate && selectedDate.getUTCDate(),
        value: selectedDate ? toLocale(selectedDate) : "",
        ISOValue: getISODate(selectedDate)
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
    handleSelectDate
  ];
};

export default useCalendar;
