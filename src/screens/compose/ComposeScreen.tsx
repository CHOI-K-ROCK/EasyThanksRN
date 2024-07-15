import React, { useCallback, useMemo, useRef, useState } from 'react';

import { Platform, StyleSheet, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import InnerNavigationBar from 'components/common/InnerNavigationBar';
import CustomText from 'components/common/CustomText';
import PushAnimatedPressable from 'components/common/PushAnimatedPressable';
import CustomTextInput from 'components/common/CustomTextInput';
import KeyboardDismissSafeAreaView from 'components/common/KeyboardDismissSafeAreaView';
import HorizontalDivider from 'components/common/HorizontalDivider';
import FullWidthButton from 'components/common/FullWidthButton';
import ComposeSummaryView from 'components/compose/ComposeSummaryView';
import ComposePhotoButton from 'components/compose/ComposePhotoButton';
import CommonModal from 'components/overlay/modal/CommonModal';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DatePickerBottomSheet from 'components/overlay/bottomSheet/DatePickerBottomSheet';

import {
    ComposeScreenNavigationProps,
    ComposeScreenRouteProps,
} from 'types/navigations/composeStack';
import { PostDataType } from 'types/models/compose';

import useInput from 'hooks/useInput';
import useOverlay from 'hooks/useOverlay';
import useKeyboard from 'hooks/useKeyboard';
import { getInitialPostNameByDate } from 'utils/string';
import { isSameDate } from 'utils/date';

import { commonStyles } from 'styles';
import { HORIZONTAL_GAP } from 'constants/style';
import { SAMPLE_IMAGE } from 'constants/dummy';

const ComposeScreen = () => {
    const { goBack } = useNavigation<ComposeScreenNavigationProps>();
    const { params } = useRoute<ComposeScreenRouteProps>();

    const { dismiss: keyBoardDismiss } = useKeyboard();

    const initialData = params?.initialData as PostDataType;
    const IS_CREATE_POST = params?.initialData === undefined;

    const {
        content: initialContent,
        photos: initialPhotos,
        postId,
        title: initialTitle,
        createdAt: initialDate,
    } = initialData || {};

    const [photos, setPhotos] = useState<string[]>(initialPhotos || []); // 사진 blob & url
    const [date, setDate] = useState<Date>(
        initialDate ? new Date(initialDate) : new Date(new Date().getTime())
    ); // 작성 Date
    const originalDate = useRef<Date>(new Date());

    const {
        value: title,
        handleChange: setTitle,
        clearValue: clearTitle,
    } = useInput(initialTitle || '');
    const { value: content, handleChange: setContent } = useInput(initialContent || '');

    const defaultTitle = useMemo(() => getInitialPostNameByDate(date), [date]);

    const { openOverlay: openDismissModal, closeOverlay: closeDismissModal } = useOverlay(() => (
        <CommonModal
            title={'작성 취소'}
            text={'변경된 내용이 있어요!\n작성을 취소하시겠어요?'}
            onPressBackdrop={closeDismissModal}
            buttons={[
                { content: '네', onPress: handleCancelWhileCompose, type: 'cancel' },
                { content: '아니요', onPress: closeDismissModal },
            ]}
        />
    ));

    const { openOverlay: openEditDateBottomSheet, closeOverlay: closeEditDateBottomSheet } =
        useOverlay(() => (
            <DatePickerBottomSheet
                closeBottomSheet={closeEditDateBottomSheet}
                onConfirm={e => onChangeDate('date', e)}
                initialDate={date}
                type={'date'}
            />
        ));

    const { openOverlay: openEditTimeBottomSheet, closeOverlay: closeEditTimeBottomSheet } =
        useOverlay(() => (
            <DatePickerBottomSheet
                closeBottomSheet={closeEditTimeBottomSheet}
                onConfirm={e => onChangeDate('time', e)}
                initialDate={date}
                type={'time'}
            />
        ));

    //handler
    const checkPostEdited = () => {
        const IS_EDITED_ON_CREATE =
            title !== '' ||
            content !== '' ||
            !isSameDate(originalDate.current, date, { ignoreSeconds: true }) ||
            photos.length !== 0;

        const IS_EDITED_ON_EDIT =
            title !== initialTitle ||
            content !== initialContent ||
            !isSameDate(initialDate, date, { ignoreSeconds: true }) ||
            initialPhotos !== photos;

        // 글 작성
        if (IS_CREATE_POST && IS_EDITED_ON_CREATE) {
            return true;
        }

        // 글 수정
        if (!IS_CREATE_POST && IS_EDITED_ON_EDIT) {
            return true;
        }

        return false;
    };

    const onCancelCompose = () => {
        if (checkPostEdited()) {
            keyBoardDismiss();
            openDismissModal();
            return;
        }

        goBack();
    };

    const handleCancelWhileCompose = useCallback(() => {
        closeDismissModal();
        goBack();
    }, [closeDismissModal, goBack]);

    const onChangeDate = useCallback(
        (type: 'date' | 'time', newDate: Date) => {
            const tempDate = new Date(newDate);

            if (type === 'date') {
                tempDate.setDate(newDate.getDate());
                tempDate.setMonth(newDate.getMonth());

                setDate(tempDate);
                closeEditDateBottomSheet();
            }

            if (type === 'time') {
                tempDate.setHours(newDate.getHours());
                tempDate.setMinutes(newDate.getMinutes());

                setDate(tempDate);
                closeEditTimeBottomSheet();
            }
        },
        [closeEditDateBottomSheet, closeEditTimeBottomSheet]
    );

    const handleAddPhoto = () => {
        console.log('add Photo');
        setPhotos(prev => [...prev, SAMPLE_IMAGE]);
    };

    const handleDeletePhoto = () => {
        console.log('delete Photo');
        setPhotos([]);
    };

    const handleWritePost = () => {
        const postData = {
            title: title === '' || defaultTitle,
            content,
            image: photos,
            date,
        };
        console.log(postData, postId);
    };

    return (
        <KeyboardDismissSafeAreaView keyboardAvoiding={false}>
            <InnerNavigationBar
                screenTitle={IS_CREATE_POST ? '글 쓰기' : '글 수정하기'}
                rightComponent={
                    <PushAnimatedPressable onPress={onCancelCompose} style={styles.cancelButton}>
                        <CustomText style={styles.cancel}>취소</CustomText>
                    </PushAnimatedPressable>
                }
            />
            <KeyboardAwareScrollView
                extraHeight={Platform.OS === 'ios' ? 150 : undefined}
                style={styles.container}
            >
                <ComposeSummaryView
                    date={date}
                    onPressEditDate={openEditDateBottomSheet}
                    onPressEditTime={openEditTimeBottomSheet}
                    // onPressEditLocation={onPressEditLocation}
                    editable
                />
                <HorizontalDivider style={styles.divider} />
                <View style={styles.textFieldContainer} onStartShouldSetResponder={() => true}>
                    <CustomTextInput
                        value={title}
                        title={'제목을 작성해주세요! (선택)'}
                        placeholder={defaultTitle}
                        onChangeText={setTitle}
                        onPressClear={clearTitle}
                        clearButton
                    />

                    <CustomTextInput
                        value={content}
                        title={'오늘의 감사일기를 작성해보세요!'}
                        placeholder={'내용'}
                        onChangeText={setContent}
                        textStyle={styles.contentTextField}
                        multiline
                    />

                    <View>
                        <CustomText style={styles.addPhotoTitle}>
                            {'오늘 가장 기억에 남는 순간이 언제인가요? (선택)'}
                        </CustomText>
                        <View style={styles.photoContainer}>
                            {photos.map((photo, idx) => {
                                return (
                                    <ComposePhotoButton
                                        key={idx.toString()}
                                        imgBlob={photo}
                                        onPress={handleAddPhoto}
                                        onPressClose={handleDeletePhoto}
                                    />
                                );
                            })}
                            <ComposePhotoButton
                                onPress={handleAddPhoto}
                                onPressClose={handleDeletePhoto}
                            />
                        </View>
                    </View>
                    <View style={{ height: 50 }} />
                </View>
            </KeyboardAwareScrollView>

            <View style={styles.buttonContainer}>
                <FullWidthButton
                    title={IS_CREATE_POST ? '작성 완료' : '수정 완료'}
                    onPress={handleWritePost}
                />
            </View>
        </KeyboardDismissSafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        paddingHorizontal: HORIZONTAL_GAP,
    },
    divider: {
        marginVertical: 15,
    },
    addPhotoTitle: {
        ...commonStyles.subject,
    },
    textFieldContainer: { gap: 15 },
    contentTextField: {
        height: 250,
    },
    cancelButton: {
        paddingHorizontal: 10,
    },
    cancel: {
        fontSize: 15,
        fontWeight: 600,
    },
    photoContainer: {
        flexDirection: 'row',
        gap: 15,
    },
    buttonContainer: {
        paddingHorizontal: HORIZONTAL_GAP,
        marginBottom: 15,
    },
});

export default ComposeScreen;
