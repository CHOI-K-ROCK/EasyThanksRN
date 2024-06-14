import { useAtomValue } from 'jotai';

import React, { forwardRef, useCallback } from 'react';
import { modals } from '../../state/modal';
import { Pressable, TouchableWithoutFeedback, View } from 'react-native';
import Dialog from './Dialog';
import BottomSheet from './BottomSheet';
import Toast from './Toast';
import { ModalType } from '../../@types/models/modal';
import useModal from '../../hooks/useModal';

const ModalManager = () => {
    const { closeModal } = useModal();

    const registeredModal = useAtomValue(modals);

    const renderModal = useCallback((props: ModalType) => {
        switch (props.type) {
            case 'dialog':
                return <Dialog {...props} />;
            case 'toast':
                return <Toast {...props} />;
            case 'bottomSheet':
                return <BottomSheet {...props} />;
        }
    }, []);

    return registeredModal.map((modal: ModalType) => {
        const { id } = modal;

        return (
            <Pressable
                key={id}
                onPress={() => closeModal(id)}
                style={{
                    position: 'absolute',
                    zIndex: 1,
                    top: '50%',
                    left: '50%',
                    padding: 20,
                    backgroundColor: '#88888810',
                }}
            >
                {renderModal(modal)}
            </Pressable>
        );
    });
};

export default ModalManager;
