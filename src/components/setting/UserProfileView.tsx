import React from 'react';

import { StyleSheet, View } from 'react-native';
import VectorIcon from '../common/VectorIcon';
import CustomText from '../common/CustomText';
import FullWidthButton from '../common/FullWidthButton';
import OauthIcon from '../common/OauthIcon';
import ProfilePicture from '../common/ProfilePicture';
import { OauthProviderType, UserDataType } from '../../@types/models/user';

type Props = { userData: UserDataType; onPressEdit: () => void };

const UserProfileView = (props: Props) => {
    const { userData, onPressEdit } = props;

    const { username, email, profileImg, oauthProvider } = userData;

    return (
        <View style={styles.container}>
            <View style={styles.profileContainer}>
                <ProfilePicture uri={profileImg} style={styles.profileImage} />
                <View style={styles.nicknameContainer}>
                    {/* 닉네임 */}
                    <OauthIcon
                        style={styles.oauthIcon}
                        provider={oauthProvider as OauthProviderType}
                    />
                    <CustomText style={styles.nickname}>{username}</CustomText>
                    <CustomText style={styles.sir}>님</CustomText>
                </View>
                {/* 이후 비즈니스 앱 혹은 권한 생기면 추가 */}
                {/* {email && <CustomText style={styles.email}>{email}</CustomText>} */}
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
        marginBottom: 20,
    },
    nicknameContainer: {
        flexDirection: 'row',
        alignItems: 'baseline',
        columnGap: 3,
    },
    oauthIcon: {
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
