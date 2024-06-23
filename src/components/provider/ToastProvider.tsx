import React from 'react';

import { useAtomValue } from 'jotai';
import { toasts } from '../../state/ui';

import Toast from '../modal/common/Toast';
import { ToastType } from '../../@types/models/toast';

const ToastProvider = () => {
    const openedToasts = useAtomValue(toasts);

    return openedToasts.map((toast: ToastType) => {
        return <Toast key={toast.id} {...toast} />;
    });
};

export default ToastProvider;
