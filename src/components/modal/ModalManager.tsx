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
    const { closeModal } = useModal();

    const registeredModal = useAtomValue(modals);

    const renderModal = useCallback((props: ModalDataType) => {
        const { id } = props;

        switch (props.type) {
            case 'dialog':
                return <Dialog key={id} {...props} />;
            case 'toast':
                return <Toast key={id} {...props} />;
            case 'bottomSheet':
                return <BottomSheet key={id} {...props} />;
        }
    }, []);

    return registeredModal.map((modal: ModalDataType & { id: string }) => {
        // 모달 등록 단계 (useModal.openModal) 에서 id를 보장하므로 위 처럼 타입을 확장하여 사용.
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
