import React from 'react';

import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import VectorIcon from 'components/common/VectorIcon';
import CustomText from 'components/common/CustomText';
import FullWidthButton from 'components/common/FullWidthButton';
import SsoIcon from 'components/common/SsoIcon';
import ProfilePicture from 'components/common/ProfilePicture';

import { UserDataType } from 'types/models/user';

type Props = { userData: UserDataType; onPressEdit: () => void; style?: StyleProp<ViewStyle> };

const UserProfileView = (props: Props) => {
    const { userData, onPressEdit, style } = props;

    const { username, email, profile_img, sso_provider } = userData;

    return (
        <View style={[styles.container, style]}>
            <View style={styles.profileContainer}>
                <ProfilePicture uri={profile_img} style={styles.profileImage} />
                <View style={styles.nicknameContainer}>
                    {/* 닉네임 */}
                    <SsoIcon style={styles.ssoIcon} provider={sso_provider} />
                    <CustomText style={styles.nickname}>{username}</CustomText>
                    <CustomText style={styles.sir}>님</CustomText>
                </View>
                {email && <CustomText style={styles.email}>{email}</CustomText>}
            </View>
            <FullWidthButton
                title={'프로필 수정'}
                onPress={onPressEdit}
                iconComponent={<VectorIcon name="pencil" size={15} />}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {},
    profileContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    profileImage: {
        marginBottom: 10,
    },
    nicknameContainer: {
        flexDirection: 'row',
        alignItems: 'baseline',
        columnGap: 3,
    },
    ssoIcon: {
        width: 18,
        height: 18,
        alignSelf: 'center',
        marginRight: 3,
    },
    nickname: {
        fontSize: 25,
        fontWeight: 600,
    },
    sir: {
        fontSize: 14,
    },
    email: {
        opacity: 0.4,
        fontSize: 13,
    },
});

export default UserProfileView;
