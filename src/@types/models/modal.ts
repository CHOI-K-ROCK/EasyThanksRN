import { ReactNode } from 'react';

export type ModalBaseType = {
    type: 'dialog' | 'bottomSheet' | 'toast';

    id?: string;
    content: ReactNode | string;
};

export type ModalButtonType = {
    content: string | ReactNode;
    onPress?: () => void;

    backgroundColor?: string;
    textColor?: string;
};

export type ModalDialogDataType = ModalBaseType & {
    type: 'dialog';
    buttons?: ModalButtonType[];
};
export type ModalBottomSheetDataType = ModalBaseType & {
    type: 'bottomSheet';
    buttons?: ModalButtonType[];
};
export type ModalToastDataType = ModalBaseType & {
    type: 'toast';
    duration?: number;
};

export type ModalDataType = ModalDialogDataType | ModalBottomSheetDataType | ModalToastDataType;
