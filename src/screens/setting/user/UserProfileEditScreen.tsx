import React from 'react';

import {
    Keyboard,
    StyleSheet,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import SafeAreaView from '../../../components/common/SafeAreaView';
import InnerNavigationBar from '../../../components/common/InnerNavigationBar';
import FullWidthButton from '../../../components/common/FullWidthButton';
import ProfilePicture from '../../../components/common/ProfilePicture';
import CustomTextInput from '../../../components/common/CustomTextInput';

import {
    UserProfileEditScreenNavigationProps,
    UserProfileEditScreenRouteProps,
} from '../../../@types/navigations/settingStack';

import { useNavigation, useRoute } from '@react-navigation/native';
import useCustomTheme from '../../../hooks/useCustomTheme';
import useInput from '../../../hooks/useInput';

import { HORIZONTAL_GAP } from '../../../constant/style';
import withKeyboardDissmiss from '../../../hoc/withKeyboardDissmiss';
import VectorIcon from '../../../components/common/VectorIcon';
import CustomText from '../../../components/common/CustomText';
import PushAnimatedPressable from '../../../components/common/PushAnimatedPressable';

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
        <TouchableWithoutFeedback style={{ flex: 1 }} onPress={Keyboard.dismiss}>
            <SafeAreaView>
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

                    <FullWidthButton title="수정완료" />
                    <View style={{ flex: 1 }} />
                    <FullWidthButton
                        title="회원탈퇴"
                        style={[{ backgroundColor: colors.caution }, styles.optOutButton]}
                        titleStyle={styles.optOutTitle}
                    />
                    <CustomText style={styles.optOutCaution}>
                        *회원 탈퇴 시 작성된 모든 일기 및 데이터가 초기화됩니다.
                    </CustomText>
                </View>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: HORIZONTAL_GAP,
        paddingTop: 20,
    },
    editContainer: {
        marginBottom: 30,
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
    buttonContainer: {
        gap: 10,
    },
    optOutButton: {
        marginBottom: 5,
    },
    optOutTitle: {
        color: '#FFF',
    },
    optOutCaution: {
        opacity: 0.5,
        fontSize: 13,
        textAlign: 'center',
    },
});

export default withKeyboardDissmiss(UserProfileEditScreen);
