import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import InnerNavigationBar from 'components/common/InnerNavigationBar';
import SafeAreaView from 'components/common/SafeAreaView';
import { Text, StyleSheet, View } from 'react-native';
import {
    PostDetailScreenNavigationProps,
    PostDetailScreenRouteProps,
} from 'types/navigations/postStack';
import ScreenLayout from 'components/common/ScreenLayout';
import ImageCarousel from 'components/common/ImageCarousel';

const PostDetailScreen = () => {
    const { goBack } = useNavigation<PostDetailScreenNavigationProps>();
    const { params } = useRoute<PostDetailScreenRouteProps>();
    const { postData } = params;
    const { title, content, photos, postId, createdAt } = postData;

    const IS_THERE_IMAGE = photos.length > 0;

    return (
        <SafeAreaView>
            <InnerNavigationBar screenTitle={title} goBack={goBack} />
            <View style={{ paddingHorizontal: 20 }}>
                {IS_THERE_IMAGE && <ImageCarousel images={photos} />}
                <View>
                    <Text>PostDetailScreen</Text>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({});

export default PostDetailScreen;
