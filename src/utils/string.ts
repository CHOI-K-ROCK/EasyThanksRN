export const getRandomString = (stringList: string[]) => {
    const length = stringList.length;

    const index = Math.floor(Math.random() * length);

    return stringList[index];
};
