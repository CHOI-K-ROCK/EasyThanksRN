import React from 'react';

import { useAtomValue } from 'jotai';
import { toasts } from '../../../state/modal';

import Toast from '../common/Toast';
import { ToastType } from '../../../@types/models/toast';

const ToastManager = () => {
    const openedToasts = useAtomValue(toasts);

    return openedToasts.map((toast: ToastType) => {
        return <Toast key={toast.id} {...toast} />;
    });
};

export default ToastManager;
