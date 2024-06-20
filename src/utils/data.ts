export const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export const getRandomArrayValue = (array: any[]) => {
    const length = array.length;

    const index = Math.floor(Math.random() * length);

    return array[index];
};
