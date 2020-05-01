import {useState, useEffect} from 'react'
import {convertUTCtoLocale, getTotalDaysInMonth, getFirstDay, getDays, getWeeks, getMonthLabel} from '../utils'

const useCalendar = (date?: any): any => {
  const todaysDate = new Date();
  const [selectedDate, setSelectedDate] = useState(date && new Date(convertUTCtoLocale(date)));
  const [visibleDate, setVisibleDate] = useState(
    new Date(convertUTCtoLocale(date) || Date.now())
  );
  const [previousMonthLength, setPreviousMonthLength] = useState<number>(
    getTotalDaysInMonth(visibleDate, 0)
  );
  const [visibleMonthYear, setVisibleMonthYear] = useState<number>(
    visibleDate.getFullYear()
  );
  const [visibleMonthLength, setVisibleMonthLength] = useState<number>(
    getTotalDaysInMonth(visibleDate)
  );
  const [visibleMonth, setVisibleMonth] = useState<number>(
    visibleDate.getMonth()
  );
  const [visibleMonthStartDay, setVisibleMonthStartDay] = useState<number>(
    getFirstDay(visibleDate)
  );
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
    (date: any) => setSelectedDate(convertUTCtoLocale(date) )
  ];
};

export default useCalendar;