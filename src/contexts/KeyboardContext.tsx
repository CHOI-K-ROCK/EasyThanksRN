import React, { ReactNode, createContext, useEffect, useState } from 'react';
import { Keyboard, KeyboardEvent } from 'react-native';

const KeyboardContext = createContext({
    keyboardHeight: 0,
    isShow: false,
    dismiss: () => { },
});

const KeyboardContextProvider = ({ children }: { children: ReactNode }) => {
    const [keyboardHeight, setKeyboardHeight] = useState(0);
    const [isShow, setIsShow] = useState(false);
    const dismiss = () => Keyboard.dismiss();

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

    return (
        <KeyboardContext.Provider value={{ keyboardHeight, isShow, dismiss }}>
            {children}
        </KeyboardContext.Provider>
    );
};

export { KeyboardContext, KeyboardContextProvider };
