import React from 'react';

import CommonModal from './common/CommonModal';
import CustomText from '../common/CustomText';
import CustomTextInput from '../common/CustomTextInput';

import useCustomTheme from '../../hooks/useCustomTheme';
import { ModalButtonType } from '../../@types/models/modal';

import useInput from '../../hooks/useInput';

type Props = {
    onConfirm: () => void;
    closeModal: () => void;
};

const OptOutDialogModal = (props: Props) => {
    const { colors } = useCustomTheme();
    const { value, handleChange } = useInput();
    const { onConfirm, closeModal } = props;

    const handleConfirm = () => {
        onConfirm();
    };

    const buttons: ModalButtonType[] = [
        {
            content: '네 탈퇴할게요',
            onPress: handleConfirm,
            backgroundColor: colors.caution,
            textColor: '#FFF',
        },
        {
            content: '좀 더 생각해볼게요',
            onPress: closeModal,
        },
    ];

    return (
        <CommonModal buttons={buttons} onPressBackdrop={closeModal}>
            <CustomText>
                {'정말로 탈퇴하시겠어요?\n모든 데이터가 초기화 되고 되돌릴 수 없습니다!'}
            </CustomText>
            <CustomTextInput value={value} onChangeText={handleChange} autoFocus />
        </CommonModal>
    );
};

export default OptOutDialogModal;
