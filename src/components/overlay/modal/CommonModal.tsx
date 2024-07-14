import React, { useCallback } from 'react';

import { StyleSheet, View } from 'react-native';
import CustomText from 'components/common/CustomText';
import Modal from './Modal';
import FullWidthButton from 'components/common/FullWidthButton';
import HorizontalDivider from 'components/common/HorizontalDivider';

import { CommonModalType } from 'types/models/modal';

import useCustomTheme from 'hooks/useCustomTheme';
import useDimensions from 'hooks/useDimensions';

const CommonModal = (props: CommonModalType) => {
    const { hp } = useDimensions();
    const { colors } = useCustomTheme();

    const {
        buttons,

        backdrop = true,
        onPressBackdrop,

        title,
        text,
        children,
    } = props;

    // ui

    const renderButtons = useCallback(() => {
        return buttons?.map(button => {
            const IS_CANCEL_BUTTON = button.type === 'cancel';

            const {
                content: buttonContent,
                onPress,
                backgroundColor = IS_CANCEL_BUTTON ? colors.warning : colors.text,
                textColor = IS_CANCEL_BUTTON ? '#FFF' : colors.textReverse,
                disabled,
            } = button;

            const buttonHandler = () => {
                onPress && onPress();
            };

            return (
                <FullWidthButton
                    disabled={disabled}
                    key={buttonContent}
                    title={buttonContent}
                    onPress={buttonHandler}
                    titleStyle={{ color: textColor }}
                    style={{ backgroundColor, flex: 1 }}
                />
            );
        });
    }, [buttons, colors]);

    return (
        <Modal onPressBackdrop={onPressBackdrop} backdrop={backdrop}>
            <View>
                {title && (
                    <View>
                        <CustomText style={styles.title}>{title}</CustomText>
                        <HorizontalDivider style={styles.divider} />
                    </View>
                )}

                {text && (
                    <View
                        style={{
                            minHeight: children ? hp(2) : hp(14),
                            justifyContent: 'center',
                        }}
                    >
                        <CustomText style={styles.text}>{text}</CustomText>
                    </View>
                )}

                {children}

                <View style={styles.buttonContainer}>{renderButtons()}</View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        gap: 10,
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    divider: {
        marginTop: 8,
    },
    title: {
        fontSize: 18,
        fontWeight: 500,
    },
    text: {
        textAlign: 'center',
        fontSize: 15,
        lineHeight: 25,
        paddingVertical: 20,
    },
});

export default CommonModal;
