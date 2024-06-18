import React from 'react';
import CommonModal from './common/CommonModal';
import useCustomTheme from '../../hooks/useCustomTheme';
import { View } from 'react-native';
import CustomText from '../common/CustomText';
import CustomTextInput from '../common/CustomTextInput';

type Props = {
    onConfirm: () => void;
    closeModal: () => void;
};

const OptOutDialogModal = (props: Props) => {
    const { colors } = useCustomTheme();
    const { onConfirm, closeModal } = props;

    const buttons = [
        {
            content: '네 탈퇴할게요',
            onPress: onConfirm,
            backgroundColor: colors.caution,
            textColor: '#FFF',
        },
        {
            content: '좀 더 생각해볼게요',
            isCloseButton: true,
            onPress: closeModal,
        },
    ];

    return (
        <CommonModal buttons={buttons}>
            <View>
                <CustomText>
                    {'정말로 탈퇴하시겠어요?\n모든 데이터가 초기화 되고 되돌릴 수 없습니다!'}
                </CustomText>
                <CustomTextInput style={{}} autoFocus={true} />
            </View>
        </CommonModal>
    );
};

export default OptOutDialogModal;
