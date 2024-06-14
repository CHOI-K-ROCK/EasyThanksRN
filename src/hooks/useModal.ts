import { useSetAtom } from 'jotai';
import { modals } from '../state/modal';

import { ModalType } from '../@types/models/modal';

const useModal = () => {
    const updateAtom = useSetAtom(modals);
    const openModal = (modalData: ModalType) => {
        // updateAtom(prev => [...prev, { id: `test_${prev.length}`, type: 'toast' }]); //! TEST
        updateAtom(prev => [...prev, modalData]); //! TEST
    };

    const closeModal = (modalId: string) => {
        updateAtom(prev => prev.filter(e => e.id !== modalId));
    };

    const clearModal = () => {
        updateAtom([]);
    };

    return { openModal, clearModal, closeModal };
};

export default useModal;
