import React, { useState } from 'react';

import SafeAreaView from '../../../components/common/SafeAreaView';
import TempScreen from '../../../components/common/TempScreen';
import InnerNavigationBar from '../../../components/common/InnerNavigationBar';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
    UserProfileEditScreenNavigationProps,
    UserProfileEditScreenRouteProps,
} from '../../../@types/navigations/settingStack';
import FullWidthButton from '../../../components/common/FullWidthButton';
import ScreenLayout from '../../../components/common/ScreenLayout';
import { StyleSheet, View } from 'react-native';
import { commonStyles } from '../../../style';
import useCustomTheme from '../../../hooks/useCustomTheme';
import { HORIZONTAL_GAP } from '../../../constant/style';
import ProfilePicture from '../../../components/common/ProfilePicture';
import CustomTextInput from '../../../components/common/CustomTextInput';

const UserProfileEditScreen = () => {
    const { colors } = useCustomTheme();

    const { goBack } = useNavigation<UserProfileEditScreenNavigationProps>();
    const { params } = useRoute<UserProfileEditScreenRouteProps>();

    const { userId, username, profileImage, email, oauthProvider } = params.userData;

    const [text, setText] = useState<string>(username);

    return (
        <SafeAreaView>
            <InnerNavigationBar screenTitle="프로필 수정" goBack={goBack} />
            <View style={styles.container}>
                <View style={styles.editContainer}>
                    <ProfilePicture style={styles.profile} uri={profileImage} />
                    <CustomTextInput value={text} onChangeText={e => setText(e)} />
                </View>
                <View style={styles.buttonContainer}>
                    <FullWidthButton title="수정완료" />
                    <FullWidthButton
                        title="회원탈퇴"
                        style={{ backgroundColor: colors.caution }}
                        titleStyle={styles.optOutTitle}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: HORIZONTAL_GAP,
        paddingTop: 20,
    },
    editContainer: {
        marginBottom: 20,
    },
    profile: {
        alignSelf: 'center',
    },
    buttonContainer: {
        gap: 10,
    },
    optOutTitle: {
        color: '#FFF',
    },
});

export default UserProfileEditScreen;
