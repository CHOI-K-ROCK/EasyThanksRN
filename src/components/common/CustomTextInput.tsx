import React, { ReactNode } from 'react';

import {
    Platform,
    StyleProp,
    StyleSheet,
    TextInput,
    TextInputProps,
    TextStyle,
    View,
    ViewStyle,
} from 'react-native';
import VectorIcon from './VectorIcon';

import useCustomTheme from '../../hooks/useCustomTheme';
import CustomText from './CustomText';
import { commonStyles } from '../../style';

type Props = TextInputProps & {
    textStyle?: StyleProp<ViewStyle>;

    title?: string;
    titleStyle?: StyleProp<TextStyle>;

    clearButton?: boolean;
    onPressClear?: () => void;

    iconComponent?: ReactNode;
};

const CustomTextInput = (props: Props) => {
    const { colors } = useCustomTheme();
    const {
        style,
        textStyle,

        title,
        titleStyle,

        clearButton = false,
        onPressClear,

        iconComponent,
        ...restProps
    } = props;

    return (
        <View>
            {title && <CustomText style={[styles.title, titleStyle]}>{title}</CustomText>}
            <View
                style={[
                    {
                        justifyContent: restProps.multiline ? 'flex-start' : 'center',
                        backgroundColor: colors.inputBackground,
                    },
                    styles.field,
                    style,
                ]}
            >
                {iconComponent && iconComponent}
                <TextInput
                    style={[
                        {
                            color: colors.text,
                            textAlignVertical: restProps.multiline ? 'top' : 'center',
                        },
                        styles.text,
                        textStyle,
                    ]}
                    {...restProps}
                />

                {clearButton && (
                    <VectorIcon onPress={onPressClear} name="close" style={styles.clearButton} />
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    title: {
        ...commonStyles.subject,
    },
    field: {
        minHeight: 45,
        paddingHorizontal: 15,
        paddingVertical: Platform.select({ ios: 5, android: 0 }),
        borderRadius: 5,
    },
    text: {
        fontSize: 16,
        textAlignVertical: 'top',
    },
    clearButton: {
        position: 'absolute',
        right: 15,
        opacity: 0.5,
    },
});
export default CustomTextInput;
