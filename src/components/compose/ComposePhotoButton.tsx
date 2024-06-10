import React from 'react';

import { Image, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import PushAnimatedPressable from '../common/PushAnimatedPressable';
import VectorIcon from '../common/VectorIcon';

import useCustomTheme from '../../hooks/useCustomTheme';

type Props = {
    onPress: () => void;
    imgBlob?: any; //! temp type be blob

    style?: StyleProp<ViewStyle>;
};

const ComposePhotoButton = (props: Props) => {
    const { colors } = useCustomTheme();

    const { onPress, imgBlob, style } = props;

    console.log(imgBlob);

    return (
        <PushAnimatedPressable
            onPress={onPress}
            style={[
                {
                    backgroundColor: colors.inputBackground,
                },
                styles.container,
                style,
            ]}
        >
            {!imgBlob ? (
                <VectorIcon name="camera" size={20} style={styles.icon} />
            ) : (
                <Image source={{ uri: imgBlob }} style={styles.thumbnail} />
            )}
        </PushAnimatedPressable>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 70,
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
    },
    icon: {
        opacity: 0.6,
    },
    thumbnail: {
        objectFit: 'cover',
        width: '100%',
        height: '100%',
        borderRadius: 5,
    },
});

export default ComposePhotoButton;
