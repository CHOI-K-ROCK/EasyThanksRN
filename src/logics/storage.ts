import AsyncStroage from '@react-native-async-storage/async-storage';

const { setItem, getItem, getAllKeys, multiRemove } = AsyncStroage;

export const set = (key: string, value: string) => {
    return AsyncStroage.setItem(key, value);
};

export const get = (key: string) => {
    return AsyncStroage.getItem(key);
};

export const clearStorage = async () => {
    const allKeys = await getAllKeys();
    return multiRemove(allKeys);
};
