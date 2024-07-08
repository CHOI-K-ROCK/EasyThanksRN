import React from 'react';

import { Image, StyleSheet, View } from 'react-native';
import CustomText from './CustomText';

import { PostDataType } from 'types/models/compose';

import useCustomTheme from 'hooks/useCustomTheme';

import { convertDateToString } from 'utils/date';

import { commonStyles } from 'styles';
import PushAnimatedPressable from './PushAnimatedPressable';

type Props = {
    data: PostDataType;
    onPress: () => void;
};

const PostThumbnail = (props: Props) => {
    const { colors } = useCustomTheme();
    const { data, onPress } = props;

    const { title, content, photos, createdAt } = data;

    const dateString = convertDateToString(new Date(createdAt));
    const defaultImage = photos[0]; // 첫번째 이미지가 썸네일에 표시된다.

    return (
        <PushAnimatedPressable
            scale={0.98}
            activeOpacity={0.9}
            onPress={onPress}
            style={[{ backgroundColor: colors.tabBarBackground }, styles.container]}
        >
            {defaultImage && (
                <View style={[StyleSheet.absoluteFill, { borderRadius: 10, overflow: 'hidden' }]}>
                    <Image
                        resizeMode="cover"
                        source={{ uri: defaultImage }}
                        style={[StyleSheet.absoluteFill]}
                    />
                    <View
                        style={[
                            StyleSheet.absoluteFill,
                            { backgroundColor: colors.textReverse + '80' },
                        ]}
                    />
                </View>
            )}
            <View style={styles.titleContainer}>
                <CustomText style={styles.title}>{title}</CustomText>
                <CustomText style={styles.date}>{dateString}</CustomText>
            </View>
            <CustomText style={styles.content} numberOfLines={2}>
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
    titleContainer: {
        // flexDirection: 'row',
        justifyContent: 'space-between',
        // alignItems: 'flex-end',
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
