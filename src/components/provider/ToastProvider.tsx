import React from 'react';

import { useRecoilValue } from 'recoil';
import { toastsAtom } from 'states/ui';

import Toast from 'components/modal/common/Toast';
import { ToastType } from 'types/models/toast';

const ToastProvider = () => {
    const openedToasts = useRecoilValue(toastsAtom);

    return openedToasts.map((toast: ToastType, idx) => {
        return <Toast key={toast.id} idx={idx} {...toast} />;
    });
};

export default ToastProvider;
