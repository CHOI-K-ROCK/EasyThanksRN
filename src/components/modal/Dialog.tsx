import React, { useCallback } from 'react';
import CustomText from '../common/CustomText';
import { ModalDataType, ModalDialogDataType } from '../../@types/models/modal';
import useModal from '../../hooks/useModal';
import { Modal, Pressable, StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';
import FullWidthButton from '../common/FullWidthButton';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const Dialog = (props: ModalDialogDataType) => {
    const { content, id, buttons } = props;
    const { closeModal } = useModal();

    // console.log('render');

    const handleCloseModal = useCallback(() => {
        closeModal(id!);
    }, [closeModal, id]);

    const renderButton = useCallback(() => {
        return buttons?.map(button => {
            const { content: buttonContent, onPress, backgroundColor, textColor } = button;

            if (typeof buttonContent === 'string') {
                return (
                    <FullWidthButton
                        title={buttonContent}
                        onPress={onPress}
                        titleStyle={{ color: textColor }}
                        style={{ backgroundColor: '#FFF', flex: 1 }}
                    />
                );
            }

            return buttonContent;
        });
    }, [buttons]);

    return (
        <View style={styles.container}>
            <AnimatedPressable style={styles.backdrop} onPress={handleCloseModal} />
            <Animated.View
                style={{
                    width: 300,
                    height: 200,
                    backgroundColor: '#000',
                }}
            >
                <CustomText onPress={handleCloseModal}>{content}</CustomText>
                <View style={{ flexDirection: 'row', gap: 10, justifyContent: 'center' }}>
                    {renderButton()}
                </View>
            </Animated.View>
        </View>
    );
};
const styles = StyleSheet.create({
    backdrop: {
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0,0.4)',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
    container: {
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
});

export default Dialog;
