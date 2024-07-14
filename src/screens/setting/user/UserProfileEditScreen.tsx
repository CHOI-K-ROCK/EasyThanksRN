import React, { useCallback } from 'react';

import { StyleSheet, TouchableOpacity, View } from 'react-native';
import InnerNavigationBar from 'components/common/InnerNavigationBar';
import FullWidthButton from 'components/common/FullWidthButton';
import ProfilePicture from 'components/common/ProfilePicture';
import CustomTextInput from 'components/common/CustomTextInput';
import VectorIcon from 'components/common/VectorIcon';
import CustomText from 'components/common/CustomText';
import KeyboardDismissSafeAreaView from 'components/common/KeyboardDismissSafeAreaView';
import OptOutDialogModal from 'components/overlay/modal/OptOutDialogModal';

import {
    UserProfileEditScreenNavigationProps,
    UserProfileEditScreenRouteProps,
} from 'types/navigations/settingStack';

import { useNavigation, useRoute } from '@react-navigation/native';
import useCustomTheme from 'hooks/useCustomTheme';
import useInput from 'hooks/useInput';
import useOverlay from 'hooks/useOverlay';
import useToast from 'hooks/useToast';

import { HORIZONTAL_GAP } from 'constants/style';
import { commonStyles } from 'styles';
import useAuth from 'hooks/useAuth';
import useLoading from 'hooks/useLoading';
import OptOutCautionView from './OptOutCautionView';

const UserProfileEditScreen = () => {
    const { goBack } = useNavigation<UserProfileEditScreenNavigationProps>();
    const { params } = useRoute<UserProfileEditScreenRouteProps>();

    const { colors } = useCustomTheme();
    const { openToast } = useToast();
    const { logout } = useAuth();
    const { setLoading } = useLoading();

    const { username, profileImg } = params.userData; // 상태에 저장해놓기? 훅으로 만들기?

    const { value, handleChange, clearValue } = useInput(username);

    const { openOverlay, closeOverlay } = useOverlay(() => (
        <OptOutDialogModal closeOverlay={closeOverlay} onConfirm={onConfirmOptOut} />
    ));

    const isValidNickName = username !== value;
    // && 정규식(2글자 이상, 인젝션 공격에 사용 될 수 있는 문자 제외)

    const onPressProfilePic = () => {
        console.log('open photo album');
    };

    const onPressEditProfile = async () => {
        console.log('닉네임 요청 전송');

        console.log('닉네임 수정 완료', username, ' -> ', value);

        // Toast 메시지 표시
        openToast({ text: '닉네임 변경 완료', type: 'complete' });
    };

    const onPressOptOut = () => {
        openOverlay();
    };

    const onConfirmOptOut = useCallback(async () => {
        try {
            console.log('탈퇴 요청 전송');
            setLoading(true);
            await new Promise(res => {
                setTimeout(res, 2000);
            });
            setLoading(false);
            console.log('탈퇴 완료, 로그아웃 진행');

            closeOverlay();
            logout(); // 실질적으로는 회원 탈퇴 로직이여야함.
        } catch (error: any) {
            console.log('opt out error : ', error.message);
        }
    }, [closeOverlay, logout, setLoading]);

    if (params.userData === null) return <></>;

    return (
        <KeyboardDismissSafeAreaView keyboardAvoiding={false}>
            <InnerNavigationBar screenTitle={'프로필 수정'} goBack={goBack} />

            <View style={styles.container}>
                <View style={styles.editContainer}>
                    <ProfilePicture style={styles.profile} uri={profileImg} />
                    <TouchableOpacity
                        style={styles.profileEditButtonContainer}
                        onPress={onPressProfilePic}
                    >
                        <CustomText>{'이미지 변경'}</CustomText>
                        <VectorIcon name={'pencil'} size={13} />
                    </TouchableOpacity>

                    <CustomTextInput
                        value={value}
                        onChangeText={handleChange}
                        clearButton
                        onPressClear={clearValue}
                        title={'닉네임'}
                        placeholder={username}
                    />
                </View>

                <FullWidthButton
                    title={'수정하기'}
                    disabled={!isValidNickName}
                    onPress={onPressEditProfile}
                />

                <OptOutCautionView onPressOptOut={onPressOptOut} />
            </View>
        </KeyboardDismissSafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: HORIZONTAL_GAP,
        paddingTop: 20,
    },
    editContainer: {
        marginBottom: 20,
    },
    profile: {
        alignSelf: 'center',
        marginBottom: 7,
    },
    profileEditButtonContainer: {
        flexDirection: 'row',
        marginBottom: 20,
        opacity: 0.5,
        gap: 3,
        ...commonStyles.centered,
    },
});

export default UserProfileEditScreen;
