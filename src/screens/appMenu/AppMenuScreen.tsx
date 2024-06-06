import React, { useCallback } from 'react';

import { FlatList, ListRenderItem } from 'react-native';
import SafeAreaView from '../../components/common/SafeAreaView';
import ScreenLayout from '../../components/common/ScreenLayout';
import InnerNavigationBar from '../../components/common/InnerNavigationBar';
import UserProfileView from '../../components/appMenu/UserProfileView';
import AppMenuListItem from '../../components/appMenu/AppMenuListItem';

import useCustomTheme from '../../hooks/useCustomTheme';
import { useNavigation } from '@react-navigation/native';
import { AppMenuScreenNavigationProps } from '../../@types/navigations/appMenuStack';
import { DUMMY_PROFILE } from '../../constant/dummy';

export type AppMenuDataType = {
    title: string;
    subtitle: string;
    onPress: () => void;
};

const AppMenuScreen = () => {
    const { navigate, goBack } = useNavigation<AppMenuScreenNavigationProps>();
    const { colors } = useCustomTheme();

    const handleLogout = () => {
        console.log('logout logic excute');
    };

    const onPressEditUserProfile = () => {
        navigate('UserProfileEditScreen');
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

    const renderListItem: ListRenderItem<AppMenuDataType> = useCallback(({ item }) => {
        return <AppMenuListItem {...item} />;
    }, []);

    return (
        <SafeAreaView>
            <InnerNavigationBar screenTitle={'메뉴'} goBack={goBack} />
            <ScreenLayout>
                <FlatList
                    data={menus}
                    ListHeaderComponent={
                        <UserProfileView
                            userData={DUMMY_PROFILE}
                            onPressEdit={onPressEditUserProfile}
                        />
                    }
                    renderItem={renderListItem}
                    keyExtractor={(_, index) => index.toString()}
                />
            </ScreenLayout>
        </SafeAreaView>
    );
};

export default AppMenuScreen;
