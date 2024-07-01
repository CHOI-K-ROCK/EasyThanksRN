import { useEffect, useState } from 'react';
import { Keyboard, KeyboardEvent } from 'react-native';

/**
 *
 * @returns keyboardHeight - 키보드 높이를 반환합니다.(number)
 * @returns isShow - 키보드가 보여지는지 여부를 반환합니다.(boolean)
 * @returns dismiss - 키보드를 숨깁니다.
 */

const useKeyboard = () => {
    const [keyboardHeight, setKeyboardHeight] = useState(0);
    const [isShow, setIsShow] = useState(false);

    useEffect(() => {
        const onKeyboardShow = (e: KeyboardEvent) => {
            setKeyboardHeight(e.endCoordinates.height);
            setIsShow(true);
        };

        const onKeyboardHide = () => {
            setKeyboardHeight(0);
            setIsShow(false);
        };

        const showSubscription = Keyboard.addListener('keyboardWillShow', onKeyboardShow);
        const hideSubscription = Keyboard.addListener('keyboardWillHide', onKeyboardHide);
        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);

    return { keyboardHeight, isShow, dismiss: Keyboard.dismiss };
};

export default useKeyboard;
