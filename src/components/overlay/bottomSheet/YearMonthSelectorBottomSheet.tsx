import React, { useCallback, useEffect, useRef, useState } from 'react';

import { StyleSheet, View } from 'react-native';
import FullWidthButton from 'components/common/FullWidthButton';
import CustomText from 'components/common/CustomText';
import VectorIcon from 'components/common/VectorIcon';
import BottomSheet from './BottomSheet';

import { commonStyles } from 'styles';
import useToast from 'hooks/useToast';
import PushAnimatedPressable from 'components/common/PushAnimatedPressable';

type Props = {
    date: Date;

    closeBottomSheet: () => void;
    onConfirm: (data: Date) => void;
};

const YearMonthSelectorBottomSheet = (props: Props) => {
    const { openToast } = useToast();

    const { closeBottomSheet, date, onConfirm } = props;

    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();

    const [monthMax, setMonthMax] = useState<number>(currentMonth + 1);

    const yearRef = useRef<number>(date.getFullYear());
    const monthRef = useRef<number>(date.getMonth() + 1);
    // month의 인덱싱은 0부터, 0 -> 1월

    const openFutureCautionToast = useCallback(() => {
        openToast({ text: '지금보다 미래로 설정 할 수 없어요!', type: 'caution' });
    }, [openToast]);

    const handleChangeYear = useCallback(
        (value: number) => {
            if (
                value === currentYear ||
                // 연도가 현재 연도인 경우거나,
                (value === currentYear && monthRef.current >= currentMonth + 1 && monthMax === 12)
                // 연도가 현제 연도와 같고, 설정 월이 현재 월보다 크거나 같고, 월 최대값이 12인 경우 (중복 변경 방지)
            ) {
                setMonthMax(currentMonth + 1);
            }

            if (value < currentYear && monthMax === currentMonth + 1) {
                // 값이 현재 연도보다 작고, 최대 월이 현재 월과 같은 경우
                setMonthMax(12);
            }

            yearRef.current = value;
        },
        [currentMonth, currentYear, monthMax]
    );

    const handleChangeMonth = useCallback((value: number) => {
        monthRef.current = value;
    }, []);

    const onYearMaxReached = useCallback(() => {
        openFutureCautionToast();
    }, [openFutureCautionToast]);

    const onMonthMaxReached = useCallback(() => {
        if (yearRef.current === currentYear) {
            openFutureCautionToast();
        }
    }, [currentYear, openFutureCautionToast]);

    const handleConfirm = useCallback(() => {
        const newDate = new Date(date);
        const actualMonth = monthRef.current - 1;
        // 보여지는 month - 1 해야 실제 month 로 setMonth 가능

        newDate.setFullYear(yearRef.current);
        newDate.setMonth(actualMonth);

        onConfirm(newDate);
    }, [date, onConfirm]);

    const handleLookUpRecent = useCallback(() => {
        const newDate = new Date();
        onConfirm(newDate);
    }, [onConfirm]);

    return (
        <BottomSheet closeBottomSheet={closeBottomSheet}>
            <View style={styles.main.container}>
                <View style={styles.main.titleWrapper}>
                    <CustomText style={commonStyles.subject}>{'조회 시기 설정'}</CustomText>
                    <PushAnimatedPressable
                        onPress={handleLookUpRecent}
                        style={styles.main.lookUpRecentBtn}
                    >
                        <CustomText style={styles.main.lookUpRecentBtnText}>최근글 조회</CustomText>
                        <VectorIcon name="refresh" size={15} />
                    </PushAnimatedPressable>
                </View>
                <View style={styles.main.selectorWrapper}>
                    <Selector
                        initialValue={yearRef.current}
                        maxValue={currentYear}
                        minValue={currentYear - 100}
                        unit="년"
                        minWidth={90}
                        onChange={handleChangeYear}
                        onMaxValueReached={onYearMaxReached}
                    />
                    <Selector
                        initialValue={monthRef.current}
                        maxValue={monthMax}
                        minValue={1}
                        unit="월"
                        minWidth={50}
                        onChange={handleChangeMonth}
                        onMaxValueReached={onMonthMaxReached}
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
    initialValue,
    maxValue,
    minValue,
    unit,
    minWidth,
    onChange,
    onMaxValueReached,
    onMinValueReached,
}: {
    initialValue: number;
    maxValue?: number;
    minValue?: number;
    unit: string;
    minWidth?: number;
    onChange: (value: number) => void;
    onMaxValueReached?: () => void;
    onMinValueReached?: () => void;
}) => {
    const timer = useRef<NodeJS.Timeout>();

    const [longPressed, setLongPressed] = useState<'increase' | 'decrease' | null>(null);
    const [value, setValue] = useState<number>(initialValue);

    const handleIncrease = useCallback(() => {
        const prev = value;
        if (maxValue && prev >= maxValue) {
            onMaxValueReached && onMaxValueReached();
            return;
        }

        setValue(prev + 1);
    }, [maxValue, onMaxValueReached, value]);

    const handleDecrease = useCallback(() => {
        const prev = value;
        if (minValue && prev <= minValue) {
            onMinValueReached && onMinValueReached();
            return;
        }

        setValue(prev - 1);
    }, [minValue, onMinValueReached, value]);

    useEffect(() => {
        if (longPressed !== null) {
            timer.current = setInterval(() => {
                longPressed === 'increase' ? handleIncrease() : handleDecrease();
            }, 50);
        } else {
            clearInterval(timer.current);
        }

        return () => clearInterval(timer.current);
    }, [handleDecrease, handleIncrease, longPressed]);

    useEffect(() => {
        if (maxValue && value > maxValue) {
            setValue(maxValue);
        }

        if (minValue && minValue > value) {
            setValue(minValue);
        }
    }, [maxValue, minValue, value]);

    useEffect(() => {
        onChange(value);
    }, [onChange, value]);

    const _onLongPress = useCallback((type: 'increase' | 'decrease') => {
        setLongPressed(type);
    }, []);
    const _onPressOut = useCallback(() => {
        setLongPressed(null);
    }, []);

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
                    onPress={handleIncrease}
                    onLongPress={() => _onLongPress('increase')}
                    onPressOut={_onPressOut}
                />
                <View style={[styles.selector.valueWarpper, { minWidth }]}>
                    <CustomText style={[styles.selector.value]}>{value}</CustomText>
                </View>
                <VectorIcon
                    style={styles.selector.button}
                    name="minus"
                    onPress={handleDecrease}
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
        titleWrapper: {
            flexDirection: 'row',
            justifyContent: 'space-between',
        },
        selectorWrapper: {
            flexDirection: 'row',
            justifyContent: 'center',
            gap: 10,
        },
        lookUpRecentBtn: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 5,
        },
        lookUpRecentBtnText: {
            fontWeight: 600,
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
