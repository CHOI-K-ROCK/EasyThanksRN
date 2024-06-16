import React, { useCallback } from 'react';

import { useAtomValue } from 'jotai';
import { modals } from '../../state/modal';

import { StyleSheet, View } from 'react-native';
import Dialog from './Dialog';
import BottomSheet from './BottomSheet';
import Toast from './Toast';

import { ModalDataTypeWithId } from '../../@types/models/modal';

import useKeyboard from '../../hooks/useKeyboard';

const ModalManager = () => {
    const openedModal = useAtomValue(modals);
    const { keyboardHeight } = useKeyboard();

    const renderModal = useCallback((props: ModalDataTypeWithId) => {
        // useModal 을 이용하여 데이터가 추가될때 id가 생성되므로, ModalDataTypeWithId 타입 사용.
        const { type } = props;

        switch (type) {
            case 'dialog':
                return <Dialog {...props} />;
            case 'toast':
                return <Toast {...props} />;
            case 'bottomSheet':
                return <BottomSheet {...props} />;
            // case 'raw':
            //     return <BottomSheet {...props} />;
        }
    }, []);

    return (
        openedModal.length > 0 && (
            <View style={[{ ...StyleSheet.absoluteFillObject, bottom: keyboardHeight }]}>
                {openedModal.map((modal: ModalDataTypeWithId) => {
                    return <React.Fragment key={modal.id}>{renderModal(modal)}</React.Fragment>;
                })}
            </View>
        )
    );
};

export default ModalManager;
