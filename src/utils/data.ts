export const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export const getRandomArrayValue = (array: any[]) => {
    const length = array.length;

    const index = Math.floor(Math.random() * length);

    return array[index];
};

export const arrayToObjectUsingRefKey = (refKey: string, data: any[]) => {
    if (data.length === 0) {
        console.log('data length 0');
        return {};
    }
    if (data[0][refKey] === refKey) {
        console.log('there is no such a key' + refKey);
        return {};
    }

    return data.reduce((acc, cur) => {
        if (acc[cur[refKey]] === undefined) {
            acc[cur[refKey]] = cur;
        }

        return acc;
    }, {});
};
