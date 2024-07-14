import { ReactElement } from 'react';

export type CommonModalType = {
    buttons?: CommonModalButtonType[];

    backdrop?: boolean;
    onPressBackdrop?: () => void;

    title?: string;
    text?: string;
    children?: ReactElement;
};

export type CommonModalButtonType = {
    type?: 'apply' | 'cancel';

    content: string;
    onPress?: () => void;

    backgroundColor?: string;
    textColor?: string;

    disabled?: boolean;
};
