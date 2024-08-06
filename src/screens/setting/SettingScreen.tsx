import React from 'react';

import { useRecoilValue } from 'recoil';
import { userDataAtom } from 'states/user';

import { StyleSheet, View } from 'react-native';
import SafeAreaView from 'components/common/SafeAreaView';
import InnerNavigationBar from 'components/common/InnerNavigationBar';
import UserProfileView from 'components/setting/UserProfileView';
import CommonListItem from 'components/common/CommonListItem';
import SettingFooter from 'components/setting/SettingFooter';
import HorizontalDivider from 'components/common/HorizontalDivider';
import CommonModal from 'components/overlay/modal/CommonModal';

import { SettingScreenNavigationProps } from 'types/navigations/settingStack';

import { useNavigation } from '@react-navigation/native';
import useCustomTheme from 'hooks/useCustomTheme';
import useAuth from 'hooks/useAuth';
import useOverlay from 'hooks/useOverlay';
import useToast from 'hooks/useToast';
import useLoading from 'hooks/useLoading';

import { HORIZONTAL_GAP } from 'constants/style';

export type SettingListType = {
    title: string;
    subtitle: string;
    onPress: () => void;
};

export type dividerType = {
    divider: boolean;
};

export type SettingDataType = SettingListType | dividerType;

const SettingScreen = () => {
    const { navigate, goBack } = useNavigation<SettingScreenNavigationProps>();
    const { colors } = useCustomTheme();
    const { logout } = useAuth();
    const { setLoading } = useLoading();

    const userData = useRecoilValue(userDataAtom);

    const { openToast } = useToast();
    const { openOverlay, closeOverlay } = useOverlay(() => (
        <CommonModal
            title="로그아웃"
            text="로그아웃 하시겠어요?"
            onPressBackdrop={closeOverlay}
            buttons={[
                { content: '네', type: 'cancel', onPress: handleLogout },
                { content: '아니요', onPress: closeOverlay },
            ]}
        />
    ));

    const onPressEditUserProfile = () => {
        navigate('UserProfileEditScreen');
    };

    const onPressOpenSource = () => {
        navigate('OpenSourceScreen');
    };

    const onPressLogout = () => {
        openOverlay();
    };

    const handleLogout = async () => {
        try {
            setLoading(true);

            closeOverlay();
            await logout();

            openToast({ text: '로그아웃 완료', type: 'complete' });
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView bottomAreaBackgroundColor={colors.divider}>
            <InnerNavigationBar screenTitle={'설정'} goBack={goBack} />
            <View style={styles.container}>
                {userData !== null && (
                    <UserProfileView
                        userData={userData}
                        onPressEdit={onPressEditUserProfile}
                        style={styles.header}
                    />
                )}
                <HorizontalDivider type={'block'} />
                <CommonListItem
                    title={'감사 리마인더 설정'}
                    subTitle={'설정한 시간에 감사일기를 쓸 수 있도록 알림을 드려요!'}
                    onPress={() => navigate('ReminderScreen')}
                    chevron
                />
                <CommonListItem
                    title={'앱 테마 설정'}
                    subTitle={'앱의 기본 테마(다크/라이트)를 설정합니다.'}
                    onPress={() => navigate('AppThemeSettingScreen')}
                    chevron
                />
                <HorizontalDivider type={'block'} />
                <CommonListItem
                    title={'로그아웃'}
                    subTitle={'앱에서 로그아웃 합니다.'}
                    onPress={onPressLogout}
                />
            </View>
            <View style={[{ backgroundColor: colors.divider }, styles.footerContainer]}>
                <SettingFooter onPressOpenSource={onPressOpenSource} style={styles.footer} />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: HORIZONTAL_GAP,
    },
    header: {
        marginVertical: 20,
    },
    footerContainer: {
        paddingHorizontal: HORIZONTAL_GAP,
        flex: 1,
    },
    footer: {
        marginTop: 15,
    },
});

export default SettingScreen;
