import { getDateStrings } from './date';

export const getInitialPostNameByDate = (date: Date) => {
    const dateStrings = getDateStrings(date);
    const { year, month, day } = dateStrings;

    return `${year.slice(2)}년 ${month}월 ${day}일의 감사일기`;
};
