import React, { useCallback } from 'react';

import { Image, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import CustomText from './CustomText';
import PushAnimatedPressable from './PushAnimatedPressable';
import LinearGradientView from './LinearGradientView';

import { PostDataType } from 'types/models/compose';

import useCustomTheme from 'hooks/useCustomTheme';

import { convertDateToString } from 'utils/date';

import { commonStyles } from 'styles';

type Props = {
    data: PostDataType;
    onPress: () => void;
    style?: StyleProp<ViewStyle>;
};

const PostThumbnail = (props: Props) => {
    const { colors, dark } = useCustomTheme();
    const { data, style, onPress } = props;

    const { title, content, photos, date } = data;

    const dateString = convertDateToString(new Date(date));
    const defaultImage = photos[0]; // 첫번째 이미지가 썸네일에 표시된다.

    const textColor = !dark && defaultImage ? '#FFF' : colors.text;

    return (
        <PushAnimatedPressable
            scale={0.98}
            activeOpacity={0.9}
            onPress={onPress}
            style={[{ backgroundColor: colors.tabBarBackground }, styles.container, style]}
        >
            {defaultImage && (
                <View style={[StyleSheet.absoluteFill, styles.imageContainer]}>
                    <Image
                        resizeMode="cover"
                        source={{ uri: defaultImage }}
                        style={[StyleSheet.absoluteFill]}
                    />
                    <LinearGradientView
                        colors={['rgba(0,0,0,0.9)', 0]}
                        locations={[0.1, 0.7]}
                        gradientDirection="ltr"
                        style={StyleSheet.absoluteFill}
                    />
                </View>
            )}
            <View style={styles.titleContainer}>
                <CustomText style={[{ color: textColor }, styles.title]}>{title}</CustomText>
                <CustomText style={[{ color: textColor }, styles.date]}>{dateString}</CustomText>
            </View>
            <CustomText style={[{ color: textColor }, styles.content]} numberOfLines={2}>
                {content}
            </CustomText>
        </PushAnimatedPressable>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 15,
        height: 120,
        borderRadius: 10,
        justifyContent: 'space-between',

        ...commonStyles.dropShadow,
    },
    imageContainer: {
        borderRadius: 10,
        overflow: 'hidden',
    },
    titleContainer: {
        justifyContent: 'space-between',
    },
    title: {
        fontSize: 20,
        fontWeight: 600,
    },
    date: {
        fontWeight: 300,
    },
    content: {},
});

export default PostThumbnail;
