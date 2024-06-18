import React, { useCallback } from 'react';
import CommonModal from './common/CommonModal';
import useCustomTheme from '../../hooks/useCustomTheme';
import { View } from 'react-native';
import CustomText from '../common/CustomText';
import CustomTextInput from '../common/CustomTextInput';
import useInput from '../../hooks/useInput';
import { ModalButtonType } from '../../@types/models/modal';

type Props = {
    onConfirm: () => void;
    closeModal: () => void;
};

const OptOutDialogModal = (props: Props) => {
    const { colors } = useCustomTheme();
    const { value, handleChange } = useInput();
    const { onConfirm, closeModal } = props;

    const handleConfirm = useCallback(
        (close: () => void) => {
            onConfirm();
            close();
        },
        [onConfirm]
    );

    const buttons: ModalButtonType[] = [
        {
            content: '네 탈퇴할게요',
            onPress: handleConfirm,
            backgroundColor: colors.caution,
            textColor: '#FFF',
        },
        {
            content: '좀 더 생각해볼게요',
            isCloseButton: true,
            onPress: close => close(),
        },
    ];

    return (
        <CommonModal buttons={buttons} closeModal={closeModal}>
            <CustomText>
                {'정말로 탈퇴하시겠어요?\n모든 데이터가 초기화 되고 되돌릴 수 없습니다!'}
            </CustomText>
            <CustomTextInput value={value} onChangeText={handleChange} autoFocus />
        </CommonModal>
    );
};

export default OptOutDialogModal;
