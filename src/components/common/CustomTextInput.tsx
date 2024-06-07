import React, { ReactNode } from 'react';

import {
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
                        backgroundColor: colors.inputBackground,
                    },
                    styles.field,
                    style,
                ]}
            >
                {iconComponent && iconComponent}
                <TextInput
                    style={[{ color: colors.text }, styles.text, textStyle]}
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
        paddingLeft: 5,
        marginBottom: 3,
        fontWeight: 500,
        opacity: 0.6,
    },
    field: {
        justifyContent: 'center',
        minHeight: 45,
        paddingHorizontal: 15,
        borderRadius: 5,
    },
    text: {
        fontSize: 16,
    },
    clearButton: {
        position: 'absolute',
        right: 15,
        opacity: 0.5,
    },
});
export default CustomTextInput;
