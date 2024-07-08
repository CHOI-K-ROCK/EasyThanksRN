import React from 'react';
import { PostDataType } from 'types/models/compose';
import CustomText from './CustomText';
import { View } from 'react-native';

type Props = {
    data: PostDataType;
};

const PostThumbnail = (props: Props) => {
    const { data } = props;

    const { content, photos, createdAt } = data;

    return (
        <View>
            <CustomText>{content}</CustomText>
        </View>
    );
};

export default PostThumbnail;
