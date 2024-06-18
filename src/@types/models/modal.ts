import { ReactElement } from 'react';

export type ModalBaseType = {
    type: 'dialog' | 'bottomSheet' | 'toast';

    id?: string;
    content: ReactElement | string;
};

export type ModalButtonType = {
    type?: 'apply' | 'cancel';

    content: string;
    onPress?: () => void;

    backgroundColor?: string;
    textColor?: string;

    isCloseButton?: boolean;
};

export type ModalDataType =
    | (ModalBaseType & {
          type: 'dialog';
          buttons?: ModalButtonType[];

          backdrop?: boolean;
          closingByBackdrop?: boolean;

          onOpen?: () => void;
          onClose?: () => void;
      })
    | (ModalBaseType & {
          type: 'bottomSheet';
          buttons?: ModalButtonType[];

          backdrop?: boolean;
          closingByBackdrop?: boolean;

          onOpen?: () => void;
          onClose?: () => void;
      })
    | (ModalBaseType & { type: 'toast'; duration?: number });

export type ModalDataTypeWithId = ModalDataType & { id: string };

export type ModalDialogDataType = ModalDataTypeWithId & { type: 'dialog' };
export type ModalBottomSheetDataType = ModalDataTypeWithId & { type: 'bottomSheet' };
export type ModalToastDataType = ModalDataTypeWithId & { type: 'toast' };
