import React from 'react';

import { useAtomValue } from 'jotai';
import { modals } from '../../../state/modal';

const ModalManager = () => {
    const openedModal = useAtomValue(modals);

    return openedModal.map((modal: { id: string; component: React.FC }) => {
        const { id, component } = modal;
        const ModalComponent = () => component({});

        return <ModalComponent key={id} />;
    });
};

export default ModalManager;
