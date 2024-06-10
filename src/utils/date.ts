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

type optionsType = {
    isPad?: boolean;
    is12?: boolean;
};

/**
 *
 * @param initialDate - 초기값 설정 (Date)
 * @param {boolean} pad - 자리채움 여부 (boolean)
 * @param {boolean} convertDayOfWeek - 요일 변환 여부 => 0, 1, 2 <-> 일, 월, 화 (boolean)
 * @returns year, month, day, hours, min, sec, dayOfWeek
 */
export const getDateStrings = (initialDate: Date, options: optionsType) => {
    const { isPad = true, is12 = false } = options;

    const date = new Date(initialDate);

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
    const convertedHour = is12 ? (+hours > 12 ? '' + (+hours - 12) : hours) : hours;

    const padValues = [
        month.padStart(2, '0'),
        day.padStart(2, '0'),
        convertedHour.padStart(2, '0'),
        min.padStart(2, '0'),
        sec.padStart(2, '0'),
    ];
    const [padMonth, padDay, padHours, padMin, padSec] = padValues;

    const ampm = hours < '' + 12 ? 'am' : 'pm';

    const resDate = {
        year,
        month: isPad ? padMonth : month,
        day: isPad ? padDay : day,
        hours: isPad ? padHours : hours,
        min: isPad ? padMin : min,
        sec: isPad ? padSec : sec,
        dayOfWeek,
        ampm,
    };

    return { ...resDate };
};

export const getDayOfWeekName = (day: number) => {
    const daysStringArr = ['일', '월', '화', '수', '목', '금', '토'];

    return daysStringArr[day];
};
