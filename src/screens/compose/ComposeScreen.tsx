import React, { useCallback, useState } from 'react';

import { Platform, StyleSheet, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import InnerNavigationBar from '../../components/common/InnerNavigationBar';
import CustomText from '../../components/common/CustomText';
import PushAnimatedPressable from '../../components/common/PushAnimatedPressable';
import CustomTextInput from '../../components/common/CustomTextInput';
import KeyboardDismissSafeAreaView from '../../components/common/KeyboardDismissSafeAreaView';
import HorizontalDivider from '../../components/common/HorizontalDivider';
import FullWidthButton from '../../components/common/FullWidthButton';
import ComposeSummaryView from '../../components/compose/ComposeSummaryView';
import ComposePhotoButton from '../../components/compose/ComposePhotoButton';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import {
    ComposeScreenNavigationProps,
    ComposeScreenRouteProps,
} from '../../@types/navigations/composeStack';

import useInput from '../../hooks/useInput';

import { commonStyles } from '../../style';
import { HORIZONTAL_GAP } from '../../constant/style';
import { SAMPLE_IMAGE } from '../../constant/dummy';
import useModal from '../../hooks/useModal';
import CommonModal from '../../components/modal/common/CommonModal';
import useKeyboard from '../../hooks/useKeyboard';

const ComposeScreen = () => {
    const { navigate, goBack } = useNavigation<ComposeScreenNavigationProps>();
    const { params } = useRoute<ComposeScreenRouteProps>();

    const isEdit = params?.initialData !== undefined;
    const initialData = params?.initialData || {};

    const { initialImage, initialDate, content: initialContent } = initialData;

    const { value: content, handleChange: setContent } = useInput(initialContent);
    const [photos, setPhotos] = useState<string | undefined>(initialImage || undefined); // 사진 blob
    const [date, setDate] = useState<Date>(initialDate || new Date()); // 작성 Date

    const { dismiss } = useKeyboard();

    const { openModal, closeModal } = useModal(() => (
        <CommonModal
            text={'변경된 내용이 있어요!\n작성을 취소하시겠어요?'}
            buttons={[
                { content: '네', onPress: handleCancelWhileCompose, type: 'cancel' },
                { content: '아니요', onPress: closeModal },
            ]}
        />
    ));

    const handleCancel = () => {
        if (content) {
            //글 뿐 아니라 날짜, 시간 등 수동으로 변경한 내용이 있는 경우 isWrote 로 관리하기
            dismiss();
            openModal();
            return;
        }

        goBack();
    };

    const handleCancelWhileCompose = useCallback(() => {
        closeModal();
        goBack();
    }, [closeModal, goBack]);

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

    const handleWritePost = () => {
        const postData = {
            content,
            image: photos,
            date,
        };
        console.log(postData);
    };

    return (
        <KeyboardDismissSafeAreaView keyboardAvoiding={false}>
            <InnerNavigationBar
                screenTitle={isEdit ? '글 수정하기' : '글 쓰기'}
                rightComponent={
                    <PushAnimatedPressable onPress={handleCancel} style={styles.cancelButton}>
                        <CustomText style={styles.cancel}>취소</CustomText>
                    </PushAnimatedPressable>
                }
            />
            <KeyboardAwareScrollView
                extraHeight={(Platform.OS === 'ios' && 150) || undefined}
                style={styles.container}
            >
                <View onStartShouldSetResponder={() => true}>
                    <ComposeSummaryView
                        date={date}
                        onPressEditDate={onPressEditDate}
                        onPressEditTime={onPressEditTime}
                        locationString={locationString}
                        onPressEditLocation={onPressEditLocation}
                    />

                    <HorizontalDivider style={styles.divider} />

                    <CustomText style={styles.addPhotoTitle}>
                        {'오늘 가장 기억에 남는 순간이 언제인가요? (선택)'}
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
            </KeyboardAwareScrollView>

            <View style={styles.buttonContainer}>
                <FullWidthButton title="작성 완료" onPress={handleWritePost} />
            </View>
        </KeyboardDismissSafeAreaView>
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
    addPhotoTitle: {
        ...commonStyles.subject,
        marginBottom: 10,
        marginTop: 0,
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
