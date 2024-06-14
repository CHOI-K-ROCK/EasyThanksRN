import React from 'react';

import SafeAreaView from '../../components/common/SafeAreaView';
import MainNavigationBar from '../../components/main/MainNavigationBar';
import VectorIcon from '../../components/common/VectorIcon';

import { RootStackNavigationProps } from '../../@types/navigations/rootStack';

import { useNavigation } from '@react-navigation/native';
import useCustomTheme from '../../hooks/useCustomTheme';
import CustomText from '../../components/common/CustomText';
import useModal from '../../hooks/useModal';

const MainScreen = () => {
    const { colors } = useCustomTheme();
    const { openModal, clearModal } = useModal();
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
            <CustomText onPress={openModal} style={{ padding: 20 }}>
                modal add
            </CustomText>
            <CustomText onPress={clearModal} style={{ padding: 20 }}>
                modal del id = "test"
            </CustomText>
        </SafeAreaView>
    );
};

export default MainScreen;
