import React, { useMemo } from 'react';

import { StyleSheet, View } from 'react-native';
import BadgeButton from 'components/common/BadgeButton';
import CustomText from 'components/common/CustomText';
import VectorIcon from 'components/common/VectorIcon';

import { getDateStrings, getDayOfWeekName } from 'utils/date';
import { commonStyles } from 'style';

type Props = {
    date: Date;

    onPressEditDate: () => void;
    onPressEditTime: () => void;

    locationString: string;
    onPressEditLocation: () => void;
};

const ComposeSummaryView = (props: Props) => {
    const { date, onPressEditDate, onPressEditTime, locationString, onPressEditLocation } = props;

    const { year, month, day, dayOfWeek, hours, min, ampm } = useMemo(
        () => getDateStrings(date),
        [date]
    );

    return (
        <View style={styles.container}>
            <View style={styles.dateContainer}>
                <View style={styles.contentCotainer}>
                    <View style={commonStyles.rowCenter}>
                        <CustomText style={[styles.date]}>
                            {year}년 {month}월 {day}일
                        </CustomText>
                        <CustomText style={styles.dayOfWeek}>
                            {getDayOfWeekName(dayOfWeek)}요일
                        </CustomText>
                    </View>
                    <BadgeButton title="날짜변경" onPress={onPressEditDate} />
                </View>

                <View style={styles.contentCotainer}>
                    <View style={commonStyles.rowCenter}>
                        <CustomText style={[styles.ampm]}>
                            {ampm === 'am' ? '오전' : '오후'}
                        </CustomText>
                        <CustomText style={[styles.time]}>
                            {hours}시 {min}분
                        </CustomText>
                    </View>
                    <BadgeButton title="시간변경" onPress={onPressEditTime} />
                </View>
            </View>

            <View style={styles.contentCotainer}>
                <View style={styles.locationContainer}>
                    <VectorIcon name="map-marker" size={14} />
                    <CustomText style={styles.location}>{locationString}</CustomText>
                </View>
                <BadgeButton title="위치변경" onPress={onPressEditLocation} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // gap: 8,
    },
    contentCotainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 7,
    },
    dateContainer: {
        marginBottom: 10,
    },
    date: {
        fontSize: 20,
        fontWeight: 600,
    },
    dayOfWeek: {
        fontSize: 15,
        fontWeight: 400,
        opacity: 0.7,
        marginLeft: 6,
    },
    ampm: {
        fontSize: 14,
        fontWeight: 600,
        opacity: 0.7,
        marginRight: 4,
        alignSelf: 'flex-end',
    },
    time: {
        fontSize: 17,
        fontWeight: 500,
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    location: {
        opacity: 0.7,
    },
});

export default ComposeSummaryView;
