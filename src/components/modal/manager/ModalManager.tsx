import React from 'react';

import { useAtomValue } from 'jotai';
import { modals } from '../../../state/modal';

const ModalManager = () => {
    const openedModal = useAtomValue(modals);

    return openedModal.map((modal: { id: string; component: React.FC; props: any }) => {
        const { id, component, props } = modal;

        return <Component component={component} key={id} {...props} />;
    });
};
const Component = ({ component, ...rest }: { component: React.FC }) => {
    return component({ ...rest });
};

export default ModalManager;
