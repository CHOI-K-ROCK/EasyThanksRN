import React, { useCallback } from 'react';

import { Image, StyleSheet, View } from 'react-native';
import CustomText from '../common/CustomText';
import FullWidthButton from '../common/FullWidthButton';
import VectorIcon from '../common/VectorIcon';
import { OauthProviderType, UserDataType } from '../../constant/dummy';
import { commonStyles } from '../../style';
import UserProfileOauthIcon from './UserProfileOauthIcon';

type Props = { userData: UserDataType; onPressEdit: () => void };

const UserProfileView = (props: Props) => {
    const { userData, onPressEdit } = props;

    const { username, email, profileImage, oauthProvider } = userData;

    const renderEditButtonIcon = useCallback(() => {
        return <VectorIcon name="pencil" size={15} />;
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.profileContainer}>
                <View style={styles.profileImageContainer}>
                    {/* 프로필 이미지 */}
                    <Image style={styles.profileImage} source={{ uri: profileImage }} />
                </View>
                <View style={styles.nicknameContainer}>
                    {/* 닉네임 */}
                    <UserProfileOauthIcon
                        style={styles.oauthIcon}
                        provider={oauthProvider as OauthProviderType}
                    />
                    <CustomText style={styles.nickname}>{username}</CustomText>
                    <CustomText style={styles.sir}>님</CustomText>
                </View>
                <CustomText style={styles.email}>{email}</CustomText>
            </View>
            <FullWidthButton
                title={'프로필 수정'}
                onPress={onPressEdit}
                iconComponent={renderEditButtonIcon}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
    },
    profileContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    profileImageContainer: {
        width: 100,
        aspectRatio: 1,

        marginBottom: 10,
        marginTop: 10,
        ...commonStyles.dropShadow,
    },
    profileImage: {
        borderRadius: 15,
        width: '100%',
        height: '100%',
    },
    nicknameContainer: {
        flexDirection: 'row',
        alignItems: 'baseline',
        columnGap: 3,
    },
    oauthIcon: {
        width: 18,
        aspectRatio: 1,
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
