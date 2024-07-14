import React, { useCallback, useState } from 'react';

import { FlatList, StyleSheet, View } from 'react-native';
import SafeAreaView from 'components/common/SafeAreaView';
import MainNavigationBar from 'components/main/MainNavigationBar';
import VectorIcon from 'components/common/VectorIcon';
import CustomText from 'components/common/CustomText';
import ScreenLayout from 'components/common/ScreenLayout';

import { RootStackNavigationProps } from 'types/navigations/rootStack';

import { useNavigation } from '@react-navigation/native';
import useCustomTheme from 'hooks/useCustomTheme';

import { commonStyles } from 'styles';

import {
    DUMMY_POST_MULTI_IMAGE,
    DUMMY_POST_NONE_IMAGE,
    DUMMY_POST_SINGLE_IMAGE,
} from 'constants/dummy';

import PostThumbnail from 'components/common/PostThumbnail';
import { PostDataType } from 'types/models/compose';

const DUMMY_POSTS = [DUMMY_POST_NONE_IMAGE, DUMMY_POST_SINGLE_IMAGE, DUMMY_POST_MULTI_IMAGE];

const MainScreen = () => {
    const { colors } = useCustomTheme();

    const { navigate } = useNavigation<RootStackNavigationProps>();

    const toAppMenu = () => {
        navigate('SettingStack', {
            screen: 'SettingScreen',
        });
    };

    // ui
    const renderHeader = useCallback(() => {
        return <CustomText style={commonStyles.subject}>오늘 작성한 감사일기</CustomText>;
    }, []);

    // flatlist
    const _renderItem = useCallback(
        ({ item }: { item: PostDataType }) => {
            return (
                <View style={styles.thumbnailContainer}>
                    <PostThumbnail
                        data={item}
                        onPress={() =>
                            navigate('PostStack', {
                                screen: 'PostDetailScreen',
                                params: { postData: item },
                            })
                        }
                    />
                </View>
            );
        },
        [navigate]
    );

    const _keyExtractor = useCallback((item: PostDataType) => {
        return item.postId;
    }, []);

    return (
        <SafeAreaView topAreaBackgroundColor={colors.tabBarBackground}>
            <MainNavigationBar
                leftComponent={
                    <VectorIcon onPress={toAppMenu} name="cog" size={25} color={colors.text} />
                }
            />
            <ScreenLayout>
                <FlatList
                    data={DUMMY_POSTS}
                    renderItem={_renderItem}
                    keyExtractor={_keyExtractor}
                    ListHeaderComponent={renderHeader}
                    ListHeaderComponentStyle={styles.headerContainer}
                />
            </ScreenLayout>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        paddingTop: 20,
    },
    thumbnailContainer: {
        marginBottom: 15,
    },
});

export default MainScreen;
