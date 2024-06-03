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
