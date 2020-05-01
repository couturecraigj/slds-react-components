import parseDate from "./parseDate";

const getFirstDay = (date: Date) => {
  const selectedDate = new Date(date);
  selectedDate.setDate(1);
  // 0 is Sunday 6 is Saturday
  return selectedDate.getDay();
};

const getLocale = () => {
  const lng = window.navigator.language;

  return lng;
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
  const locale = getLocale();

  return date.toLocaleDateString(locale, { month: "long" });
};

const isISO = (date: any) => {
  if (typeof date !== "string") return false;
  if (/\d{4}-[01]\d-[0-3]\d/.test(date)) return true;
  return false;
};

const convertUTCtoLocale = (date: any) => {
  if (isISO(date)) {
    const newDate = new Date(date);

    return new Date(
      newDate.getUTCFullYear(),
      newDate.getUTCMonth(),
      newDate.getUTCDate()
    ).toLocaleDateString("en-US");
  }

  if (typeof window !== "object") return date;
  if (typeof date === "string") {
    return parseDate(date)?.toLocaleDateString("en-US");
  }

  return date;
};

const getISODate = (date: Date) => {
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
  getWeeks,
  getMonthLabel,
  getDays,
  getTotalDaysInMonth,
  getFirstDay,
  convertUTCtoLocale,
  getISODate,
  isISO
};
