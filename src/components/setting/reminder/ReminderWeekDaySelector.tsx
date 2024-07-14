import CustomText from 'components/common/CustomText';
import PushAnimatedPressable from 'components/common/PushAnimatedPressable';
import { WEEK_DAYS } from 'constants/string';
import useCustomTheme from 'hooks/useCustomTheme';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { commonStyles } from 'styles';

type Props = {
    initialValue: boolean[];
    onSelect: (data: boolean[]) => void;
};

const ReminderWeekDaySelector = (props: Props) => {
    const { colors } = useCustomTheme();
    const { initialValue, onSelect } = props;

    const [selected, setSelected] = useState<boolean[]>(
        initialValue || [false, false, false, false, false, false, false]
    );

    const SELECTED_BACKGROUND_COLOR = '#000';
    const DISABLED_BACKGROUND_COLOR = colors.tabBarBackground;
    const SELECTED_TEXT_COLOR = '#FFF';
    const DISABLED_TEXT_COLOR = colors.text;

    const onSelectHandler = (idx: number) => {
        setSelected(prev => {
            const temp = [...prev];

            temp[idx] = !prev[idx];

            return temp;
        });
        onSelect(selected);
    };

    return (
        <View style={styles.container}>
            {WEEK_DAYS.map((day, idx) => {
                const isSelected = selected[idx];

                return (
                    <PushAnimatedPressable
                        onPress={() => onSelectHandler(idx)}
                        style={[
                            {
                                backgroundColor: isSelected
                                    ? SELECTED_BACKGROUND_COLOR
                                    : DISABLED_BACKGROUND_COLOR,
                            },
                            styles.day,
                        ]}
                    >
                        <CustomText
                            style={[
                                {
                                    opacity: isSelected ? 1 : 0.3,
                                    color: isSelected ? SELECTED_TEXT_COLOR : DISABLED_TEXT_COLOR,
                                },
                                styles.text,
                            ]}
                        >
                            {WEEK_DAYS[idx]}
                        </CustomText>
                    </PushAnimatedPressable>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    day: {
        padding: 10,
        borderRadius: 5,
        ...commonStyles.dropShadow,
    },
    text: {
        fontSize: 16,
        fontWeight: 500,
    },
});

export default ReminderWeekDaySelector;
