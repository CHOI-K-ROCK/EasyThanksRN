import React, { useState } from 'react';

import SafeAreaView from 'components/common/SafeAreaView';
import InnerNavigationBar from 'components/common/InnerNavigationBar';

import { useNavigation } from '@react-navigation/native';
import { ReminderScreenNavigationProps } from 'types/navigations/settingStack';
import CommonListItem from 'components/common/CommonListItem';
import ScreenLayout from 'components/common/ScreenLayout';
import CheckBox from 'components/common/CheckBox';
import CustomText from 'components/common/CustomText';
import { commonStyles } from 'styles';
import HorizontalDivider from 'components/common/HorizontalDivider';
import { StyleSheet, View } from 'react-native';
import DatePicker from 'react-native-date-picker';
import ReminderWeekDaySelector from '../../../components/setting/reminder/ReminderWeekDaySelector';
import useCustomTheme from 'hooks/useCustomTheme';
import useOverlay from 'hooks/useOverlay';
import BottomSheet from 'components/overlay/bottomSheet/BottomSheet';

const ReminderScreen = () => {
    const { dark } = useCustomTheme();
    const { goBack } = useNavigation<ReminderScreenNavigationProps>();

    const [time, setTime] = useState<Date>(new Date());
    const [week, setWeek] = useState<boolean[]>([false, true, false, false, false, false, false]);
    const [active, setActive] = useState<boolean>(false);

    const toggleActive = () => {
        setActive(prev => !prev);
    };

    console.log(time, week, active);

    const { openOverlay, closeOverlay } = useOverlay(() => (
        <BottomSheet closeBottomSheet={closeOverlay}>
            <View style={{ padding: 20 }}>
                <CustomText style={styles.subject}>{'시간 설정'}</CustomText>
                <View style={{ alignItems: 'center' }}>
                    <DatePicker
                        key={dark ? 'dark' : 'light'} // 기기테마 변경 미 반영 문제 해결
                        mode="time"
                        date={time}
                        minuteInterval={5}
                        onDateChange={setTime}
                    />
                </View>

                <CustomText style={styles.subject}>{'요일 설정'}</CustomText>
                <ReminderWeekDaySelector initialValue={week} onSelect={setWeek} />
            </View>
        </BottomSheet>
    ));

    return (
        <SafeAreaView>
            <InnerNavigationBar screenTitle="감사 리마인더 설정" goBack={goBack} />
            <ScreenLayout>
                <CommonListItem
                    title="리마인더 활성화"
                    subTitle="활성화 시 설정에 따라 알림을 드려요."
                    onPress={toggleActive}
                    rightComponent={<CheckBox checked={active} />}
                />
                <HorizontalDivider type="block" style={{ marginBottom: 15 }} />
                <CommonListItem
                    title="리마인더 활성화"
                    subTitle="활성화 시 설정에 따라 알림을 드려요."
                    onPress={openOverlay}
                />
            </ScreenLayout>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    subject: {
        ...commonStyles.subject,
        marginBottom: 10,
    },
});

export default ReminderScreen;
