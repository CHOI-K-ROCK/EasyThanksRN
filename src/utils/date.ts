export const convertDateToString = (date: Date, format?: string) => {
    const nonPadValues = [
        date.getFullYear().toString(),
        (date.getMonth() + 1).toString(),
        date.getDate().toString(),
        date.getHours().toString(),
        date.getMinutes().toString(),
        date.getSeconds().toString(),
    ];

    const [year, month, day, hours, min, sec] = nonPadValues;

    const padValues = [
        month.padStart(2, '0'),
        day.padStart(2, '0'),
        hours.padStart(2, '0'),
        min.padStart(2, '0'),
        sec.padStart(2, '0'),
    ];
    const [padMonth, padDay, padHours, padMin, padSec] = padValues;

    switch (format) {
        case 'yyyy. mm. dd': {
            return [year, padMonth, padDay].join('. ');
        }
        default: {
            return [year, padMonth, padDay].join('. ');
        }
    }
};

/**
 *
 * @param initialDate - 초기값 설정 (Date)
 * @param {boolean} use24hours - 24시간제 사용여부 (boolean)
 * @returns year, month, day, hours, min, sec, dayOfWeek
 */
export const getDateStrings = (initialDate: Date, use24hours?: boolean) => {
    const date = new Date(initialDate);

    const hourDefault = date.getHours();
    const ampm = hourDefault < 12 ? 'am' : 'pm';

    const convertedHour = use24hours
        ? hourDefault
        : hourDefault > 12
            ? hourDefault - 12
            : hourDefault;

    return {
        year: '' + date.getFullYear(),
        month: '' + (date.getMonth() + 1),
        day: '' + date.getDate(),
        hours: '' + convertedHour,
        min: '' + date.getMinutes(),
        sec: '' + date.getSeconds(),
        dayOfWeek: date.getDay(),
        ampm,
    };
};

export const getDayOfWeekName = (day: number) => {
    const daysStringArr = ['일', '월', '화', '수', '목', '금', '토'];

    return daysStringArr[day];
};

export const getInitialPostNameByDate = (date: Date) => {
    const dateStrings = getDateStrings(date);
    const { year, month, day } = dateStrings;

    return `${year.slice(2)}년 ${month}월 ${day}일의 감사일기`;
};
