import React, { useCallback } from 'react';

import { StyleSheet, TouchableOpacity, View } from 'react-native';
import InnerNavigationBar from '../../../components/common/InnerNavigationBar';
import FullWidthButton from '../../../components/common/FullWidthButton';
import ProfilePicture from '../../../components/common/ProfilePicture';
import CustomTextInput from '../../../components/common/CustomTextInput';
import VectorIcon from '../../../components/common/VectorIcon';
import CustomText from '../../../components/common/CustomText';
import KeyboardDismissSafeAreaView from '../../../components/common/KeyboardDismissSafeAreaView';

import {
    UserProfileEditScreenNavigationProps,
    UserProfileEditScreenRouteProps,
} from '../../../@types/navigations/settingStack';

import { useNavigation, useRoute } from '@react-navigation/native';
import useCustomTheme from '../../../hooks/useCustomTheme';
import useInput from '../../../hooks/useInput';
import useModal from '../../../hooks/useModal';

import { HORIZONTAL_GAP } from '../../../constant/style';
import { commonStyles } from '../../../style';

const UserProfileEditScreen = () => {
    const { colors } = useCustomTheme();
    const { openModal } = useModal();

    const { goBack } = useNavigation<UserProfileEditScreenNavigationProps>();
    const { params } = useRoute<UserProfileEditScreenRouteProps>();

    const { username, profileImage } = params.userData; // 상태에 저장해놓기? 훅으로 만들기?

    const { value, handleChange, clearValue } = useInput(username);

    const isValidNickName = username !== value;
    // && 정규식(2글자 이상, 인젝션 공격에 사용 될 수 있는 문자 제외)

    const onPressProfilePic = () => {
        console.log('open photo album');
    };

    const onPressEditProfile = async () => {
        console.log('닉네임 요청 전송');

        await new Promise((res, rej) => {
            setTimeout(res, 2000);
        });

        console.log('닉네임 수정 완료', username, ' -> ', value);
        // Toast 메시지 표시
    };

    const onPressOptOut = () => {
        openModal({
            content: '정말로 탈퇴하시겠어요?\n모든 데이터가 초기화 되고 되돌릴 수 없습니다!',
            type: 'dialog',
            buttons: [
                {
                    content: '네 탈퇴할게요',
                    onPress: onConfirmOptOut,
                    backgroundColor: colors.caution,
                    textColor: '#FFF',
                },
                {
                    content: '좀 더 생각해볼게요',
                    isCloseButton: true,
                },
            ],
        });
    };

    const onConfirmOptOut = useCallback(
        async (closeModal: () => void) => {
            try {
                closeModal();

                // 탈퇴 로직 수행
                // 로딩 상태 변경 true
                console.log('탈퇴 요청 전송');
                await new Promise((res, rej) => {
                    setTimeout(res, 2000);
                });
                // 로딩 상태 변경 false
                console.log('탈퇴 완료, 로그아웃 진행');
                // 탈퇴 완료시 로그인 화면으로 이동
                goBack();
            } catch (error: any) {
                console.log('opt out error : ', error.message);
            }
        },
        [goBack]
    );

    return (
        <KeyboardDismissSafeAreaView keyboardAvoiding={false}>
            <InnerNavigationBar screenTitle={'프로필 수정'} goBack={goBack} />

            <View style={styles.container}>
                <View style={styles.editContainer}>
                    <ProfilePicture style={styles.profile} uri={profileImage} />
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
                            style={[{ backgroundColor: colors.caution }, styles.optOutButton]}
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
