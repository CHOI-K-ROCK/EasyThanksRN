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

export const base64ToArrayBuffer = (base64: string) => {
    // Base64 디코딩
    const binaryString = atob(base64);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);

    // Uint8Array로 변환
    for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }

    // ArrayBuffer로 변환
    return bytes.buffer;
};
