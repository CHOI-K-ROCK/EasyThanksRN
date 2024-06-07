import React, { ReactNode } from 'react';
import { StyleProp, StyleSheet, TextInput, TextInputProps, View, ViewStyle } from 'react-native';
import useCustomTheme from '../../hooks/useCustomTheme';
import VectorIcon from './VectorIcon';

type Props = TextInputProps & {
    textStyle: StyleProp<ViewStyle>;
    clearButton?: boolean;
    onPressClear?: () => void;
    iconComponent?: ReactNode;
};

const CustomTextInput = (props: Props) => {
    const { colors } = useCustomTheme();
    const {
        style,
        textStyle,

        clearButton = false,
        onPressClear,

        iconComponent,
        ...restProps
    } = props;

    return (
        <View
            style={[
                {
                    backgroundColor: colors.inputBackground,
                },
                styles.field,
                style,
            ]}
        >
            {iconComponent && iconComponent()}
            <TextInput style={[{ color: colors.text }, styles.text, textStyle]} {...restProps} />

            {clearButton && (
                <VectorIcon onPress={onPressClear} name="close" style={styles.clearButton} />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
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
