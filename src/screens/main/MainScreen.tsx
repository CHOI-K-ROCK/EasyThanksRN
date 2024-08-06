import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { FlatList, RefreshControl, StyleSheet, View } from 'react-native';
import SafeAreaView from 'components/common/SafeAreaView';
import MainNavigationBar from 'components/main/MainNavigationBar';
import VectorIcon from 'components/common/VectorIcon';
import CustomText from 'components/common/CustomText';
import ScreenLayout from 'components/common/ScreenLayout';
import PostThumbnail from 'components/common/PostThumbnail';

import { RootStackNavigationProps } from 'types/navigations/rootStack';
import { PostDataType } from 'types/models/compose';

import { useNavigation } from '@react-navigation/native';
import useCustomTheme from 'hooks/useCustomTheme';
import { getPostToday, subscribeDailyPost } from 'services/posts';

import { useRecoilState, useRecoilValue } from 'recoil';
import { todayPostAtom } from 'states/posts';

import { commonStyles } from 'styles';
import { arrayToObjectUsingRefKey } from 'utils/data';
import { userDataAtom } from 'states/user';
import { supabase } from 'services/supabase';

const MainScreen = () => {
    const { colors } = useCustomTheme();

    const { navigate } = useNavigation<RootStackNavigationProps>();

    const userData = useRecoilValue(userDataAtom);
    const [todayPost, setTodayPost] = useRecoilState(todayPostAtom);
    const [refresh, setRefresh] = useState(false);

    const postData = useMemo(() => Object.entries(todayPost).map(([_, data]) => data), [todayPost]);

    const getPosts = useCallback(async () => {
        try {
            const res = await getPostToday();
            setTodayPost(arrayToObjectUsingRefKey('id', res));
        } catch (error) {
            console.log(error);
        }
    }, [setTodayPost]);

    useEffect(() => {
        getPosts();

        const sub = subscribeDailyPost(userData.id, payload => {
            const newPostDate = new Date(payload.new.created_at);
            console.log(payload);

            if (new Date().getDate() === newPostDate.getDate()) {
                // 오늘 업데이트 된 글일 경우만
                getPosts();
            }
        });

        return () => {
            supabase.removeChannel(sub);
        };
    }, [getPosts, userData]);

    const onRefresh = useCallback(async () => {
        setRefresh(true);
        await getPosts();
        setRefresh(false);
    }, [getPosts]);

    const toAppMenu = () => {
        navigate('SettingStack', {
            screen: 'SettingScreen',
        });
    };

    // flatlist
    const _renderItem = useCallback(
        ({ item }: { item: PostDataType }) => {
            return (
                <PostThumbnail
                    data={item}
                    style={{ marginBottom: 15 }}
                    onPress={() =>
                        navigate('PostStack', {
                            screen: 'PostDetailScreen',
                            params: { postId: item.id },
                        })
                    }
                />
            );
        },
        [navigate]
    );

    const _keyExtractor = useCallback((item: PostDataType) => {
        return item.id;
    }, []);

    return (
        <SafeAreaView>
            <MainNavigationBar
                leftComponent={
                    <VectorIcon onPress={toAppMenu} name="cog" size={25} color={colors.text} />
                }
            />
            <ScreenLayout>
                <FlatList
                    data={postData}
                    renderItem={_renderItem}
                    keyExtractor={_keyExtractor}
                    ListHeaderComponent={
                        <CustomText style={commonStyles.subject}>오늘 작성한 감사일기</CustomText>
                    }
                    ListHeaderComponentStyle={styles.headerContainer}
                    refreshControl={<RefreshControl refreshing={refresh} onRefresh={onRefresh} />}
                />
            </ScreenLayout>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        paddingTop: 20,
    },
});

export default MainScreen;
