import {
  getFirstDay,
  getTotalDaysInMonth,
  getDays,
  getWeeks,
  getMonthLabel,
  isISO,
  convertUTCtoLocale,
  getISODate
} from "../utils";

describe("getFirstDay", () => {
  it("should get the first day of `2020-01-02`", () => {
    expect(getFirstDay(new Date(2020, 0, 2))).toEqual(3);
  });
});
describe("getTotalDaysInMonth", () => {
  it("should get total days of `2020-01-02`", () => {
    expect(getTotalDaysInMonth(new Date(2020, 0, 2))).toEqual(31);
  });
});
describe("getDays", () => {
  it("should render a list of days", () => {
    const days = getDays(31, 3, 31, 2020, 0);
    expect(days[0].day).toEqual(29);
  });
});
describe("getWeeks", () => {
  it("should render a list of days", () => {
    const weeks = getWeeks(getDays(31, 3, 31, 2020, 0));
    expect(weeks[0][0].day).toEqual(29);
    expect(weeks.length).toEqual(5);
  });
});
describe("getMonthLabel", () => {
  let languageGetter;
  beforeEach(() => {
    languageGetter = jest.spyOn(window.navigator, "language", "get");
  });
  it("should render February for US", () => {
    languageGetter.mockReturnValue("en-US");
    const label = getMonthLabel(1);
    expect(label).toEqual("February");
  });
});
describe("isISO", () => {
  it("should test be true for ISO", () => {
    expect(isISO("2020-02-01")).toEqual(true);
  });
});
describe("getISODate", () => {
  it("should return ISO formatted date", () => {
    expect(getISODate(new Date(2020, 1, 2))).toEqual("2020-02-02");
  });
});
describe("convertUTCtoLocale", () => {
  it("should return locale time", () => {
    expect(convertUTCtoLocale("2020-02-01")).toEqual("2/1/2020");
  });
  it("should return locale time when given locale time", () => {
    expect(convertUTCtoLocale("2/1/2020")).toEqual("2/1/2020");
  });
});
