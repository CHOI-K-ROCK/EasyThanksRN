import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { FlatList, StyleSheet, View } from 'react-native';
import SafeAreaView from 'components/common/SafeAreaView';
import MainNavigationBar from 'components/main/MainNavigationBar';
import VectorIcon from 'components/common/VectorIcon';
import CustomText from 'components/common/CustomText';
import ScreenLayout from 'components/common/ScreenLayout';
import PostThumbnail from 'components/common/PostThumbnail';
import PushAnimatedPressable from 'components/common/PushAnimatedPressable';
import YearMonthSelectorBottomSheet from 'components/overlay/bottomSheet/YearMonthSelectorBottomSheet';

import { PostDataType } from 'types/models/compose';
import { RootStackNavigationProps } from 'types/navigations/rootStack';

import { useNavigation } from '@react-navigation/native';
import useOverlay from 'hooks/useOverlay';
import useLoading from 'hooks/useLoading';
import useToast from 'hooks/useToast';
import useCustomTheme from 'hooks/useCustomTheme';

import { getDateStrings } from 'utils/date';
import { arrayToObjectUsingRefKey } from 'utils/data';

import { getPostByMonth, subscribeMonthlyPost } from 'services/posts';

import { useRecoilState, useRecoilValue } from 'recoil';
import { monthlyPostAtom } from 'states/posts';

import { commonStyles } from 'styles';
import { supabase } from 'services/supabase';
import { userDataAtom } from 'states/user';

const PostScreen = () => {
    const { colors } = useCustomTheme();
    const { setLoading } = useLoading();
    const { openToast } = useToast();

    const { navigate } = useNavigation<RootStackNavigationProps>();

    const [lookUpDate, setLookUpDate] = useState<Date>(new Date());
    const [monthlyPost, setMonthlyPost] = useRecoilState(monthlyPostAtom);

    const userData = useRecoilValue(userDataAtom);

    const postData = useMemo(
        () => Object.entries(monthlyPost).map(([_, data]) => data),
        [monthlyPost]
    );

    const getPosts = useCallback(
        async (date: Date) => {
            try {
                const res = await getPostByMonth(date);
                setMonthlyPost(arrayToObjectUsingRefKey('id', res));
            } catch (error) {
                console.log(error);
            }
        },
        [setMonthlyPost]
    );

    useEffect(() => {
        getPosts(new Date());
    }, [getPosts]);

    useEffect(() => {
        const sub = subscribeMonthlyPost(userData.id, payload => {
            const newPostDate = new Date(payload.new.date);

            if (lookUpDate.getMonth() === newPostDate.getMonth()) {
                // 현재 조회중인 월의 게시글이 변경 될때 만 게시글 갱신
                getPosts(lookUpDate);
            }
        });

        return () => {
            supabase.removeChannel(sub);
        };
    }, [getPosts, lookUpDate, userData]);

    const {
        openOverlay: openYearMonthSelectorBottomSheet,
        closeOverlay: closeYearMonthSelectorBottomSheet,
    } = useOverlay(() => (
        <YearMonthSelectorBottomSheet
            closeBottomSheet={closeYearMonthSelectorBottomSheet}
            date={lookUpDate}
            onConfirm={handleConfirm}
        />
    ));

    const toAppMenu = useCallback(() => {
        navigate('SettingStack', {
            screen: 'SettingScreen',
        });
    }, [navigate]);

    // handler
    const handleConfirm = useCallback(
        async (date: Date) => {
            const newYear = date.getFullYear();
            const newMonth = date.getMonth();

            try {
                setLoading(true);
                setLookUpDate(date);

                const res = await getPostByMonth(date);
                closeYearMonthSelectorBottomSheet();

                setMonthlyPost(arrayToObjectUsingRefKey('id', res));

                openToast({
                    text: `${newYear}년 ${newMonth + 1}월을 불러왔어요!`,
                    type: 'complete',
                });
            } catch (error) {
                console.log(error);
                openToast({ text: '오류가 발생했습니다.', type: 'error' });
            } finally {
                setLoading(false);
            }
        },
        [closeYearMonthSelectorBottomSheet, openToast, setLoading, setMonthlyPost]
    );

    // ui

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
        return item.id + Math.random();
    }, []);

    return (
        <SafeAreaView>
            <MainNavigationBar
                leftComponent={
                    <VectorIcon onPress={toAppMenu} name="cog" size={25} color={colors.text} />
                }
            />
            <ScreenLayout style={styles.main.container}>
                <View style={styles.main.lookUpDateContainer}>
                    <CustomText style={commonStyles.subject}>조회 시기 선택</CustomText>
                    <ChangeLookUpDateButton
                        date={lookUpDate}
                        onPress={openYearMonthSelectorBottomSheet}
                    />
                </View>

                <CustomText style={commonStyles.subject}>조회 결과</CustomText>
                <FlatList data={postData} renderItem={_renderItem} keyExtractor={_keyExtractor} />
            </ScreenLayout>
        </SafeAreaView>
    );
};

// deps component

const ChangeLookUpDateButton = ({ date, onPress }: { date: Date; onPress: () => void }) => {
    const { year, month } = getDateStrings(date);

    return (
        <PushAnimatedPressable
            onPress={onPress}
            scale={0.98}
            style={styles.lookUpDateButton.wrapper}
        >
            <CustomText>
                <CustomText style={styles.lookUpDateButton.date}>{year}</CustomText>
                <CustomText style={styles.lookUpDateButton.text}>{'년 '}</CustomText>
                <CustomText style={styles.lookUpDateButton.date}>{month}</CustomText>
                <CustomText style={styles.lookUpDateButton.text}>{'월'}</CustomText>
            </CustomText>

            <View style={commonStyles.rowCenter}>
                <CustomText>{'변경하기'}</CustomText>
                <VectorIcon name="chevron-right" color={'#FFF'} />
            </View>
        </PushAnimatedPressable>
    );
};

// styles

const main = StyleSheet.create({
    container: {
        paddingTop: 20,
    },
    lookUpDateContainer: {
        marginBottom: 15,
    },
});

const lookUpDateButton = StyleSheet.create({
    wrapper: {
        padding: 10,
        backgroundColor: '#000',
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    text: { fontSize: 16, color: '#FFF' },
    date: {
        fontSize: 24,
        fontWeight: 600,
        color: '#FFF',
    },
});

const styles = {
    main,
    lookUpDateButton,
};

export default PostScreen;
