import React, { ReactElement } from 'react';

import { useAtomValue } from 'jotai';
import { toasts } from '../../../state/modal';

import Toast from '../common/Toast';

export type ToastDataType = {
    id?: string;
    type?: 'common' | 'complete' | 'caution' | 'error';
    text?: string;
    component?: ReactElement;
    duration?: number;
    autoClose?: boolean;
};
const ToastManager = () => {
    const openedToasts = useAtomValue(toasts);

    return openedToasts.map((toast: ToastDataType & { id: string }) => {
        return <Toast key={toast.id} {...toast} />;
    });
};

export default ToastManager;
