import React, { useCallback } from 'react';

import { FlatList, ListRenderItem, StyleSheet } from 'react-native';
import SafeAreaView from '../../components/common/SafeAreaView';
import InnerNavigationBar from '../../components/common/InnerNavigationBar';
import UserProfileView from '../../components/setting/UserProfileView';
import SettingListItem from '../../components/setting/SettingMenuListItem';
import SettingFooter from '../../components/setting/SettingFooter';

import { SettingScreenNavigationProps } from '../../@types/navigations/settingStack';

import { useNavigation } from '@react-navigation/native';

import { DUMMY_PROFILE } from '../../constant/dummy';
import { HORIZONTAL_GAP } from '../../constant/style';

export type SettingDataType = {
    title: string;
    subtitle: string;
    onPress: () => void;
};

const SettingScreen = () => {
    const { navigate, goBack } = useNavigation<SettingScreenNavigationProps>();

    const handleLogout = () => {
        console.log('logout logic excute');
    };

    const onPressEditUserProfile = () => {
        navigate('UserProfileEditScreen', { userData: DUMMY_PROFILE });
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
            <InnerNavigationBar screenTitle={'설정'} goBack={goBack} />
            <FlatList
                data={menus}
                renderItem={renderListItem}
                keyExtractor={(_, index) => index.toString()}
                style={styles.list}
                ListHeaderComponent={
                    <UserProfileView
                        userData={DUMMY_PROFILE}
                        onPressEdit={onPressEditUserProfile}
                    />
                }
                ListHeaderComponentStyle={styles.header}
                ListFooterComponent={<SettingFooter onPressOpenSource={onPressOpenSource} />}
                ListFooterComponentStyle={styles.footer}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    list: {
        paddingHorizontal: HORIZONTAL_GAP,
    },
    header: {
        marginVertical: 20,
    },
    footer: {
        marginTop: 30,
    },
});

export default SettingScreen;
