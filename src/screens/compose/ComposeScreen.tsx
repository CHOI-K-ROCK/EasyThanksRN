import React, { LegacyRef, RefObject, useEffect, useRef, useState } from 'react';

import {
    NativeScrollEvent,
    NativeSyntheticEvent,
    ScrollView,
    StyleSheet,
    View,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import InnerNavigationBar from '../../components/common/InnerNavigationBar';
import CustomText from '../../components/common/CustomText';
import PushAnimatedPressable from '../../components/common/PushAnimatedPressable';
import CustomTextInput from '../../components/common/CustomTextInput';
import WithKeyboardSafeAreaView from '../../components/common/WithKeyboardSafeAreaView';
import HorizontalDivider from '../../components/common/HorizontalDivider';
import FullWidthButton from '../../components/common/FullWidthButton';
import ComposeSummaryView from '../../components/compose/ComposeSummaryView';
import ComposePhotoButton from '../../components/compose/ComposePhotoButton';

import {
    ComposeScreenNavigationProps,
    ComposeScreenRouteProps,
} from '../../@types/navigations/composeStack';

import useInput from '../../hooks/useInput';
import useCustomTheme from '../../hooks/useCustomTheme';

import { commonStyles } from '../../style';

import { HORIZONTAL_GAP } from '../../constant/style';
import { SAMPLE_IMAGE } from '../../constant/dummy';

const ComposeScreen = () => {
    const { navigate, goBack } = useNavigation<ComposeScreenNavigationProps>();
    const { params } = useRoute<ComposeScreenRouteProps>();

    const { value: content, handleChange: setContent } = useInput();

    const [photos, setPhotos] = useState<string | undefined>(undefined); // 사진 blob
    // const [photos, setPhotos] = useState<any[]>([]); // 사진 blob

    const initialData = params?.initialData;
    const isEdit = initialData !== undefined;

    const onPressEditDate = () => {
        console.log('edit date');
    };

    const onPressEditTime = () => {
        console.log('time edit');
    };

    const onPressEditLocation = () => {
        navigate('EditLocationScreen');
    };

    const locationString = '인천광역시 길주로 654';

    const handleAddPhoto = () => {
        console.log('add Photo');
        setPhotos(p => SAMPLE_IMAGE);
    };

    const handleDeletePhoto = () => {
        console.log('delete Photo');
        setPhotos(p => undefined);
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
                <View onStartShouldSetResponder={() => true}>
                    <ComposeSummaryView
                        date={new Date()}
                        onPressEditDate={onPressEditDate}
                        onPressEditTime={onPressEditTime}
                        locationString={locationString}
                        onPressEditLocation={onPressEditLocation}
                    />

                    <HorizontalDivider style={styles.divider} />

                    <CustomText style={[commonStyles.subject, { marginBottom: 10, marginTop: 0 }]}>
                        오늘 가장 감사했던 순간은 언제인가요?
                    </CustomText>

                    <ComposePhotoButton
                        imgBlob={photos}
                        onPress={handleAddPhoto}
                        onPressClose={handleDeletePhoto}
                        style={{ marginBottom: 20 }}
                    />

                    <CustomTextInput
                        title="오늘의 감사일기를 작성해보세요!"
                        titleStyle={styles.textFieldTitle}
                        value={content}
                        onChangeText={setContent}
                        multiline
                        textStyle={styles.textField}
                        placeholder="내용"
                    />
                    <View style={{ height: 50 }} />
                </View>
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
        // flex: 1,
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
