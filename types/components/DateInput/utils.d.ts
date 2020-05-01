declare const windowDefined: boolean;
declare const getFirstDay: (date: Date) => number;
declare const getTotalDaysInMonth: (date: Date, add?: number) => number;
declare const getDays: (previousMonthLength: number, visibleMonthStartDay: number, visibleMonthLength: number, visibleMonthYear: number, visibleMonth: number) => ({
    day: number;
    incrementMonth: number;
    year: number;
    month?: undefined;
} | {
    day: number;
    incrementMonth: number;
    year: number;
    month: number;
})[];
declare const getWeeks: (days: any[]) => any[][];
declare const getMonthLabel: (month: number) => string;
declare const isISO: (date: any) => boolean;
declare const convertUTCtoLocale: (date: any) => any;
declare const getISODate: (date: Date) => string;
export { windowDefined, getWeeks, getMonthLabel, getDays, getTotalDaysInMonth, getFirstDay, convertUTCtoLocale, getISODate, isISO };
//# sourceMappingURL=utils.d.ts.map