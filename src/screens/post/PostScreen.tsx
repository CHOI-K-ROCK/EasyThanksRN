import React, { useCallback, useMemo, useState } from 'react';

import { FlatList, StyleSheet, View } from 'react-native';
import SafeAreaView from 'components/common/SafeAreaView';
import useCustomTheme from 'hooks/useCustomTheme';
import MainNavigationBar from 'components/main/MainNavigationBar';
import VectorIcon from 'components/common/VectorIcon';
import { useNavigation } from '@react-navigation/native';
import { RootStackNavigationProps } from 'types/navigations/rootStack';
import { commonStyles } from 'styles';
import CustomText from 'components/common/CustomText';
import ScreenLayout from 'components/common/ScreenLayout';
import { PostDataType } from 'types/models/compose';

import {
    DUMMY_POST_MULTI_IMAGE,
    DUMMY_POST_NONE_IMAGE,
    DUMMY_POST_SINGLE_IMAGE,
} from 'constants/dummy';

import PostThumbnail from 'components/common/PostThumbnail';
import { getDateStrings } from 'utils/date';
import CommonListItem from 'components/common/CommonListItem';
import PushAnimatedPressable from 'components/common/PushAnimatedPressable';
import DatePicker from 'react-native-date-picker';
import useOverlay from 'hooks/useOverlay';
import YearMonthSelectorBottomSheet from 'components/overlay/bottomSheet/YearMonthSelectorBottomSheet';
import { delay } from 'utils/data';
import useLoading from 'hooks/useLoading';
import useToast from 'hooks/useToast';

const DUMMY_POSTS = [DUMMY_POST_NONE_IMAGE, DUMMY_POST_SINGLE_IMAGE, DUMMY_POST_MULTI_IMAGE];

const PostScreen = () => {
    const { colors } = useCustomTheme();
    const { setLoading } = useLoading();
    const { openToast } = useToast();

    const { navigate } = useNavigation<RootStackNavigationProps>();

    const [lookUpDate, setLookUpDate] = useState<Date>(new Date());

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

    const toAppMenu = () => {
        navigate('SettingStack', {
            screen: 'SettingScreen',
        });
    };

    // handler
    const handleConfirm = async (date: Date) => {
        const newYear = date.getFullYear();
        const newMonth = date.getMonth();

        try {
            setLoading(true);
            console.log(date);
            await delay(1000); // 요청

            setLookUpDate(date);
            closeYearMonthSelectorBottomSheet();
            openToast({
                text: `${newYear}년 ${newMonth + 1}월을 불러왔어요!`,
                type: 'complete',
            });
        } catch (error) {
            openToast({ text: '오류가 발생했습니다.', type: 'error' });
        } finally {
            setLoading(false);
        }
    };

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
                            params: { postData: item },
                        })
                    }
                />
            );
        },
        [navigate]
    );

    const _keyExtractor = useCallback((item: PostDataType) => {
        return item.postId + Math.random();
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
                <FlatList
                    // data={[...DUMMY_POSTS, ...DUMMY_POSTS, ...DUMMY_POSTS]}
                    data={DUMMY_POSTS}
                    renderItem={_renderItem}
                    keyExtractor={_keyExtractor}
                />
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
