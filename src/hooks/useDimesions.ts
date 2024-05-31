import { useWindowDimensions } from 'react-native';

const useDimesions = () => {
    const { width: windowWidth, height: windowHeight } = useWindowDimensions();

    const wp = (ratio: number) => {
        return (windowWidth * ratio) / 100;
    };

    const hp = (ratio: number) => {
        return (windowHeight * ratio) / 100;
    };

    return { wp, hp, windowWidth, windowHeight };
};

export default useDimesions;
