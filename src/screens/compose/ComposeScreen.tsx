import React, { useEffect, useState } from 'react';

import { Platform, ScrollView, StyleSheet, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import InnerNavigationBar from '../../components/common/InnerNavigationBar';
import CustomText from '../../components/common/CustomText';
import PushAnimatedPressable from '../../components/common/PushAnimatedPressable';
import CustomTextInput from '../../components/common/CustomTextInput';
import WithKeyboardSafeAreaView from '../../components/common/WithKeyboardSafeAreaView';

import {
    ComposeScreenNavigationProps,
    ComposeScreenRouteProps,
} from '../../@types/navigations/composeStack';

import useInput from '../../hooks/useInput';

import { HORIZONTAL_GAP } from '../../constant/style';
import FullWidthButton from '../../components/common/FullWidthButton';

const ComposeScreen = () => {
    const { goBack } = useNavigation<ComposeScreenNavigationProps>();
    const { params } = useRoute<ComposeScreenRouteProps>();

    const { value: content, handleChange: setContent } = useInput();

    const [] = useState();

    const initialData = params?.initialData;
    const isEdit = initialData !== undefined;

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
            <ScrollView style={styles.container}>
                <CustomTextInput
                    title="내용"
                    value={content}
                    onChangeText={setContent}
                    multiline
                    textStyle={{
                        height: 250,
                    }}
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
        paddingTop: 10,
        paddingHorizontal: HORIZONTAL_GAP,
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
    },
});

export default ComposeScreen;
