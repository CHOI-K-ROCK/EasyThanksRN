import React, { useCallback } from 'react';

import { StyleSheet, TouchableOpacity, View } from 'react-native';
import InnerNavigationBar from '../../../components/common/InnerNavigationBar';
import FullWidthButton from '../../../components/common/FullWidthButton';
import ProfilePicture from '../../../components/common/ProfilePicture';
import CustomTextInput from '../../../components/common/CustomTextInput';
import VectorIcon from '../../../components/common/VectorIcon';
import CustomText from '../../../components/common/CustomText';
import KeyboardDismissSafeAreaView from '../../../components/common/KeyboardDismissSafeAreaView';
import OptOutDialogModal from '../../../components/modal/OptOutDialogModal';

import {
    UserProfileEditScreenNavigationProps,
    UserProfileEditScreenRouteProps,
} from '../../../@types/navigations/settingStack';

import { useNavigation, useRoute } from '@react-navigation/native';
import useCustomTheme from '../../../hooks/useCustomTheme';
import useInput from '../../../hooks/useInput';
import useModal from '../../../hooks/useModal';
import useToast from '../../../hooks/useToast';

import { HORIZONTAL_GAP } from '../../../constant/style';
import { commonStyles } from '../../../style';
import useAuth from '../../../logics/useAuth';
import useLoading from '../../../hooks/useLoading';

const UserProfileEditScreen = () => {
    const { goBack } = useNavigation<UserProfileEditScreenNavigationProps>();
    const { params } = useRoute<UserProfileEditScreenRouteProps>();

    const { colors } = useCustomTheme();
    const { openToast } = useToast();
    const { logout } = useAuth();
    const { setLoading } = useLoading();

    const { username, profileImg } = params.userData; // 상태에 저장해놓기? 훅으로 만들기?

    const { value, handleChange, clearValue } = useInput(username);

    const { openModal, closeModal } = useModal(() => (
        <OptOutDialogModal closeModal={closeModal} onConfirm={onConfirmOptOut} />
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
        openModal();
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

            closeModal();
            logout(); // 실질적으로는 회원 탈퇴 로직이여야함.
        } catch (error: any) {
            console.log('opt out error : ', error.message);
        }
    }, [closeModal, logout, setLoading]);

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

                <View style={styles.optOutContainer}>
                    <CustomText style={styles.optOutTitle}>{'회원 탈퇴'}</CustomText>
                    <View
                        style={[
                            { backgroundColor: colors.tabBarBackground },
                            styles.optOutInnerContainer,
                        ]}
                    >
                        <CustomText style={styles.optOutCaution}>
                            {'회원 탈퇴 시 작성된 모든 일기 및 데이터가 초기화됩니다.'}
                        </CustomText>
                        <CustomText style={styles.optOutCaution}>
                            {'회원 탈퇴 후 데이터를 복구 할 수 없습니다.'}
                        </CustomText>
                        <CustomText style={styles.optOutCaution}>
                            {'신중하게 고려해주세요!'}
                        </CustomText>
                        <FullWidthButton
                            title={'회원탈퇴하기'}
                            onPress={onPressOptOut}
                            style={[{ backgroundColor: colors.warning }, styles.optOutButton]}
                            titleStyle={styles.optOutButtonTitle}
                        />
                    </View>
                </View>
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
    optOutContainer: {
        marginTop: 50,
    },
    optOutTitle: {
        ...commonStyles.subject,
    },
    optOutInnerContainer: {
        borderRadius: 15,
        padding: 20,
        gap: 2,
    },
    optOutCaution: {
        opacity: 0.5,
        fontSize: 13,
    },
    optOutButton: {
        marginTop: 15,
    },
    optOutButtonTitle: {
        color: '#FFF',
    },
});

export default UserProfileEditScreen;
