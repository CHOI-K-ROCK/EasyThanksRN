import React, { useReducer, useState } from 'react';

import SafeAreaView from 'components/common/SafeAreaView';
import MainNavigationBar from 'components/main/MainNavigationBar';
import VectorIcon from 'components/common/VectorIcon';

import { RootStackNavigationProps } from 'types/navigations/rootStack';

import { useNavigation } from '@react-navigation/native';
import useCustomTheme from 'hooks/useCustomTheme';
import CustomText from 'components/common/CustomText';

import { View } from 'react-native';
import useDimensions from 'hooks/useDimensions';
import useAuth from 'hooks/useAuth';
import useAppTheme from 'hooks/useAppTheme';
import useLoading from 'hooks/useLoading';
import useDelay from 'hooks/useDelay';
import BottomSheet from 'components/modal/common/BottomSheet';
import useToast from 'hooks/useToast';

const MainScreen = () => {
    const { colors } = useCustomTheme();
    const { setLoading } = useLoading();
    const { logout } = useAuth();
    const delay = useDelay();

    const { navigate } = useNavigation<RootStackNavigationProps>();
    const { setCurrentAppTheme } = useAppTheme();

    const toAppMenu = () => {
        navigate('SettingStack', {
            screen: 'SettingScreen',
        });
    };

    const handleLogout = async () => {
        setLoading(true);
        await delay(500);
        await logout();
        setLoading(false);
    };

    const [visible, toggleVisible] = useReducer(prev => !prev, false);
    console.log(visible);

    const { openToast } = useToast();
    const open = () => {
        openToast({ text: 'hell' });
    };

    return (
        <SafeAreaView topAreaBackgroundColor={colors.tabBarBackground}>
            <MainNavigationBar
                leftComponent={
                    <VectorIcon onPress={toAppMenu} name="cog" size={25} color={colors.text} />
                }
            />
            <View style={{ gap: 20 }}>
                <CustomText style={{ fontSize: 25, marginTop: 20 }} onPress={toggleVisible}>
                    toggleBottomSheet
                </CustomText>
            </View>
            <BottomSheet visible={visible} onPressBackdrop={toggleVisible}>
                <View
                    style={{
                        height: 200,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#DDD',
                    }}
                >
                    <CustomText onPress={open} style={{ fontSize: 24, fontWeight: 700 }}>
                        bottom sheet content
                    </CustomText>
                </View>
            </BottomSheet>
        </SafeAreaView>
    );
};

export default MainScreen;
