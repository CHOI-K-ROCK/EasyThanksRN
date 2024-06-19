import React from 'react';

import SafeAreaView from '../../components/common/SafeAreaView';
import MainNavigationBar from '../../components/main/MainNavigationBar';
import VectorIcon from '../../components/common/VectorIcon';

import { RootStackNavigationProps } from '../../@types/navigations/rootStack';

import { useNavigation } from '@react-navigation/native';
import useCustomTheme from '../../hooks/useCustomTheme';
import useModal from '../../hooks/useModal';
import CustomText from '../../components/common/CustomText';

import { ModalDataType } from '../../@types/models/modal';
import useToast from '../../hooks/useToast';
import { ToastDataType } from '../../components/modal/ToastManager';

const MainScreen = () => {
    const { colors } = useCustomTheme();
    // const { openModal, clearModal } = useModal();
    const { openModal, closeModal } = useToast();
    const { navigate } = useNavigation<RootStackNavigationProps>();

    const toAppMenu = () => {
        navigate('SettingStack', {
            screen: 'SettingScreen',
        });
    };

    const dialogModalData: ModalDataType = {
        // id: uuid(),
        type: 'dialog',
        content: '정말로 탈퇴하시겠습니까?',
        onOpen: () => console.log('open'),
        onClose: () => console.log('close'),
        buttons: [
            { content: '네', onPress: () => console.log('뀨잉') },
            { content: '닫기', isCloseButton: true },
        ],
    };

    const bottomSheetModalData: ModalDataType = {
        // id: 'bottomSheet',
        type: 'bottomSheet',
        content: '슈우욱',
        buttons: [{ content: '네', onPress: () => console.log('뀨잉') }, { content: '닫기' }],
    };

    const ToastModalData: ToastDataType = {
        // id: 'toast',
        content: '🍞',
    };

    return (
        <SafeAreaView style={{ topAreaBackgroundColor: colors.tabBarBackground }}>
            <MainNavigationBar
                leftComponent={
                    <VectorIcon onPress={toAppMenu} name="cog" size={25} color={colors.text} />
                }
            />
            {/* <CustomText
                onPress={() => {
                    openModal({ ...dialogModalData });
                }}
                style={{ padding: 20 }}
            >
                dialog modal add
            </CustomText>
            <CustomText onPress={() => openModal(bottomSheetModalData)} style={{ padding: 20 }}>
                bottomSheet modal add
            </CustomText>
            */}
            <CustomText
                onPress={() => openModal(ToastModalData)}
                style={{ padding: 20, marginBottom: 100 }}
            >
                modal add
            </CustomText>

            {/* <CustomText onPress={clearModal} style={{ padding: 20 }}>
                clearModal
            </CustomText> */}
        </SafeAreaView>
    );
};

export default MainScreen;
