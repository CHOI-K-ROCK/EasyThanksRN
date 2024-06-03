import { useWindowDimensions } from 'react-native';
import { useCallback } from 'react';

/**
 * 
 * @returns wp - 비율에 따라 디바이스 너비 반환 매소드 / wp(비율)
 * @returns hp - 비율에 따라 디바이스 높이 반환 매소드 / wp(높이)
 * @returns windowWidth - 디바이스의 화면 너비 반환 
 * @returns windowHeight - 디바이스의 화면 높이 반환 
 */
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
