import React from 'react';

import SafeAreaView from '../../components/common/SafeAreaView';
import TempScreen from '../../components/common/TempScreen';
import { useNavigation } from '@react-navigation/native';
import { AppMenuScreenNavigationProps } from '../../@types/navigations/appMenuStack';
import AppMenuList from '../../components/appMenu/AppMenuList';
import ScreenLayout from '../../components/common/ScreenLayout';
import CustomText from '../../components/common/CustomText';
import { View } from 'react-native';
import VectorIcon from '../../components/common/VectorIcon';
import InnerNavigationBar from '../../components/common/InnerNavigationBar';

export type AppMenuDataType = {
    title: string;
    subtitle: string;
    onPress: () => void;
};

const AppMenuScreen = () => {
    const { navigate, goBack } = useNavigation<AppMenuScreenNavigationProps>();

    const handleLogout = () => {
        console.log('logout logic excute');
    };

    const menus: AppMenuDataType[] = [
        {
            title: '알림',
            subtitle: '설정한 감사 알림을 확인 할 수 있습니다.',
            onPress: () => navigate('NotificationScreen'),
        },
        {
            title: '로그아웃',
            subtitle: '앱에서 로그아웃 합니다.',
            onPress: handleLogout,
        },
    ];

    return (
        <SafeAreaView>
            <InnerNavigationBar goBack={goBack} />
            <ScreenLayout>
                <AppMenuList menus={menus} />
            </ScreenLayout>
        </SafeAreaView>
    );
};

export default AppMenuScreen;
