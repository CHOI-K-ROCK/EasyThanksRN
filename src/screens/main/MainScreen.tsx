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
import { getPostToday } from 'services/posts';

import { useRecoilState } from 'recoil';
import { todayPostAtom } from 'states/posts';

import { commonStyles } from 'styles';
import { arrayToObjectUsingRefKey } from 'utils/data';

const MainScreen = () => {
    const { colors } = useCustomTheme();

    const { navigate } = useNavigation<RootStackNavigationProps>();

    const [todayPost, setTodayPost] = useRecoilState(todayPostAtom);
    const [refresh, setRefresh] = useState(false);

    const getPost = useCallback(async () => {
        try {
            const res = await getPostToday();
            setTodayPost(arrayToObjectUsingRefKey('id', res));
        } catch (error) {
            console.log(error);
        }
    }, [setTodayPost]);

    const onRefresh = async () => {
        setRefresh(true);
        await getPost();
        setRefresh(false);
    };

    useEffect(() => {
        getPost();
    }, [getPost]);

    const postData = useMemo(
        () => Object.entries(todayPost || {}).map(([_, data]) => data),
        [todayPost]
    );

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
                            params: { postData: item },
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
