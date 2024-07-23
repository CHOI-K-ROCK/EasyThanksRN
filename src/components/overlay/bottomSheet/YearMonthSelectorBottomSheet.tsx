import React, { useCallback, useEffect, useRef, useState } from 'react';
import BottomSheet from './BottomSheet';
import FullWidthButton from 'components/common/FullWidthButton';
import { StyleSheet, View } from 'react-native';
import CustomText from 'components/common/CustomText';
import VectorIcon from 'components/common/VectorIcon';
import { commonStyles } from 'styles';
import useToast from 'hooks/useToast';

type Props = {
    date: Date;

    closeBottomSheet: () => void;
    onConfirm: (data: Date) => void;
};

const YearMonthSelectorBottomSheet = (props: Props) => {
    const { closeBottomSheet, date, onConfirm } = props;
    const { openToast } = useToast();

    const [year, setYear] = useState<number>(date.getFullYear());
    const [month, setMonth] = useState<number>(date.getMonth());
    // month의 인덱싱은 0부터, 0 -> 1월

    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();

    const openCautionToast = useCallback(
        () =>
            openToast({
                text: '지금보다 미래로 설정 할 수 없습니다.',
                type: 'caution',
            }),
        [openToast]
    );

    const handleChangeYear = useCallback(
        (type: 'inc' | 'dec') => {
            switch (type) {
                case 'inc': {
                    setYear(prevYear => {
                        if (prevYear >= currentYear) {
                            //
                            openCautionToast();
                            setMonth(currentMonth);
                            return prevYear;
                        }
                        if (prevYear >= currentYear && month >= currentMonth) {
                            openCautionToast();
                            return prevYear;
                        }
                        return prevYear + 1;
                    });
                    break;
                }
                case 'dec': {
                    setYear(prevYear => {
                        return prevYear - 1;
                    });
                    break;
                }
            }
        },
        [currentMonth, currentYear, month, openCautionToast]
    );

    const handleChangeMonth = useCallback(
        (type: 'inc' | 'dec') => {
            switch (type) {
                case 'inc': {
                    setMonth(prevMonth => {
                        if (year >= currentYear && prevMonth >= currentMonth) {
                            openCautionToast();
                            return prevMonth;
                        }
                        if (prevMonth >= 12) {
                            setYear(prevYear => prevYear + 1);
                            return 1;
                        }
                        return prevMonth + 1;
                    });
                    break;
                }
                case 'dec': {
                    setMonth(prevMonth => {
                        if (prevMonth <= 1) {
                            setYear(prevYear => prevYear - 1);
                            return 12;
                        }
                        return prevMonth - 1;
                    });
                    break;
                }
            }
        },
        [currentMonth, currentYear, openCautionToast, year]
    );

    const handleIncreaseYear = useCallback(() => handleChangeYear('inc'), [handleChangeYear]);
    const handleDecreaseYear = useCallback(() => handleChangeYear('dec'), [handleChangeYear]);
    const handleIncreaseMonth = useCallback(() => handleChangeMonth('inc'), [handleChangeMonth]);
    const handleDecreaseMonth = useCallback(() => handleChangeMonth('dec'), [handleChangeMonth]);

    const handleConfirm = () => {
        const newDate = new Date(date);

        newDate.setFullYear(year);
        newDate.setMonth(month);

        onConfirm(newDate);
    };

    return (
        <BottomSheet closeBottomSheet={closeBottomSheet}>
            <View style={styles.main.container}>
                <View style={styles.main.selectorWrapper}>
                    <Selector
                        value={year}
                        unit="년"
                        onIncrease={handleIncreaseYear}
                        onDecrease={handleDecreaseYear}
                        minWidth={90}
                    />
                    <Selector
                        value={month + 1}
                        // month 인덱싱 문제로 보여지는 값에만 +1 한다.
                        unit="월"
                        onIncrease={handleIncreaseMonth}
                        onDecrease={handleDecreaseMonth}
                        minWidth={50}
                    />
                </View>

                <View style={{ height: 30 }} />

                <FullWidthButton
                    title={'완료'}
                    onPress={handleConfirm}
                    style={{ backgroundColor: '#000' }}
                    titleStyle={{ color: '#FFF' }}
                />
            </View>
        </BottomSheet>
    );
};

const Selector = ({
    value,
    unit,
    onIncrease,
    onDecrease,
    minWidth,
}: {
    value: number;
    unit: string;
    onIncrease: () => void;
    onDecrease: () => void;
    minWidth?: number;
}) => {
    const timer = useRef<NodeJS.Timeout>();
    const [longPressed, setLongPressed] = useState<'increase' | 'decrease' | null>(null);

    useEffect(() => {
        if (longPressed !== null) {
            timer.current = setInterval(() => {
                longPressed === 'increase' ? onIncrease() : onDecrease();
            }, 100);
        } else {
            clearInterval(timer.current);
        }
    }, [longPressed, onDecrease, onIncrease]);

    const _onLongPress = (type: 'increase' | 'decrease') => {
        setLongPressed(type);
    };
    const _onPressOut = () => {
        setLongPressed(null);
    };

    return (
        <View style={commonStyles.rowCenter}>
            <View
                style={{
                    alignItems: 'center',
                }}
            >
                <VectorIcon
                    style={styles.selector.button}
                    name="plus"
                    onPress={onIncrease}
                    onLongPress={() => _onLongPress('increase')}
                    onPressOut={_onPressOut}
                />
                <View style={[styles.selector.valueWarpper, { minWidth }]}>
                    <CustomText style={[styles.selector.value]}>{value}</CustomText>
                </View>
                <VectorIcon
                    style={styles.selector.button}
                    name="minus"
                    onPress={onDecrease}
                    onLongPress={() => _onLongPress('decrease')}
                    onPressOut={_onPressOut}
                />
            </View>
            <CustomText style={styles.selector.unit}>{unit}</CustomText>
        </View>
    );
};

const styles = {
    main: StyleSheet.create({
        container: {
            padding: 20,
        },
        selectorWrapper: {
            flexDirection: 'row',
            justifyContent: 'center',
            gap: 10,
        },
    }),
    selector: StyleSheet.create({
        valueWarpper: {
            paddingVertical: 10,

            backgroundColor: '#000',
            borderRadius: 5,
            marginRight: 5,
        },
        value: {
            color: '#FFF',
            fontSize: 24,
            fontWeight: 600,
            alignSelf: 'center',
        },
        unit: {
            fontSize: 16,
            fontWeight: 600,
        },
        button: {
            paddingVertical: 15,
            paddingHorizontal: 20,
        },
    }),
};

export default YearMonthSelectorBottomSheet;
