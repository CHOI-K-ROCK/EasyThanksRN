import { useEffect, useState } from 'react';
import { Keyboard, KeyboardEvent } from 'react-native';

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
