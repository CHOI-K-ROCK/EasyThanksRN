import { ReactNode } from 'react';

export type ModalBaseType = {
    type: 'dialog' | 'bottomSheet' | 'toast';
    id: string;
    content: ((modalId: string) => ReactNode) | string;
};

export type ModalButtonType = {
    type: 'close' | undefined;
    content: string | ReactNode;
    backgroundColor?: string;
    textColor?: string;
};

export type ModalType =
    | (ModalBaseType & { type: 'dialog' } & { buttons?: ModalButtonType[] })
    | (ModalBaseType & { type: 'bottomSheet' } & { buttons?: ModalButtonType[] })
    | (ModalBaseType & { type: 'toast' } & { duration?: number });
