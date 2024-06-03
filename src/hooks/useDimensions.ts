import { useWindowDimensions } from 'react-native';
import { useCallback } from 'react';

const useDimensions = () => {
    const { width: windowWidth, height: windowHeight } = useWindowDimensions();

    const wp = useCallback(
        (ratio: number) => {
            return (windowWidth * ratio) / 100;
        },
        [windowWidth]
    );

    const hp = useCallback(
        (ratio: number) => {
            return (windowHeight * ratio) / 100;
        },
        [windowHeight]
    );

    return { wp, hp, windowWidth, windowHeight };
};

export default useDimensions;
