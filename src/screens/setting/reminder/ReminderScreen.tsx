import React, { useLayoutEffect, useMemo, useState } from 'react';

import { StyleSheet, View } from 'react-native';

import SafeAreaView from 'components/common/SafeAreaView';
import InnerNavigationBar from 'components/common/InnerNavigationBar';
import CommonListItem from 'components/common/CommonListItem';
import ScreenLayout from 'components/common/ScreenLayout';
import CheckBox from 'components/common/CheckBox';
import HorizontalDivider from 'components/common/HorizontalDivider';
import BottomSheet from 'components/overlay/bottomSheet/BottomSheet';
import ReminderSettingView from 'components/setting/reminder/ReminderSettingView';

import { ReminderScreenNavigationProps } from 'types/navigations/settingStack';
import { ReminderDataType } from 'types/models/reminder';

import { useNavigation } from '@react-navigation/native';
import useOverlay from 'hooks/useOverlay';
import useLoading from 'hooks/useLoading';

import { delay } from 'utils/data';
import CustomText from 'components/common/CustomText';
import { commonStyles } from 'styles';
import useCustomTheme from 'hooks/useCustomTheme';
import { getDateStrings } from 'utils/date';
import { WEEK_DAYS } from 'constants/string';
import ReminderSummaryView from 'components/setting/reminder/ReminderSummaryView';

const INITIAL_WEEK = [true, true, true, true, true, true, true];

const ReminderScreen = () => {
    const INITIAL_DATA: ReminderDataType = useMemo(() => {
        const date = new Date();
        date.setHours(18);
        date.setMinutes(0);

        return {
            time: date,
            week: INITIAL_WEEK,
            active: false,
        };
    }, []);

    const { goBack } = useNavigation<ReminderScreenNavigationProps>();
    const { setLoading } = useLoading();
    const { colors } = useCustomTheme();

    const [active, setActive] = useState<boolean>(INITIAL_DATA.active);
    const [time, setTime] = useState<Date>(INITIAL_DATA.time);
    const [week, setWeek] = useState<boolean[]>(INITIAL_DATA.week);

    const { openOverlay: openSettingBottomSheet, closeOverlay: closeSettingBottomSheet } =
        useOverlay(() => (
            <BottomSheet closeBottomSheet={closeSettingBottomSheet}>
                <ReminderSettingView
                    initialTime={time}
                    initialWeek={week}
                    onConfirm={handleConfirm}
                />
            </BottomSheet>
        ));

    useLayoutEffect(() => {
        const checkReminderData = async () => {
            setLoading(true);

            try {
                await delay(1000);
                const res = INITIAL_DATA;

                setActive(res.active);
                setTime(res.time);
                setWeek(res.week);
            } catch (error) {
                if (error) {
                    console.log(error);
                }
            } finally {
                setLoading(false);
            }
        };

        checkReminderData();
    }, [INITIAL_DATA, setLoading]);

    const handleConfirm = async (data: { time: Date; week: boolean[] }) => {
        // 전달받은 데이터 서버로 전달
        // 정상적으로 변경 완료된 경우에 상태 변경
        const IS_NOT_SET_WEEK = week.every(e => e === false);
        console.log('week', week);

        if (IS_NOT_SET_WEEK) {
            console.log('요일 미설정');
            return;
        }

        setLoading(true);
        try {
            await delay(500);
            setTime(data.time);
            setWeek(data.week);
            closeSettingBottomSheet();
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const toggleActive = async () => {
        setLoading(true);

        try {
            await delay(500);
            console.log(!active);
            setActive(prev => !prev);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView>
            <InnerNavigationBar screenTitle="감사 리마인더 설정" goBack={goBack} />
            <ScreenLayout style={styles.container}>
                <CustomText style={commonStyles.subject}>{'리마인더 설정 미리보기'}</CustomText>
                <ReminderSummaryView time={time} week={week} />

                <CommonListItem
                    title="리마인더 활성화"
                    subTitle="활성화 시 설정에 따라 알림을 드려요."
                    onPress={toggleActive}
                    rightComponent={<CheckBox checked={active} />}
                />

                <HorizontalDivider type="block" />

                <CommonListItem
                    title="리마인더 설정"
                    subTitle="리마인더의 시간과 요일을 설정합니다."
                    onPress={openSettingBottomSheet}
                    chevron
                />
            </ScreenLayout>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 15,
    },
});

export default ReminderScreen;
