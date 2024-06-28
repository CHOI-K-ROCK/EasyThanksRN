import React from 'react';
import { Image, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { commonStyles } from '../../style';
import { SAMPLE_IMAGE } from '../../constant/dummy';

type Props = { uri: string | null | undefined; style?: StyleProp<ViewStyle> };

const ProfilePicture = (props: Props) => {
    const { uri, style } = props;

    return (
        <View style={[styles.profileImageContainer, style]}>
            <Image style={styles.profileImage} source={{ uri: uri || SAMPLE_IMAGE }} />
        </View>
    );
};
const styles = StyleSheet.create({
    profileImageContainer: {
        width: 100,
        aspectRatio: 1,

        borderRadius: 15,

        backgroundColor: '#000',
        ...commonStyles.dropShadow,
    },
    profileImage: {
        borderRadius: 15,
        width: '100%',
        height: '100%',
    },
});

export default ProfilePicture;
