import React, { useCallback } from 'react';

import { FlatList, ListRenderItem, StyleSheet } from 'react-native';
import SafeAreaView from '../../components/common/SafeAreaView';
import ScreenLayout from '../../components/common/ScreenLayout';
import InnerNavigationBar from '../../components/common/InnerNavigationBar';
import UserProfileView from '../../components/setting/UserProfileView';
import SettingListItem from '../../components/setting/SettingMenuListItem';

import useCustomTheme from '../../hooks/useCustomTheme';
import { useNavigation } from '@react-navigation/native';
import { SettingScreenNavigationProps } from '../../@types/navigations/settingStack';
import { DUMMY_PROFILE } from '../../constant/dummy';
import SettingFooter from '../../components/setting/SettingFooter';

export type SettingDataType = {
    title: string;
    subtitle: string;
    onPress: () => void;
};

const SettingScreen = () => {
    const { navigate, goBack } = useNavigation<SettingScreenNavigationProps>();
    const { colors } = useCustomTheme();

    const handleLogout = () => {
        console.log('logout logic excute');
    };

    const onPressEditUserProfile = () => {
        navigate('UserProfileEditScreen');
    };

    const onPressOpenSource = () => {
        navigate('OpenSourceScreen');
    };

    const menus: SettingDataType[] = [
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

    const renderListItem: ListRenderItem<SettingDataType> = useCallback(({ item }) => {
        return <SettingListItem {...item} />;
    }, []);

    return (
        <SafeAreaView>
            <InnerNavigationBar screenTitle={'메뉴'} goBack={goBack} />
            <ScreenLayout>
                <FlatList
                    data={menus}
                    renderItem={renderListItem}
                    keyExtractor={(_, index) => index.toString()}
                    ListHeaderComponent={
                        <UserProfileView
                            userData={DUMMY_PROFILE}
                            onPressEdit={onPressEditUserProfile}
                        />
                    }
                    ListFooterComponent={<SettingFooter onPressOpenSource={onPressOpenSource} />}
                    ListFooterComponentStyle={styles.footer}
                />
            </ScreenLayout>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    footer: {
        marginTop: 30,
    },
});

export default SettingScreen;
