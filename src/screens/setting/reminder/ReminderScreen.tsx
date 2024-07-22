import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react';

import { StyleSheet, View } from 'react-native';

import SafeAreaView from 'components/common/SafeAreaView';
import InnerNavigationBar from 'components/common/InnerNavigationBar';
import CommonListItem from 'components/common/CommonListItem';
import ScreenLayout from 'components/common/ScreenLayout';
import HorizontalDivider from 'components/common/HorizontalDivider';
import ReminderSummaryView from 'components/setting/reminder/ReminderSummaryView';
import ReminderSettingBottomSheet from 'components/overlay/bottomSheet/ReminderSettingBottomSheet';
import CustomText from 'components/common/CustomText';
import CustomSwitch from 'components/common/CustomSwitch';

import { ReminderScreenNavigationProps } from 'types/navigations/settingStack';
import { ReminderDataType } from 'types/models/reminder';

import { useNavigation } from '@react-navigation/native';
import { openSettings } from 'react-native-permissions';

import useOverlay from 'hooks/useOverlay';
import useLoading from 'hooks/useLoading';
import useToast from 'hooks/useToast';
import usePermissions from 'hooks/usePermissions';
import useAppState from 'hooks/useAppState';

import { delay } from 'utils/data';

import { commonStyles } from 'styles';
import ReminderPermissionCautionView from 'components/setting/reminder/ReminderPermissionCautionView';
import Animated from 'react-native-reanimated';

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
    const { openToast } = useToast();
    const { checkPermission, requestPermission } = usePermissions();
    const { appState } = useAppState();

    const [showPermCaution, setShowPermCaution] = useState<boolean>(false);

    const [active, setActive] = useState<boolean>(INITIAL_DATA.active);
    const [time, setTime] = useState<Date>(INITIAL_DATA.time);
    const [week, setWeek] = useState<boolean[]>(INITIAL_DATA.week);

    const { openOverlay: openSettingBottomSheet, closeOverlay: closeSettingBottomSheet } =
        useOverlay(() => (
            <ReminderSettingBottomSheet
                closeBottomSheet={closeSettingBottomSheet}
                initialTime={time}
                initialWeek={week}
                onConfirm={handleConfirm}
            />
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
    }, [INITIAL_DATA, checkPermission, setLoading]);

    useEffect(() => {
        const checkPerm = async () => {
            const perm = await checkPermission('notification');
            const PERMISSION_GRANTED = perm === 'granted';

            setShowPermCaution(PERMISSION_GRANTED ? false : true);
        };

        checkPerm();
    }, [appState, checkPermission]);

    const onPressShourcut = async () => {
        const perm = await checkPermission('notification');

        if (perm === 'blocked') {
            openSettings();
        } else {
            // 물어보지 않은 경우
            requestPermission('notification');
        }
    };

    const toggleActive = async () => {
        try {
            // check permission
            const perm = await checkPermission('notification');

            if (perm !== 'granted' && !active) {
                const requestRes = await requestPermission('notification');

                if (requestRes !== 'granted') {
                    return;
                }
                // 권한 요청 성공 시 경고 메시지 숨기기
                setShowPermCaution(false);
            }

            // 리마인더 활성화 요청시작
            setLoading(true);

            await delay(500); // 서버 요청
            setActive(prev => !prev);

            const newActiveState = !active ? '활성화' : '비활성화'; //변경 후 상태

            openToast({ text: `리마인더가 ${newActiveState} 되었어요!`, type: 'complete' });
        } catch (error) {
            console.log(error);
            openToast({ text: '오류가 발생했습니다.', type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    const handleConfirm = async (data: { time: Date; week: boolean[] }) => {
        const IS_NOT_SET_WEEK = data.week.every(e => e === false);

        if (IS_NOT_SET_WEEK) {
            openToast({ text: '요일을 1개 이상 선택해주세요', type: 'caution' });
            return;
        }

        setLoading(true);
        try {
            await delay(500);
            // 전달받은 데이터 서버로 전달
            // 정상적으로 변경 완료된 경우에 상태 변경
            setTime(data.time);
            setWeek(data.week);
            closeSettingBottomSheet();
            openToast({ text: '리마인더 설정이 변경되었어요!', type: 'complete' });
        } catch (error) {
            console.log(error);
            openToast({ text: '오류가 발생했습니다.', type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView>
            <InnerNavigationBar screenTitle="감사 리마인더 설정" goBack={goBack} />
            <ScreenLayout style={styles.container}>
                {showPermCaution && (
                    <ReminderPermissionCautionView onPressShortcut={onPressShourcut} />
                )}
                <CustomText style={commonStyles.subject}>{'리마인더 설정 미리보기'}</CustomText>
                <ReminderSummaryView time={time} week={week} />

                {/* 해당 위치에 알림 미허용인 경우 경고 메시지 표시 필요 */}

                <CommonListItem
                    title="리마인더 활성화"
                    subTitle="활성화 시 설정에 따라 알림을 드려요."
                    disabled
                    rightComponent={<CustomSwitch active={active} onChange={toggleActive} />}
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
