import React, { ReactElement } from 'react';

import { useAtomValue } from 'jotai';
import { toasts } from '../../state/modal';

import Toast from './Toast';

export type ToastDataType = {
    id?: string;
    type?: 'common' | 'complete' | 'caution' | 'error';
    content: string | ReactElement;
    duration?: number;
};
const ToastManager = () => {
    const openedToasts = useAtomValue(toasts);

    return openedToasts.map((toast: ToastDataType) => {
        return <Toast key={toast.id} {...toast} />;
    });
};

export default ToastManager;
