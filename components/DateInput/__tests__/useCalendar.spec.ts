import { renderHook } from "@testing-library/react-hooks";
import useCalendar from "../hooks/useCalendar";



describe("useCalendar", () => {
  let languageGetter;
  beforeEach(() => {
    languageGetter = jest.spyOn(window.navigator, "language", "get");
  });
  it("should work", () => {
    languageGetter.mockReturnValue("de-DE");
    const {
      result: { current: calendar }
    } = renderHook(() => useCalendar(new Date()));
    expect(calendar).toBeDefined()
  });
  it("should render correct month and year", () => {
    languageGetter.mockReturnValue("de-DE");
    const {
      result: { current: [calendar] }
    } = renderHook(() => useCalendar(new Date(2020, 4, 5)));
    expect(calendar.selected.year).toEqual(2020)
    expect(calendar.selected.month).toEqual(4);
    expect(calendar.selected.day).toEqual(5)
    expect(calendar.selected.value).toEqual('05.05.2020')
  });
});
