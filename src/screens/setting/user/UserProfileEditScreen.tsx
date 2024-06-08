import React from 'react';

import { StyleSheet, TouchableOpacity, View } from 'react-native';
import InnerNavigationBar from '../../../components/common/InnerNavigationBar';
import FullWidthButton from '../../../components/common/FullWidthButton';
import ProfilePicture from '../../../components/common/ProfilePicture';
import CustomTextInput from '../../../components/common/CustomTextInput';
import VectorIcon from '../../../components/common/VectorIcon';
import CustomText from '../../../components/common/CustomText';

import {
    UserProfileEditScreenNavigationProps,
    UserProfileEditScreenRouteProps,
} from '../../../@types/navigations/settingStack';

import { useNavigation, useRoute } from '@react-navigation/native';
import useCustomTheme from '../../../hooks/useCustomTheme';
import useInput from '../../../hooks/useInput';

import { HORIZONTAL_GAP } from '../../../constant/style';
import WithKeyboardSafeAreaView from '../../../components/common/WithKeyboardSafeAreaView';
import { commonStyles } from '../../../style';
import HorizontalDivider from '../../../components/common/HorizontalDivider';

const UserProfileEditScreen = () => {
    const { colors } = useCustomTheme();

    const { goBack } = useNavigation<UserProfileEditScreenNavigationProps>();
    const { params } = useRoute<UserProfileEditScreenRouteProps>();

    const { userId, username, profileImage, email, oauthProvider } = params.userData;

    const { value, handleChange, clearValue } = useInput(username);

    const onPressProfilePic = () => {
        console.log('open photo album');
    };

    return (
        <WithKeyboardSafeAreaView keyboardAvoiding={false}>
            <InnerNavigationBar screenTitle="프로필 수정" goBack={goBack} />

            <View style={styles.container}>
                <View style={styles.editContainer}>
                    <ProfilePicture style={styles.profile} uri={profileImage} />
                    <TouchableOpacity
                        style={styles.profileEditButtonContainer}
                        onPress={onPressProfilePic}
                    >
                        <CustomText>이미지 변경</CustomText>
                        <VectorIcon name={'pencil'} size={13} />
                    </TouchableOpacity>

                    <CustomTextInput
                        value={value}
                        onChangeText={handleChange}
                        clearButton
                        onPressClear={clearValue}
                        title="닉네임"
                        placeholder={username}
                    />
                </View>

                <FullWidthButton title="수정하기" />

                <View style={styles.optOutContainer}>
                    <CustomText style={styles.optOutTitle}>회원 탈퇴</CustomText>
                    <View
                        style={[
                            { backgroundColor: colors.tabBarBackground },
                            styles.optOutInnerContainer,
                        ]}
                    >
                        <CustomText style={styles.optOutCaution}>
                            회원 탈퇴 시 작성된 모든 일기 및 데이터가 초기화됩니다.
                        </CustomText>
                        <CustomText style={styles.optOutCaution}>
                            회원 탈퇴 후 데이터를 복구 할 수 없습니다.
                        </CustomText>
                        <CustomText style={styles.optOutCaution}>신중하게 고려해주세요!</CustomText>
                        <FullWidthButton
                            title="회원탈퇴하기"
                            style={[{ backgroundColor: colors.caution }, styles.optOutButton]}
                            titleStyle={styles.optOutButtonTitle}
                        />
                    </View>
                </View>
            </View>
        </WithKeyboardSafeAreaView>
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
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        opacity: 0.5,
        gap: 3,
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
