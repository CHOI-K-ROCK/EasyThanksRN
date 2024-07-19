import { ReactElement } from 'react';

export type CommonModalType = {
    buttons?: CommonModalButtonType[];

    backdrop?: boolean;
    onPressBackdrop?: () => void;

    title?: string;
    titleIcon?: ReactElement;
    text?: string;

    children?: ReactElement;
    childrenPosition?: 'top' | 'bottom';
};

export type CommonModalButtonType = {
    type?: 'apply' | 'cancel';

    content: string;
    onPress?: () => void;

    backgroundColor?: string;
    textColor?: string;

    disabled?: boolean;
};
