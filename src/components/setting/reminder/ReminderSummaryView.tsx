import CustomText from 'components/common/CustomText';
import { WEEK_DAYS } from 'constants/string';
import useCustomTheme from 'hooks/useCustomTheme';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { getDateStrings } from 'utils/date';

type Props = {
    time: Date;
    week: boolean[];
};

const ReminderSummaryView = (props: Props) => {
    const { colors } = useCustomTheme();
    const { time, week } = props;

    const renderDays = () => {
        const [mon, tue, wed, thu, fri, sat, sun] = week;

        const IS_WEEKEND = !mon && !tue && !wed && !thu && !fri && sat && sun;
        const IS_WEEKDAY = mon && tue && wed && thu && fri && !sat && !sun;
        const IS_ALL_DAY = week.every(e => e === true);

        let weekString: string = '';

        if (IS_ALL_DAY) weekString = '매일';
        if (IS_WEEKEND) weekString = '주말';
        if (IS_WEEKDAY) weekString = '평일';

        if (IS_ALL_DAY || IS_WEEKEND || IS_WEEKDAY) {
            return (
                <View style={styles.dayWrapper}>
                    <CustomText style={styles.dayText}>{weekString}</CustomText>
                </View>
            );
        }

        const filteredWeekDay = WEEK_DAYS.filter((_, idx) => {
            return week[idx];
        });

        return filteredWeekDay.map(day => {
            return (
                <View key={day} style={styles.dayWrapper}>
                    <CustomText style={styles.dayText}>{day}</CustomText>
                </View>
            );
        });
    };

    const renderTimeText = () => {
        const { hours, min, ampm } = getDateStrings(time);
        const ampmString = ampm === 'am' ? '오전' : '오후';
        const padMin = min.padStart(2, '0');

        return (
            <View style={{ flexDirection: 'row' }}>
                <CustomText>{ampmString + ' '}</CustomText>
                <CustomText>{hours}</CustomText>
                <CustomText>{'시 '}</CustomText>
                <CustomText>{padMin}</CustomText>
                <CustomText>{'분'}</CustomText>
            </View>
        );
    };

    return (
        <View
            style={{
                backgroundColor: colors.inputBackground,
                padding: 15,
                borderRadius: 5,
            }}
        >
            <View style={{ gap: 5, flexDirection: 'row', marginBottom: 5 }}>{renderDays()}</View>
            <CustomText>{renderTimeText()}</CustomText>
            <CustomText>{'마다 리마인더 알림을 드려요!'}</CustomText>
        </View>
    );
};

const styles = StyleSheet.create({
    dayWrapper: {
        padding: 5,
        backgroundColor: '#000',
        borderRadius: 5,
    },
    dayText: {
        color: '#FFF',
        fontWeight: 500,
    },
});

export default ReminderSummaryView;
