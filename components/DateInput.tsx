import React, { useState, useEffect } from "react";
import { useField } from "formik";

const formats: { [key: string]: string } = {
  "ar-SA": "dd/MM/yy",
  "bg-BG": "dd.M.yyyy",
  "ca-ES": "dd/MM/yyyy",
  "zh-TW": "yyyy/M/d",
  "cs-CZ": "d.M.yyyy",
  "da-DK": "dd-MM-yyyy",
  "de-DE": "dd.MM.yyyy",
  "el-GR": "d/M/yyyy",
  "en-US": "M/d/yyyy",
  "fi-FI": "d.M.yyyy",
  "fr-FR": "dd/MM/yyyy",
  "he-IL": "dd/MM/yyyy",
  "hu-HU": "yyyy. MM. dd.",
  "is-IS": "d.M.yyyy",
  "it-IT": "dd/MM/yyyy",
  "ja-JP": "yyyy/MM/dd",
  "ko-KR": "yyyy-MM-dd",
  "nl-NL": "d-M-yyyy",
  "nb-NO": "dd.MM.yyyy",
  "pl-PL": "yyyy-MM-dd",
  "pt-BR": "d/M/yyyy",
  "ro-RO": "dd.MM.yyyy",
  "ru-RU": "dd.MM.yyyy",
  "hr-HR": "d.M.yyyy",
  "sk-SK": "d. M. yyyy",
  "sq-AL": "yyyy-MM-dd",
  "sv-SE": "yyyy-MM-dd",
  "th-TH": "d/M/yyyy",
  "tr-TR": "dd.MM.yyyy",
  "ur-PK": "dd/MM/yyyy",
  "id-ID": "dd/MM/yyyy",
  "uk-UA": "dd.MM.yyyy",
  "be-BY": "dd.MM.yyyy",
  "sl-SI": "d.M.yyyy",
  "et-EE": "d.MM.yyyy",
  "lv-LV": "yyyy.MM.dd.",
  "lt-LT": "yyyy.MM.dd",
  "fa-IR": "MM/dd/yyyy",
  "vi-VN": "dd/MM/yyyy",
  "hy-AM": "dd.MM.yyyy",
  "az-Latn-AZ": "dd.MM.yyyy",
  "eu-ES": "yyyy/MM/dd",
  "mk-MK": "dd.MM.yyyy",
  "af-ZA": "yyyy/MM/dd",
  "ka-GE": "dd.MM.yyyy",
  "fo-FO": "dd-MM-yyyy",
  "hi-IN": "dd-MM-yyyy",
  "ms-MY": "dd/MM/yyyy",
  "kk-KZ": "dd.MM.yyyy",
  "ky-KG": "dd.MM.yy",
  "sw-KE": "M/d/yyyy",
  "uz-Latn-UZ": "dd/MM yyyy",
  "tt-RU": "dd.MM.yyyy",
  "pa-IN": "dd-MM-yy",
  "gu-IN": "dd-MM-yy",
  "ta-IN": "dd-MM-yyyy",
  "te-IN": "dd-MM-yy",
  "kn-IN": "dd-MM-yy",
  "mr-IN": "dd-MM-yyyy",
  "sa-IN": "dd-MM-yyyy",
  "mn-MN": "yy.MM.dd",
  "gl-ES": "dd/MM/yy",
  "kok-IN": "dd-MM-yyyy",
  "syr-SY": "dd/MM/yyyy",
  "dv-MV": "dd/MM/yy",
  "ar-IQ": "dd/MM/yyyy",
  "zh-CN": "yyyy/M/d",
  "de-CH": "dd.MM.yyyy",
  "en-GB": "dd/MM/yyyy",
  "es-MX": "dd/MM/yyyy",
  "fr-BE": "d/MM/yyyy",
  "it-CH": "dd.MM.yyyy",
  "nl-BE": "d/MM/yyyy",
  "nn-NO": "dd.MM.yyyy",
  "pt-PT": "dd-MM-yyyy",
  "sr-Latn-CS": "d.M.yyyy",
  "sv-FI": "d.M.yyyy",
  "az-Cyrl-AZ": "dd.MM.yyyy",
  "ms-BN": "dd/MM/yyyy",
  "uz-Cyrl-UZ": "dd.MM.yyyy",
  "ar-EG": "dd/MM/yyyy",
  "zh-HK": "d/M/yyyy",
  "de-AT": "dd.MM.yyyy",
  "en-AU": "d/MM/yyyy",
  "es-ES": "dd/MM/yyyy",
  "fr-CA": "yyyy-MM-dd",
  "sr-Cyrl-CS": "d.M.yyyy",
  "ar-LY": "dd/MM/yyyy",
  "zh-SG": "d/M/yyyy",
  "de-LU": "dd.MM.yyyy",
  "en-CA": "dd/MM/yyyy",
  "es-GT": "dd/MM/yyyy",
  "fr-CH": "dd.MM.yyyy",
  "ar-DZ": "dd-MM-yyyy",
  "zh-MO": "d/M/yyyy",
  "de-LI": "dd.MM.yyyy",
  "en-NZ": "d/MM/yyyy",
  "es-CR": "dd/MM/yyyy",
  "fr-LU": "dd/MM/yyyy",
  "ar-MA": "dd-MM-yyyy",
  "en-IE": "dd/MM/yyyy",
  "es-PA": "MM/dd/yyyy",
  "fr-MC": "dd/MM/yyyy",
  "ar-TN": "dd-MM-yyyy",
  "en-ZA": "yyyy/MM/dd",
  "es-DO": "dd/MM/yyyy",
  "ar-OM": "dd/MM/yyyy",
  "en-JM": "dd/MM/yyyy",
  "es-VE": "dd/MM/yyyy",
  "ar-YE": "dd/MM/yyyy",
  "en-029": "MM/dd/yyyy",
  "es-CO": "dd/MM/yyyy",
  "ar-SY": "dd/MM/yyyy",
  "en-BZ": "dd/MM/yyyy",
  "es-PE": "dd/MM/yyyy",
  "ar-JO": "dd/MM/yyyy",
  "en-TT": "dd/MM/yyyy",
  "es-AR": "dd/MM/yyyy",
  "ar-LB": "dd/MM/yyyy",
  "en-ZW": "M/d/yyyy",
  "es-EC": "dd/MM/yyyy",
  "ar-KW": "dd/MM/yyyy",
  "en-PH": "M/d/yyyy",
  "es-CL": "dd-MM-yyyy",
  "ar-AE": "dd/MM/yyyy",
  "es-UY": "dd/MM/yyyy",
  "ar-BH": "dd/MM/yyyy",
  "es-PY": "dd/MM/yyyy",
  "ar-QA": "dd/MM/yyyy",
  "es-BO": "dd/MM/yyyy",
  "es-SV": "dd/MM/yyyy",
  "es-HN": "dd/MM/yyyy",
  "es-NI": "dd/MM/yyyy",
  "es-PR": "dd/MM/yyyy",
  "am-ET": "d/M/yyyy",
  "tzm-Latn-DZ": "dd-MM-yyyy",
  "iu-Latn-CA": "d/MM/yyyy",
  "sma-NO": "dd.MM.yyyy",
  "mn-Mong-CN": "yyyy/M/d",
  "gd-GB": "dd/MM/yyyy",
  "en-MY": "d/M/yyyy",
  "prs-AF": "dd/MM/yy",
  "bn-BD": "dd-MM-yy",
  "wo-SN": "dd/MM/yyyy",
  "rw-RW": "M/d/yyyy",
  "qut-GT": "dd/MM/yyyy",
  "sah-RU": "MM.dd.yyyy",
  "gsw-FR": "dd/MM/yyyy",
  "co-FR": "dd/MM/yyyy",
  "oc-FR": "dd/MM/yyyy",
  "mi-NZ": "dd/MM/yyyy",
  "ga-IE": "dd/MM/yyyy",
  "se-SE": "yyyy-MM-dd",
  "br-FR": "dd/MM/yyyy",
  "smn-FI": "d.M.yyyy",
  "moh-CA": "M/d/yyyy",
  "arn-CL": "dd-MM-yyyy",
  "ii-CN": "yyyy/M/d",
  "dsb-DE": "d. M. yyyy",
  "ig-NG": "d/M/yyyy",
  "kl-GL": "dd-MM-yyyy",
  "lb-LU": "dd/MM/yyyy",
  "ba-RU": "dd.MM.yy",
  "nso-ZA": "yyyy/MM/dd",
  "quz-BO": "dd/MM/yyyy",
  "yo-NG": "d/M/yyyy",
  "ha-Latn-NG": "d/M/yyyy",
  "fil-PH": "M/d/yyyy",
  "ps-AF": "dd/MM/yy",
  "fy-NL": "d-M-yyyy",
  "ne-NP": "M/d/yyyy",
  "se-NO": "dd.MM.yyyy",
  "iu-Cans-CA": "d/M/yyyy",
  "sr-Latn-RS": "d.M.yyyy",
  "si-LK": "yyyy-MM-dd",
  "sr-Cyrl-RS": "d.M.yyyy",
  "lo-LA": "dd/MM/yyyy",
  "km-KH": "yyyy-MM-dd",
  "cy-GB": "dd/MM/yyyy",
  "bo-CN": "yyyy/M/d",
  "sms-FI": "d.M.yyyy",
  "as-IN": "dd-MM-yyyy",
  "ml-IN": "dd-MM-yy",
  "en-IN": "dd-MM-yyyy",
  "or-IN": "dd-MM-yy",
  "bn-IN": "dd-MM-yy",
  "tk-TM": "dd.MM.yy",
  "bs-Latn-BA": "d.M.yyyy",
  "mt-MT": "dd/MM/yyyy",
  "sr-Cyrl-ME": "d.M.yyyy",
  "se-FI": "d.M.yyyy",
  "zu-ZA": "yyyy/MM/dd",
  "xh-ZA": "yyyy/MM/dd",
  "tn-ZA": "yyyy/MM/dd",
  "hsb-DE": "d. M. yyyy",
  "bs-Cyrl-BA": "d.M.yyyy",
  "tg-Cyrl-TJ": "dd.MM.yy",
  "sr-Latn-BA": "d.M.yyyy",
  "smj-NO": "dd.MM.yyyy",
  "rm-CH": "dd/MM/yyyy",
  "smj-SE": "yyyy-MM-dd",
  "quz-EC": "dd/MM/yyyy",
  "quz-PE": "dd/MM/yyyy",
  "hr-BA": "d.M.yyyy.",
  "sr-Latn-ME": "d.M.yyyy",
  "sma-SE": "yyyy-MM-dd",
  "en-SG": "d/M/yyyy",
  "ug-CN": "yyyy-M-d",
  "sr-Cyrl-BA": "d.M.yyyy",
  "es-US": "M/d/yyyy"
};

