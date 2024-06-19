import { useSetAtom } from 'jotai';

import { toasts } from '../state/modal';

import { ModalDataType } from '../@types/models/modal';

import useUuid from './useUuid';
import React, { useCallback } from 'react';
import { ToastDataType } from '../components/modal/manager/ToastManager';

/**
 *
 * 모달 관리를 위한 훅
 * @returns openModal - 전달받은 데이터로 토스트를 오픈합니다.
 * @returns closeModal - 아이디를 전달 받고 해당 토스트를 닫습니다.
 * @returns clearModal - 모든 토스트를 닫습니다.
 *
 */
const useToast = () => {
    const updateModalAtom = useSetAtom(toasts);
    const uuid = useUuid(); // useId 사용가능.

    const openModal = useCallback(
        (toastData: ToastDataType) => {
            updateModalAtom(prev => [...prev, { ...toastData, id: toastData.id || uuid() }]);
        },
        [updateModalAtom, uuid]
    );

    const closeModal = useCallback(
        (id: string) => {
            updateModalAtom(prev => prev.filter(e => e.id !== id));
        },
        [updateModalAtom]
    );

    const clearModal = useCallback(() => {
        updateModalAtom([]);
    }, [updateModalAtom]);

    return { openModal, closeModal, clearModal };
};

export default useToast;
