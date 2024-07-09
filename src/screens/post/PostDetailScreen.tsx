import { useNavigation, useRoute } from '@react-navigation/native';
import InnerNavigationBar from 'components/common/InnerNavigationBar';
import SafeAreaView from 'components/common/SafeAreaView';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
    PostDetailScreenNavigationProps,
    PostDetailScreenRouteProps,
} from 'types/navigations/postStack';

const PostDetailScreen = () => {
    const { goBack } = useNavigation<PostDetailScreenNavigationProps>();
    const { params } = useRoute<PostDetailScreenRouteProps>();
    const { postData } = params;
    const { title, content, photos, postId, createdAt } = postData;

    return (
        <SafeAreaView>
            <InnerNavigationBar screenTitle={title.repeat(2)} goBack={goBack} />
            <Text>PostDetailScreen</Text>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({});

export default PostDetailScreen;
