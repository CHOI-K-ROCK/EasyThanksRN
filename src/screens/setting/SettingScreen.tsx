import React, { useCallback } from 'react';

import { useRecoilValue } from 'recoil';
import { userDataAtom } from '../../recoil/user';

import { FlatList, ListRenderItem, StyleSheet } from 'react-native';
import SafeAreaView from '../../components/common/SafeAreaView';
import InnerNavigationBar from '../../components/common/InnerNavigationBar';
import UserProfileView from '../../components/setting/UserProfileView';
import SettingListItem from '../../components/setting/SettingMenuListItem';
import SettingFooter from '../../components/setting/SettingFooter';

import { SettingScreenNavigationProps } from '../../@types/navigations/settingStack';
import { UserEditDataType } from '../../@types/models/user';

import { useNavigation } from '@react-navigation/native';

import { HORIZONTAL_GAP } from '../../constant/style';
import useAuth from '../../hooks/useAuth';
import CommonModal from '../../components/modal/common/CommonModal';
import useModal from '../../hooks/useModal';

export type SettingDataType = {
    title: string;
    subtitle: string;
    onPress: () => void;
};

const SettingScreen = () => {
    const { navigate, goBack } = useNavigation<SettingScreenNavigationProps>();
    const { logout } = useAuth();

    const userData = useRecoilValue(userDataAtom) as UserEditDataType;

    const { openModal, closeModal } = useModal(() => (
        <CommonModal
            text="로그아웃 하시겠어요?"
            onPressBackdrop={closeModal}
            buttons={[
                { content: '네', type: 'cancel', onPress: handleLogout },
                { content: '아니요', onPress: closeModal },
            ]}
        />
    ));

    const onPressEditUserProfile = () => {
        navigate('UserProfileEditScreen', { userData: userData });
    };

    const onPressOpenSource = () => {
        navigate('OpenSourceScreen');
    };

    const onPressLogout = () => {
        openModal();
    };

    const handleLogout = () => {
        closeModal();
        logout();
    };

    const menus: SettingDataType[] = [
        {
            title: '감사 알림',
            subtitle: '설정한 감사 알림을 확인 할 수 있습니다.',
            onPress: () => navigate('NotificationScreen'),
        },
        {
            title: '앱 테마 설정',
            subtitle: '다크 모드 및 라이트 모드를 설정합니다.',
            onPress: () => navigate('NotificationScreen'),
        },
        {
            title: '로그아웃',
            subtitle: '앱에서 로그아웃 합니다.',
            onPress: onPressLogout,
        },
    ];

    const renderListItem: ListRenderItem<SettingDataType> = useCallback(({ item }) => {
        return <SettingListItem {...item} />;
    }, []);

    if (userData === null) return <></>;

    return (
        <SafeAreaView>
            <InnerNavigationBar screenTitle={'설정'} goBack={goBack} />
            <FlatList
                data={menus}
                renderItem={renderListItem}
                keyExtractor={(_, index) => index.toString()}
                style={styles.list}
                ListHeaderComponent={
                    <UserProfileView userData={userData} onPressEdit={onPressEditUserProfile} />
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
