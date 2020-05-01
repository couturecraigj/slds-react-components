import parseDate from "../parseDate";

describe("`parseDate`", () => {
  let languageGetter;
  beforeEach(() => {
    languageGetter = jest.spyOn(window.navigator, 'language', 'get');
  })
  
  it('should accept `de-DE`', () => {
    languageGetter.mockReturnValue('de')

    const date = parseDate('3.1.2020');
    expect(date.getDate()).toEqual(3)
    expect(date.getFullYear()).toEqual(2020)
    expect(date.getMonth()).toEqual(0)
  })
  it('should accept `en-US`', () => {
    languageGetter.mockReturnValue('en-US')

    const date = parseDate('1/3/2020');
    expect(date.getDate()).toEqual(3)
    expect(date.getFullYear()).toEqual(2020)
    expect(date.getMonth()).toEqual(0)
  })
  it('should accept `en-US`', () => {
    languageGetter.mockReturnValue('en-US')

    const date = parseDate('1/3/2020');
    expect(date.getDate()).toEqual(3)
    expect(date.getFullYear()).toEqual(2020)
    expect(date.getMonth()).toEqual(0)
  })
})