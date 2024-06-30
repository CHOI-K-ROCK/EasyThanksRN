import React from 'react';

import { useRecoilValue } from 'recoil';
import { modalsAtom } from '../../state/ui';

const ModalProvider = () => {
    const openedModal = useRecoilValue(modalsAtom);

    return openedModal.map((modal: { id: string; component: React.FC; props: any }) => {
        const { id, component, props } = modal;

        return <Component component={component} key={id} {...props} />;
    });
};
const Component = ({ component, ...rest }: { component: React.FC }) => {
    return component({ ...rest });
};

export default ModalProvider;
