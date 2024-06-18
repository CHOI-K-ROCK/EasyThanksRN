import React from 'react';

import { useAtomValue } from 'jotai';
import { modals } from '../../state/modal';

const ModalManager = () => {
    const openedModal = useAtomValue(modals);

    return openedModal.map((modal: { id: string; component: React.FC }) => {
        const { id, component } = modal;

        return <Component key={id} component={component} />;
    });
};
const Component = ({ component, ...rest }: { component: React.FC }) => {
    return component({ ...rest });
};

export default ModalManager;
