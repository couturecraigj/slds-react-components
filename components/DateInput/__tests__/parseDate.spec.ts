import parseDate, {toLocale, getFormat} from "../parseDate";

describe("`parseDate`", () => {
  let languageGetter;
  beforeEach(() => {
    languageGetter = jest.spyOn(window.navigator, 'language', 'get');
  })
  
  it('should accept `de-DE`', () => {
    languageGetter.mockReturnValue('de')
    getFormat()
    const date = parseDate('3.1.2020');
    expect(date.getDate()).toEqual(3)
    expect(date.getFullYear()).toEqual(2020)
    expect(date.getMonth()).toEqual(0)
  })
  it('should accept `en-US`', () => {
    languageGetter.mockReturnValue('en-US')
    getFormat()
    const date = parseDate('5/1/2020');
    expect(date.getDate()).toEqual(1)
    expect(date.getFullYear()).toEqual(2020)
    expect(date.getMonth()).toEqual(4)
  })
  it('should accept `en-US`', () => {
    languageGetter.mockReturnValue('en-US')
    getFormat()
    const date = parseDate('1/3/2020');
    expect(date.getDate()).toEqual(3)
    expect(date.getFullYear()).toEqual(2020)
    expect(date.getMonth()).toEqual(0)
  })
})

describe('toLocale', () => {
  let languageGetter;
  beforeEach(() => {
    languageGetter = jest.spyOn(window.navigator, 'language', 'get');
  })
  it('should parse german', () => {
    languageGetter.mockReturnValue('de');
    getFormat()
    expect(toLocale(new Date('2020-01-02'))).toEqual('02.01.2020')
  })
})