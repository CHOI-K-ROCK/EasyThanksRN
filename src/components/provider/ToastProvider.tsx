import React from 'react';

import { useRecoilValue } from 'recoil';
import { toastsAtom } from '../../state/ui';

import Toast from '../modal/common/Toast';
import { ToastType } from '../../@types/models/toast';

const ToastProvider = () => {
    const openedToasts = useRecoilValue(toastsAtom);

    return openedToasts.map((toast: ToastType) => {
        return <Toast key={toast.id} {...toast} />;
    });
};

export default ToastProvider;
