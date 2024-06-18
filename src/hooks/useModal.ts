import { useSetAtom } from 'jotai';

import { modals } from '../state/modal';

import { ModalDataType } from '../@types/models/modal';

import useUuid from './useUuid';
import React, { ReactElement, useCallback } from 'react';

/**
 *
 * 모달 관리를 위한 훅
 * @params component - 열고자하는 모달 컴포넌트를 전달받습니다.
 * @returns openModal - 전달받은 모달 컴포넌트를 오픈합니다.
 * @returns closeModal - 아이디를 전달 받고 해당 모달을 닫습니다.
 * @returns clearModal - 모든 모달을 닫습니다.
 *
 */
const useModal = (component: React.FC) => {
    const updateModalAtom = useSetAtom(modals);
    const uuid = useUuid();
    const id = uuid(); // useId 사용가능.

    const openModal = useCallback(() => {
        updateModalAtom(prev => [...prev, { id, component }]);
    }, [component, id, updateModalAtom]);

    const closeModal = useCallback(() => {
        updateModalAtom(prev => prev.filter(e => e.id !== id));
        // 동작하는 이유 -> 각 훅의 호출 마다 서로 다른 컨텍스트가 구성되므로,
        // id 가 새로이 생성됨.
    }, [id, updateModalAtom]);

    const clearModal = useCallback(() => {
        updateModalAtom([]);
    }, [updateModalAtom]);

    return { openModal, closeModal, clearModal };
};

export default useModal;
