import { ReactElement } from 'react';

export type ToastCreateType = {
    id?: string;
    type?: 'common' | 'complete' | 'caution' | 'error';

    text?: string;
    component?: ReactElement;

    duration?: number;
    autoClose?: boolean;
};

export type ToastType = {
    id: string;
    type?: 'common' | 'complete' | 'caution' | 'error';

    text?: string;
    component?: ReactElement;

    duration?: number;
    autoClose?: boolean;
};
