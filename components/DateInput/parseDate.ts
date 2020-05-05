import { isISO } from "./utils";

const d__M__yyyy = "d.M.yyyy";
const dd_MM_yy = "dd/MM/yy";
const dd_MM_yyyy = "dd/MM/yyyy";
const dd___MM___yyyy = "dd-MM-yyyy";
const dd__MM__yyyy = "dd.MM.yyyy";
const d_M_yyyy = "d/M/yyyy";
const M_d_yyyy = "M/d/yyyy";
const yyyy_MM_dd = "yyyy/MM/dd";
const yyyy___MM___dd = "yyyy-MM-dd";
const d___M___yyyy = "d-M-yyyy";
const MM_dd_yyyy = "MM/dd/yyyy";
const dd___MM___yy = "dd-MM-yy";
const yyyy_M_d = "yyyy/M/d";
const dd__MM__yy = "dd.MM.yy";
const d_MM_yyyy = "d/MM/yyyy";

const windowDefined = typeof window === "object";

const formats: { [key: string]: string } = {
  "af-ZA": yyyy_MM_dd,
  "am-ET": d_M_yyyy,
  "ar-AE": dd_MM_yyyy,
  "ar-BH": dd_MM_yyyy,
  "ar-DZ": dd___MM___yyyy,
  "ar-EG": dd_MM_yyyy,
  "ar-IQ": dd_MM_yyyy,
  "ar-JO": dd_MM_yyyy,
  "ar-KW": dd_MM_yyyy,
  "ar-LB": dd_MM_yyyy,
  "ar-LY": dd_MM_yyyy,
  "ar-MA": dd___MM___yyyy,
  "ar-OM": dd_MM_yyyy,
  "ar-QA": dd_MM_yyyy,
  "ar-SA": dd_MM_yy,
  "ar-SY": dd_MM_yyyy,
  "ar-TN": dd___MM___yyyy,
  "ar-YE": dd_MM_yyyy,
  "arn-CL": dd___MM___yyyy,
  "as-IN": dd___MM___yyyy,
  "az-Cyrl-AZ": dd__MM__yyyy,
  "az-Latn-AZ": dd__MM__yyyy,
  "ba-RU": dd__MM__yy,
  "be-BY": dd__MM__yyyy,
  "bg-BG": "dd.M.yyyy",
  "bn-BD": dd___MM___yy,
  "bn-IN": dd___MM___yy,
  "bo-CN": yyyy_M_d,
  "br-FR": dd_MM_yyyy,
  "bs-Cyrl-BA": d__M__yyyy,
  "bs-Latn-BA": d__M__yyyy,
  "ca-ES": dd_MM_yyyy,
  "co-FR": dd_MM_yyyy,
  "cs-CZ": d__M__yyyy,
  "cy-GB": dd_MM_yyyy,
  "da-DK": dd___MM___yyyy,
  "de-AT": dd__MM__yyyy,
  "de-CH": dd__MM__yyyy,
  "de-DE": dd__MM__yyyy,
  "de-LI": dd__MM__yyyy,
  "de-LU": dd__MM__yyyy,
  "dsb-DE": "d. M. yyyy",
  "dv-MV": dd_MM_yy,
  "el-GR": d_M_yyyy,
  "en-029": MM_dd_yyyy,
  "en-AU": d_MM_yyyy,
  "en-BZ": dd_MM_yyyy,
  "en-CA": dd_MM_yyyy,
  "en-GB": dd_MM_yyyy,
  "en-IE": dd_MM_yyyy,
  "en-IN": dd___MM___yyyy,
  "en-JM": dd_MM_yyyy,
  "en-MY": d_M_yyyy,
  "en-NZ": d_MM_yyyy,
  "en-PH": M_d_yyyy,
  "en-SG": d_M_yyyy,
  "en-TT": dd_MM_yyyy,
  "en-US": M_d_yyyy,
  "en-ZA": yyyy_MM_dd,
  "en-ZW": M_d_yyyy,
  "es-AR": dd_MM_yyyy,
  "es-BO": dd_MM_yyyy,
  "es-CL": dd___MM___yyyy,
  "es-CO": dd_MM_yyyy,
  "es-CR": dd_MM_yyyy,
  "es-DO": dd_MM_yyyy,
  "es-EC": dd_MM_yyyy,
  "es-ES": dd_MM_yyyy,
  "es-GT": dd_MM_yyyy,
  "es-HN": dd_MM_yyyy,
  "es-MX": dd_MM_yyyy,
  "es-NI": dd_MM_yyyy,
  "es-PA": MM_dd_yyyy,
  "es-PE": dd_MM_yyyy,
  "es-PR": dd_MM_yyyy,
  "es-PY": dd_MM_yyyy,
  "es-SV": dd_MM_yyyy,
  "es-US": M_d_yyyy,
  "es-UY": dd_MM_yyyy,
  "es-VE": dd_MM_yyyy,
  "et-EE": "d.MM.yyyy",
  "eu-ES": yyyy_MM_dd,
  "fa-IR": MM_dd_yyyy,
  "fi-FI": d__M__yyyy,
  "fil-PH": M_d_yyyy,
  "fo-FO": dd___MM___yyyy,
  "fr-BE": d_MM_yyyy,
  "fr-CA": yyyy___MM___dd,
  "fr-CH": dd__MM__yyyy,
  "fr-FR": dd_MM_yyyy,
  "fr-LU": dd_MM_yyyy,
  "fr-MC": dd_MM_yyyy,
  "fy-NL": d___M___yyyy,
  "ga-IE": dd_MM_yyyy,
  "gd-GB": dd_MM_yyyy,
  "gl-ES": dd_MM_yy,
  "gsw-FR": dd_MM_yyyy,
  "gu-IN": dd___MM___yy,
  "ha-Latn-NG": d_M_yyyy,
  "he-IL": dd_MM_yyyy,
  "hi-IN": dd___MM___yyyy,
  "hr-BA": "d.M.yyyy.",
  "hr-HR": d__M__yyyy,
  "hsb-DE": "d. M. yyyy",
  "hu-HU": "yyyy. MM. dd.",
  "hy-AM": dd__MM__yyyy,
  "id-ID": dd_MM_yyyy,
  "ig-NG": d_M_yyyy,
  "ii-CN": yyyy_M_d,
  "is-IS": d__M__yyyy,
  "it-CH": dd__MM__yyyy,
  "it-IT": dd_MM_yyyy,
  "iu-Cans-CA": d_M_yyyy,
  "iu-Latn-CA": d_MM_yyyy,
  "ja-JP": yyyy_MM_dd,
  "ka-GE": dd__MM__yyyy,
  "kk-KZ": dd__MM__yyyy,
  "kl-GL": dd___MM___yyyy,
  "km-KH": yyyy___MM___dd,
  "kn-IN": dd___MM___yy,
  "ko-KR": yyyy___MM___dd,
  "kok-IN": dd___MM___yyyy,
  "ky-KG": dd__MM__yy,
  "lb-LU": dd_MM_yyyy,
  "lo-LA": dd_MM_yyyy,
  "lt-LT": "yyyy.MM.dd",
  "lv-LV": "yyyy.MM.dd.",
  "mi-NZ": dd_MM_yyyy,
  "mk-MK": dd__MM__yyyy,
  "ml-IN": dd___MM___yy,
  "mn-MN": "yy.MM.dd",
  "mn-Mong-CN": yyyy_M_d,
  "moh-CA": M_d_yyyy,
  "mr-IN": dd___MM___yyyy,
  "ms-BN": dd_MM_yyyy,
  "ms-MY": dd_MM_yyyy,
  "mt-MT": dd_MM_yyyy,
  "nb-NO": dd__MM__yyyy,
  "ne-NP": M_d_yyyy,
  "nl-BE": d_MM_yyyy,
  "nl-NL": d___M___yyyy,
  "nn-NO": dd__MM__yyyy,
  "nso-ZA": yyyy_MM_dd,
  "oc-FR": dd_MM_yyyy,
  "or-IN": dd___MM___yy,
  "pa-IN": dd___MM___yy,
  "pl-PL": yyyy___MM___dd,
  "prs-AF": dd_MM_yy,
  "ps-AF": dd_MM_yy,
  "pt-BR": d_M_yyyy,
  "pt-PT": dd___MM___yyyy,
  "qut-GT": dd_MM_yyyy,
  "quz-BO": dd_MM_yyyy,
  "quz-EC": dd_MM_yyyy,
  "quz-PE": dd_MM_yyyy,
  "rm-CH": dd_MM_yyyy,
  "ro-RO": dd__MM__yyyy,
  "ru-RU": dd__MM__yyyy,
  "rw-RW": M_d_yyyy,
  "sa-IN": dd___MM___yyyy,
  "sah-RU": "MM.dd.yyyy",
  "se-FI": d__M__yyyy,
  "se-NO": dd__MM__yyyy,
  "se-SE": yyyy___MM___dd,
  "si-LK": yyyy___MM___dd,
  "sk-SK": "d. M. yyyy",
  "sl-SI": d__M__yyyy,
  "sma-NO": dd__MM__yyyy,
  "sma-SE": yyyy___MM___dd,
  "smj-NO": dd__MM__yyyy,
  "smj-SE": yyyy___MM___dd,
  "smn-FI": d__M__yyyy,
  "sms-FI": d__M__yyyy,
  "sq-AL": yyyy___MM___dd,
  "sr-Cyrl-BA": d__M__yyyy,
  "sr-Cyrl-CS": d__M__yyyy,
  "sr-Cyrl-ME": d__M__yyyy,
  "sr-Cyrl-RS": d__M__yyyy,
  "sr-Latn-BA": d__M__yyyy,
  "sr-Latn-CS": d__M__yyyy,
  "sr-Latn-ME": d__M__yyyy,
  "sr-Latn-RS": d__M__yyyy,
  "sv-FI": d__M__yyyy,
  "sv-SE": yyyy___MM___dd,
  "sw-KE": M_d_yyyy,
  "syr-SY": dd_MM_yyyy,
  "ta-IN": dd___MM___yyyy,
  "te-IN": dd___MM___yy,
  "tg-Cyrl-TJ": dd__MM__yy,
  "th-TH": d_M_yyyy,
  "tk-TM": dd__MM__yy,
  "tn-ZA": yyyy_MM_dd,
  "tr-TR": dd__MM__yyyy,
  "tt-RU": dd__MM__yyyy,
  "tzm-Latn-DZ": dd___MM___yyyy,
  "ug-CN": "yyyy-M-d",
  "uk-UA": dd__MM__yyyy,
  "ur-PK": dd_MM_yyyy,
  "uz-Cyrl-UZ": dd__MM__yyyy,
  "uz-Latn-UZ": "dd/MM yyyy",
  "vi-VN": dd_MM_yyyy,
  "wo-SN": dd_MM_yyyy,
  "xh-ZA": yyyy_MM_dd,
  "yo-NG": d_M_yyyy,
  "zh-CN": yyyy_M_d,
  "zh-HK": d_M_yyyy,
  "zh-MO": d_M_yyyy,
  "zh-SG": d_M_yyyy,
  "zh-TW": yyyy_M_d,
  "zu-ZA": yyyy_MM_dd
};

