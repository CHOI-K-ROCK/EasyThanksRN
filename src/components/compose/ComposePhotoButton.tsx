import React from 'react';

import { Image, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import PushAnimatedPressable from 'components/common/PushAnimatedPressable';
import VectorIcon from 'components/common/VectorIcon';

import useCustomTheme from 'hooks/useCustomTheme';

type Props = {
    onPress: () => void;
    onPressClose: () => void;
    imgBlob?: any; //! temp type be blob

    style?: StyleProp<ViewStyle>;
};

const ComposePhotoButton = (props: Props) => {
    const { colors } = useCustomTheme();

    const { onPress, onPressClose, imgBlob, style } = props;

    return (
        <PushAnimatedPressable
            onPress={onPress}
            scale={0.98}
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
            {imgBlob && (
                <PushAnimatedPressable onPress={onPressClose} style={styles.closeButtonConainer}>
                    <VectorIcon
                        name="close"
                        size={17}
                        color={'#fff'}
                        style={styles.closeButtonIcon}
                    />
                </PushAnimatedPressable>
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
    closeButtonConainer: {
        position: 'absolute',
        top: -10,
        right: -15,
        padding: 5,
    },
    closeButtonIcon: {
        backgroundColor: '#000',
        borderRadius: 999,
        padding: 3,
    },
});

export default ComposePhotoButton;
