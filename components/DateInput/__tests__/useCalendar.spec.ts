import { renderHook } from "@testing-library/react-hooks";
import useCalendar from "../hooks/useCalendar";
import { getFormat } from "../parseDate";

describe("useCalendar", () => {
  let languageGetter;
  beforeEach(() => {
    languageGetter = jest.spyOn(window.navigator, "language", "get");
  });
  it("should work", () => {
    languageGetter.mockReturnValue("de-DE");
    getFormat();
    const {
      result: { current: calendar }
    } = renderHook(() => useCalendar(new Date()));
    expect(calendar).toBeDefined();
  });
  it("should render correct month and year `de-DE`", () => {
    languageGetter.mockReturnValue("de-DE");
    getFormat();
    const {
      result: {
        current: [calendar]
      }
    } = renderHook(() => useCalendar(new Date(2020, 4, 5)));
    expect(calendar.selected.year).toEqual(2020);
    expect(calendar.selected.month).toEqual(4);
    expect(calendar.selected.day).toEqual(5);
    expect(calendar.selected.value).toEqual("05.05.2020");
  });
  it("should render correct month and year `de-DE`", () => {
    languageGetter.mockReturnValue("de-DE");
    getFormat();
    const {
      result: {
        current: [calendar]
      }
    } = renderHook(() => useCalendar(new Date(2020, 4, 5)));
    expect(calendar.month.visible.index).toEqual(4);
    expect(calendar.month.visible.label).toEqual("May");
    expect(calendar.selected.month).toEqual(4);
  });
  it("should render correct month and year `en-US`", () => {
    languageGetter.mockReturnValue("en-US");
    getFormat();
    const {
      result: {
        current: [calendar]
      }
    } = renderHook(() => useCalendar(new Date(2020, 4, 5)));
    expect(calendar.selected.year).toEqual(2020);
    expect(calendar.selected.month).toEqual(4);
    expect(calendar.selected.day).toEqual(5);
    expect(calendar.selected.value).toEqual("5/5/2020");
  });
  it("should render correct month and year `en-US`", () => {
    languageGetter.mockReturnValue("en-US");
    getFormat();
    const {
      result: {
        current: [calendar]
      }
    } = renderHook(() => useCalendar(new Date(2020, 4, 5)));
    expect(calendar.month.visible.index).toEqual(4);
    expect(calendar.month.visible.label).toEqual("May");
    expect(calendar.selected.month).toEqual(4);
  });
  it("should render the correct amount of weeks at 2020-05-31", () => {
    const {
      result: {
        current: [calendar]
      }
    } = renderHook(() => useCalendar(new Date(2020, 4, 31)));
    expect(calendar.month.visible.length).toEqual(31);
    expect(calendar.weeks.length).toEqual(6);
  });
});