let format: string;
export const getFormat = () => {
  if (!windowDefined) {
    format = "yyyy-MM-dd";
    return;
  }
  const lng: string = window.navigator.language;
  format = formats[lng];
  if (!format) {
    format =
      formats[Object.keys(formats).find(f => f.startsWith(lng)) || "p"] ||
      "yyyy-MM-dd";
  }
};

const doesStringMatchFormat = (input: string) => {
  if (!input) return false;
  const regex = new RegExp(
    format
      .replace("MM", "\\p\\p")
      .replace(/yy/gi, "\\p\\p")
      .replace("dd", "\\p\\p")
      .replace(/(d|M)/gi, "\\d{1,2}")
      .replace(/p/gi, "d")
  );
  const match = regex.test(input);
  if (!match) {
    if (!isISO(input)) throw new Error("format does not match");
  }
  return match;
};

export default function parseDate(input: string) {
  if (!format) {
    getFormat();
  }
  if (!doesStringMatchFormat(input)) {
    const newDate = new Date(input);

    return new Date(
      newDate.getUTCFullYear(),
      newDate.getUTCMonth(),
      newDate.getUTCDate()
    );
  }
  var parts = input.match(/(\d+)/g),
    i = 0,
    fmt: { [key: string]: number } = {};
  format.replace(/(y+|d+|M+)/g, function(part: string) {
    fmt[part.charAt(0)] = i++;
    return part;
  });

  if (!parts) return;
  const year: number = fmt["y"];
  const month: number = fmt["M"];
  const day: number = fmt["d"];
  if (day === undefined || month === undefined || year === undefined) return;
  return new Date(+parts[year], +parts[month] - 1, +parts[day]);
}

export const toLocale = (date?: Date) => {
  if (!date) return;
  const string = date.toISOString();
  if (!format) {
    getFormat();
  }
  const [yearString, monthString, dayString] = string
    .replace(/T.+/gi, "")
    .split("-");
  const monthValue = +monthString;
  const dayValue = +dayString;
  return format
    .replace("yyyy", yearString)
    .replace("yy", yearString.substr(2))
    .replace("MM", monthString)
    .replace("M", "" + monthValue)
    .replace("dd", dayString)
    .replace("d", "" + dayValue);
};
