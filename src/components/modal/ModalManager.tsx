import { useAtomValue } from 'jotai';

import React, { forwardRef, useCallback } from 'react';
import { modals } from '../../state/modal';
import { Pressable, TouchableWithoutFeedback, View } from 'react-native';
import Dialog from './Dialog';
import BottomSheet from './BottomSheet';
import Toast from './Toast';
import { ModalDataType } from '../../@types/models/modal';
import useModal from '../../hooks/useModal';

const ModalManager = () => {
    const registeredModal = useAtomValue(modals);

    console.log('Redner');

    const renderModal = useCallback((props: ModalDataType) => {
        const { id, type } = props;

        switch (type) {
            case 'dialog':
                return <Dialog key={id} {...props} />;
            case 'toast':
                return <Toast key={id} {...props} />;
            case 'bottomSheet':
                return <BottomSheet key={id} {...props} />;
        }
    }, []);

    return registeredModal.map((modal: ModalDataType) => {
        return renderModal(modal);
    });
};

export default ModalManager;
