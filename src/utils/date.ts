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
 * @param {boolean} pad - 자리채움 여부 (boolean)
 * @param {boolean} convertDayOfWeek - 요일 변환 여부 (1 = 월)(boolean)
 * @returns year, month, day, hours, min, sec, dayOfWeek
 */
export const getDateStrings = (initialDate: Date, pad: boolean, convertDayOfWeek: boolean) => {
    const date = new Date(initialDate);
    const days = ['일', '월', '화', '수', '목', '금', '토'];

    const dayOfWeek = date.getDay();

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

    const resDate = {
        year,
        month: pad ? padMonth : month,
        day: pad ? padDay : day,
        hours: pad ? padHours : hours,
        min: pad ? padMin : min,
        sec: pad ? padSec : sec,
        dayOfWeek: convertDayOfWeek ? days[dayOfWeek] : dayOfWeek,
    };

    return { ...resDate };
};
