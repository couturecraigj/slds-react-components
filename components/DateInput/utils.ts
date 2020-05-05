import parseDate, { toLocale } from "./parseDate";
const windowDefined = typeof window === "object";
const getFirstDay = (date: Date) => {
  const selectedDate = new Date(date);
  selectedDate.setUTCDate(1);
  // 0 is Sunday 6 is Saturday
  return selectedDate.getUTCDay();
};

export const getLocale = () => {
  if (!windowDefined) return;
  const lng = window.navigator.language;

  return lng;
};

const getTotalDaysInMonth = (date: Date, add = 1) => {
  const selectedDate = new Date(date);
  selectedDate.setUTCMonth(selectedDate.getUTCMonth() + add);
  selectedDate.setUTCDate(0);
  return selectedDate.getUTCDate();
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
      month: visibleMonth === 0 ? 11 : visibleMonth - 1,
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
        month: visibleMonth === 11 ? 0 : visibleMonth + 1,
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
  const locale = getLocale();

  return date.toLocaleDateString(locale, { month: "long" });
};

const isISO = (date: any) => {
  if (typeof date !== "string") return false;
  if (/\d{4}-[01]\d-[0-3]\d/.test(date)) return true;
  return false;
};

const convertUTCtoLocale = (date: any, english = false) => {
  if (isISO(date)) {
    const newDate = new Date(date);
    
    const finalDate = toLocale(
      new Date(
        newDate.getUTCFullYear(),
        newDate.getUTCMonth(),
        newDate.getUTCDate()
      )
    );
    return finalDate
  }

  if (!windowDefined) return date;
  if (typeof date === "string") {
    const newDate = parseDate(date);
    if (english) return newDate?.toLocaleDateString("en-US");
    return toLocale(newDate);
  }

  return date;
};

const getISODate = (date?: Date) => {
  if (!date) return "";
  const month = date.getMonth() + 1;
  const dateString =
    date.getFullYear() +
    "-" +
    ("" + month).padStart(2, "0") +
    "-" +
    ("" + date.getDate()).padStart(2, "0");
  return dateString;
};

export {
  windowDefined,
  getWeeks,
  getMonthLabel,
  getDays,
  getTotalDaysInMonth,
  getFirstDay,
  convertUTCtoLocale,
  getISODate,
  isISO
};
