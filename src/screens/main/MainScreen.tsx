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
import { ToastDataType } from '../../components/modal/manager/ToastManager';
import { View } from 'react-native';

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

    return (
        <SafeAreaView style={{ topAreaBackgroundColor: colors.tabBarBackground }}>
            <MainNavigationBar
                leftComponent={
                    <VectorIcon onPress={toAppMenu} name="cog" size={25} color={colors.text} />
                }
            />
            <CustomText
                onPress={() =>
                    openModal({
                        type: 'common',
                        text: '🍞',
                        autoClose: false,
                    })
                }
                style={{ padding: 20, marginBottom: 40 }}
            >
                modal common
            </CustomText>
            <CustomText
                onPress={() =>
                    openModal({
                        type: 'caution',
                        text: '🍞',
                        component: (
                            <View style={{ backgroundColor: 'red', width: 20, height: 20 }} />
                        ),
                    })
                }
                style={{ padding: 20, marginBottom: 40 }}
            >
                modal caution
            </CustomText>
            <CustomText
                onPress={() =>
                    openModal({
                        type: 'complete',
                        text: '🍞',
                    })
                }
                style={{ padding: 20, marginBottom: 40 }}
            >
                modal complete
            </CustomText>
            <CustomText
                onPress={() =>
                    openModal({
                        type: 'error',
                        text: '🍞',
                    })
                }
                style={{ padding: 20, marginBottom: 40 }}
            >
                modal error
            </CustomText>

            {/* <CustomText onPress={clearModal} style={{ padding: 20 }}>
                clearModal
            </CustomText> */}
        </SafeAreaView>
    );
};

export default MainScreen;
