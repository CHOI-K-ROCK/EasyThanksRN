import React, { useEffect, useState } from 'react';

import { ScrollView, StyleSheet, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import InnerNavigationBar from '../../components/common/InnerNavigationBar';
import CustomText from '../../components/common/CustomText';
import PushAnimatedPressable from '../../components/common/PushAnimatedPressable';
import CustomTextInput from '../../components/common/CustomTextInput';
import WithKeyboardSafeAreaView from '../../components/common/WithKeyboardSafeAreaView';
import HorizontalDivider from '../../components/common/HorizontalDivider';
import VectorIcon from '../../components/common/VectorIcon';
import FullWidthButton from '../../components/common/FullWidthButton';

import {
    ComposeScreenNavigationProps,
    ComposeScreenRouteProps,
} from '../../@types/navigations/composeStack';

import useInput from '../../hooks/useInput';

import { HORIZONTAL_GAP } from '../../constant/style';
import { commonStyles } from '../../style';
import { getDateStrings } from '../../utils/date';
import useCustomTheme from '../../hooks/useCustomTheme';

const ComposeScreen = () => {
    const { value: content, handleChange: setContent } = useInput();
    const { colors } = useCustomTheme();

    const { goBack } = useNavigation<ComposeScreenNavigationProps>();
    const { params } = useRoute<ComposeScreenRouteProps>();

    const { year, month, day, hours, min, dayOfWeek } = getDateStrings(new Date(), false, true);

    const [photos, setPhotos] = useState<any[]>([]); // 사진 업로드
    console.log(photos);

    const initialData = params?.initialData;
    const isEdit = initialData !== undefined;

    const handleAddPhoto = () => {
        console.log('add Photo');
        setPhotos(p => [...p, 'temp']);
    };

    return (
        <WithKeyboardSafeAreaView>
            <InnerNavigationBar
                screenTitle={isEdit ? '글 수정하기' : '글 쓰기'}
                rightComponent={
                    <PushAnimatedPressable onPress={goBack} style={styles.cancelButton}>
                        <CustomText style={styles.cancel}>취소</CustomText>
                    </PushAnimatedPressable>
                }
            />
            <ScrollView style={styles.container} bounces={false}>
                <CustomText style={styles.date}>
                    {year}년 {month}월 {day}일
                </CustomText>
                <CustomText style={styles.dayOfWeek}>{dayOfWeek}요일</CustomText>

                <View style={styles.locationContainer}>
                    <VectorIcon name="map-marker" size={14} />
                    <CustomText style={styles.location}>{'인천광역시 길주로 654'}</CustomText>
                </View>

                <HorizontalDivider style={styles.divider} />

                <CustomText style={[commonStyles.subject, { marginBottom: 10, marginTop: 0 }]}>
                    좋았던 순간을 올려주세요! (최대 5장)
                </CustomText>

                <View style={{ marginBottom: 20, flexDirection: 'row', gap: 5 }}>
                    <PushAnimatedPressable
                        onPress={handleAddPhoto}
                        style={{
                            width: 70,
                            aspectRatio: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: colors.inputBackground,
                        }}
                    >
                        <VectorIcon name="camera" size={20} style={{ opacity: 0.6 }} />
                    </PushAnimatedPressable>

                    {photos.map(() => {
                        return (
                            <View
                                style={{
                                    width: 70,
                                    aspectRatio: 1,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: colors.inputBackground,
                                }}
                            >
                                <VectorIcon name="camera" size={20} style={{ opacity: 0.6 }} />
                            </View>
                        );
                    })}
                </View>

                <CustomTextInput
                    title="오늘의 감사일기를 작성해보세요!"
                    titleStyle={styles.textFieldTitle}
                    value={content}
                    onChangeText={setContent}
                    multiline
                    textStyle={styles.textField}
                    placeholder="내용"
                />
            </ScrollView>

            <View style={styles.buttonContainer}>
                <FullWidthButton title="작성 완료" />
            </View>
        </WithKeyboardSafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        paddingHorizontal: HORIZONTAL_GAP,
    },
    date: {
        fontSize: 20,
        fontWeight: 600,
        marginBottom: 4,
    },
    dayOfWeek: {
        fontSize: 18,
        fontWeight: 600,
        opacity: 0.7,
        marginBottom: 10,
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    location: {
        opacity: 0.7,
    },
    divider: {
        marginVertical: 15,
    },
    textFieldTitle: {
        marginBottom: 10,
    },
    textField: {
        height: 250,
    },
    cancelButton: {
        paddingHorizontal: 10,
    },
    cancel: {
        fontSize: 15,
        fontWeight: 600,
    },
    buttonContainer: {
        paddingHorizontal: HORIZONTAL_GAP,
        marginBottom: 15,
    },
});

export default ComposeScreen;
