import { ReactNode } from 'react';

export type ModalBaseType = {
    type: 'dialog' | 'bottomSheet' | 'toast';

    id?: string;
    content: ((modalId: string) => ReactNode) | string;
};

export type ModalButtonType = {
    type?: 'default' | 'close';

    content: string | ReactNode;
    onPress?: () => void;

    backgroundColor?: string;
    textColor?: string;
};

export type ModalDataType =
    | (ModalBaseType & { type: 'dialog' } & { buttons?: ModalButtonType[] })
    | (ModalBaseType & { type: 'bottomSheet' } & { buttons?: ModalButtonType[] })
    | (ModalBaseType & { type: 'toast' } & { duration?: number });