const getFirstDay = (date: Date) => {
  const selectedDate = new Date(date);
  selectedDate.setDate(1);
  // 0 is Sunday 6 is Saturday
  return selectedDate.getDay();
};

function parseDate(input: string) {
  const lng: string = window.navigator.language;

  let format = formats[lng];
  if (!format) {
    format =
      formats[Object.keys(formats).find(f => f.startsWith(lng)) || 'p'] ||
      "yyyy-mm-dd";
      console.log(format)
  }
  var parts = input.match(/(\d+)/g),
    i = 0,
    fmt: { [key: string]: number } = {};
  // extract date-part indexes from the format
  format.replace(/(yyyy|dd|MM)/g, function(part: string) {
    fmt[part] = i++;
    return part;
  });

  if (!parts) return;
  const year: number = fmt["yyyy"];
  const month: number = fmt["MM"];
  const day: number = fmt["dd"];
  if (day === undefined || month === undefined || year === undefined) return;

  return new Date(+parts[year], +parts[month] - 1, +parts[day]);
}

const locale = process.env.NODE_ENV === "production" ? undefined : undefined;

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
    ).toLocaleDateString('en-US');
  }

  if (typeof date === "string") {
    console.log(parseDate(date))
    return parseDate(date);
  }

  return date;
};

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
        value: selectedDate ? selectedDate.toLocaleDateString(locale) : ""
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

const DateInput = ({
  label,
  required = false,
  name = label,
  id = name,
  value: passedValue = "",
  yearsOptions = []
}: {
  label: string;
  required: boolean;
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
    if (field.value) {
      const newDate = new Date(convertUTCtoLocale(field.value));
      console.log(field.value)
      console.log(newDate);
      setDate(newDate);
    }
  }, [field.value]);
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
                            value: getISODate(
                              new Date(day.year, day.month, day.day)
                            )
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
      {meta.touched && meta.error ? (
        <div className="slds-form-element__help" id={`${name}-form-error`}>
          {meta.error}
        </div>
      ) : null}
    </div>
  );
};

export default DateInput;
