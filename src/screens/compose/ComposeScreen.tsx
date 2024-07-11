import React, { useCallback, useState } from 'react';

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
import CommonModal from 'components/modal/common/CommonModal';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import {
    ComposeScreenNavigationProps,
    ComposeScreenRouteProps,
} from 'types/navigations/composeStack';

import useInput from 'hooks/useInput';
import useOverlay from 'hooks/useOverlay';
import useKeyboard from 'hooks/useKeyboard';

import { getInitialPostNameByDate } from 'utils/date';

import { commonStyles } from 'styles';
import { HORIZONTAL_GAP } from 'constants/style';
import { SAMPLE_IMAGE } from 'constants/dummy';
import { PostDataType } from 'types/models/compose';
import Animated, { CurvedTransition, LinearTransition } from 'react-native-reanimated';

const ComposeScreen = () => {
    const { navigate, goBack } = useNavigation<ComposeScreenNavigationProps>();
    const { params } = useRoute<ComposeScreenRouteProps>();
    const { dismiss } = useKeyboard();

    const initialData = (params?.initialData || {}) as PostDataType;
    const IS_CREATE_POST = params?.initialData === undefined;

    const {
        content: initialContent,
        photos: initialPhotos,
        postId,
        title: initialTitle,
        createdAt: initialDate,
    } = initialData;

    const [photos, setPhotos] = useState<string[]>(initialPhotos || []); // 사진 blob
    // 첫 업로드 단계에서는 blob / base64 으로
    // 이미 업로드 된 수정단계에서는 string 으로 불러오는 것으로
    const [date, setDate] = useState<Date>(initialDate ? new Date(initialDate) : new Date()); // 작성 Date

    const {
        value: title,
        handleChange: setTitle,
        clearValue: clearTitle,
    } = useInput(initialTitle || getInitialPostNameByDate(date));
    const { value: content, handleChange: setContent } = useInput(initialContent);

    const { openOverlay, closeOverlay } = useOverlay(() => (
        <CommonModal
            text={'변경된 내용이 있어요!\n작성을 취소하시겠어요?'}
            // title="작성 취소"
            buttons={[
                { content: '네', onPress: handleCancelWhileCompose, type: 'cancel' },
                { content: '아니요', onPress: closeOverlay },
            ]}
        />
    ));

    const handleCancel = () => {
        if (content) {
            //글 뿐 아니라 날짜, 시간 등 수동으로 변경한 내용이 있는 경우 isWrote 로 관리하기
            dismiss();
            openOverlay();
            return;
        }

        goBack();
    };

    const handleCancelWhileCompose = useCallback(() => {
        closeOverlay();
        goBack();
    }, [closeOverlay, goBack]);

    const onPressEditDate = () => {
        console.log('edit date');
    };

    const onPressEditTime = () => {
        console.log('time edit');
    };

    const onPressEditLocation = () => {
        navigate('EditLocationScreen');
    };

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
                    <PushAnimatedPressable onPress={handleCancel} style={styles.cancelButton}>
                        <CustomText style={styles.cancel}>취소</CustomText>
                    </PushAnimatedPressable>
                }
            />
            <KeyboardAwareScrollView
                extraHeight={(Platform.OS === 'ios' && 150) || undefined}
                style={styles.container}
            >
                <ComposeSummaryView
                    date={date}
                    onPressEditDate={onPressEditDate}
                    onPressEditTime={onPressEditTime}
                    onPressEditLocation={onPressEditLocation}
                    editable
                />
                <HorizontalDivider style={styles.divider} />
                <View style={styles.textFieldContainer} onStartShouldSetResponder={() => true}>
                    <CustomTextInput
                        title="제목을 작성해주세요!"
                        titleStyle={styles.textFieldTitle}
                        value={title}
                        onChangeText={setTitle}
                        clearButton
                        onPressClear={clearTitle}
                        textStyle={styles.titleTextField}
                        placeholder="제목"
                    />

                    <CustomTextInput
                        title="오늘의 감사일기를 작성해보세요!"
                        titleStyle={styles.textFieldTitle}
                        value={content}
                        onChangeText={setContent}
                        multiline
                        textStyle={styles.contentTextField}
                        placeholder="내용"
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
                        </View>
                        <Animated.View layout={CurvedTransition}>
                            <FullWidthButton title="사진 추가" onPress={handleAddPhoto} />
                        </Animated.View>
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
        // flex: 1,
    },
    divider: {
        marginVertical: 15,
    },
    addPhotoTitle: {
        ...commonStyles.subject,
        marginBottom: 10,
    },
    textFieldContainer: { gap: 10 },
    textFieldTitle: {
        marginBottom: 10,
    },
    titleTextField: {},
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
        marginBottom: 10,
    },
    buttonContainer: {
        paddingHorizontal: HORIZONTAL_GAP,
        marginBottom: 15,
    },
});

export default ComposeScreen;
