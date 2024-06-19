import { ReactElement } from 'react';

export type ModalType = {
    buttons?: ModalButtonType[];

    backdrop?: boolean;
    onPressBackdrop?: () => void;

    title?: string;
    text?: string;
    children?: ReactElement;
};

export type ModalButtonType = {
    type?: 'apply' | 'cancel';

    content: string;
    onPress?: () => void;

    backgroundColor?: string;
    textColor?: string;

    disabled?: boolean;
};
