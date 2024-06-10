import React from 'react';

import { StyleSheet } from 'react-native';
import PushAnimatedPressable from '../common/PushAnimatedPressable';
import VectorIcon from '../common/VectorIcon';

import useCustomTheme from '../../hooks/useCustomTheme';

type Props = {
    onPress: () => void;
    imgBlob?: Blob;
};

const ComposePhotoButton = (props: Props) => {
    const { colors } = useCustomTheme();

    const { onPress, imgBlob } = props;

    return (
        <PushAnimatedPressable
            onPress={onPress}
            style={[
                {
                    backgroundColor: colors.inputBackground,
                },
                styles.container,
            ]}
        >
            <VectorIcon name="camera" size={20} style={styles.icon} />
        </PushAnimatedPressable>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 70,
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        opacity: 0.6,
    },
});

export default ComposePhotoButton;
