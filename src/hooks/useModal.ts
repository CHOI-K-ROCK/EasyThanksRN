import { useSetAtom } from 'jotai';

import { modals } from '../state/modal';

import { ModalDataType } from '../@types/models/modal';

import useUuid from './useUuid';

/**
 *
 * 모달 관리를 위한 훅
 *
 * @returns openModal - 모달 데이터를 받아 모달 오픈 (ModalDataType 참조)
 * @returns closeModal - 아이디를 전달 받고 해당 모달을 닫습니다.
 * @returns clearModal - 모든 모달을 닫습니다.
 *
 */
const useModal = () => {
    const updateAtom = useSetAtom(modals);
    const uuid = useUuid();

    const openModal = (modalData: ModalDataType) => {
        const id = modalData.id || uuid(); // 아이디 없는 경우 새로 생성.
        const modalWithId = {
            ...modalData,
            id,
        } as ModalDataType & { id: string }; // id가 항상 존재함을 보장

        updateAtom(prev => [...prev, modalWithId]);
    };

    const closeModal = (modalId: string) => {
        updateAtom(prev => prev.filter(e => e.id !== modalId));
    };

    const clearModal = () => {
        updateAtom([]);
    };

    return { openModal, closeModal, clearModal };
};

export default useModal;
