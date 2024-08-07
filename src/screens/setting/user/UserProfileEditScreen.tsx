import React, { useCallback, useState } from 'react';

import { StyleSheet, TouchableOpacity, View } from 'react-native';
import InnerNavigationBar from 'components/common/InnerNavigationBar';
import FullWidthButton from 'components/common/FullWidthButton';
import ProfilePicture from 'components/common/ProfilePicture';
import CustomTextInput from 'components/common/CustomTextInput';
import VectorIcon from 'components/common/VectorIcon';
import CustomText from 'components/common/CustomText';
import KeyboardDismissSafeAreaView from 'components/common/KeyboardDismissSafeAreaView';
import OptOutDialogModal from 'components/overlay/modal/OptOutDialogModal';
import OptOutCautionView from './OptOutCautionView';
import SelectImageSourceBottomSheet from 'components/overlay/bottomSheet/SelectImageSourceBottomSheet';
import CommonModal from 'components/overlay/modal/CommonModal';

import { UserProfileEditScreenNavigationProps } from 'types/navigations/settingStack';
import { Asset } from 'react-native-image-picker';

import { useNavigation } from '@react-navigation/native';
import useInput from 'hooks/useInput';
import useOverlay from 'hooks/useOverlay';
import useToast from 'hooks/useToast';
import useLoading from 'hooks/useLoading';
import useAuth from 'hooks/useAuth';
import useKeyboard from 'hooks/useKeyboard';

import { HORIZONTAL_GAP } from 'constants/style';
import { commonStyles } from 'styles';
import { updateUserData } from 'services/users';
import { useRecoilState } from 'recoil';
import { userDataAtom } from 'states/user';
import { UserDataType } from 'types/models/user';
import { APP_ENV_SUPABASE_URL } from '@env';
import { supabase } from 'services/supabase';

const UserProfileEditScreen = () => {
    const { goBack } = useNavigation<UserProfileEditScreenNavigationProps>();

    const { optOut } = useAuth();
    const { openToast } = useToast();
    const { dismiss: keyboardDismiss } = useKeyboard();
    const { setLoading } = useLoading();

    const [userData, setUserData] = useRecoilState(userDataAtom);

    const { id: userId, username: initialUsername, profile_img: initialProfileImg } = userData;

    const {
        value: username,
        handleChange: setUsername,
        clearValue: clearUsername,
    } = useInput(initialUsername);
    const [profileImg, setProfileImg] = useState<string>(initialProfileImg || '');

    const PROFILE_IMAGE_CHANGED = initialProfileImg !== profileImg;
    const USERNAME_CHANGED = initialUsername !== username;

    // overlays
    const { openOverlay: openPhotoBottomSheet, closeOverlay: closePhotoBottomSheet } = useOverlay(
        () => (
            // crop picker 사용 필요.
            <SelectImageSourceBottomSheet
                type="imageLibrary"
                closeBottomSheet={closePhotoBottomSheet}
                onChangeImages={handleChangeProfile}
            />
        )
    );

    const { openOverlay: openEditProfileModal, closeOverlay: closeEditProfileModal } = useOverlay(
        () => {
            let changed = '';

            if (USERNAME_CHANGED) changed = '닉네임을';
            if (PROFILE_IMAGE_CHANGED) changed = '프로필 이미지를';
            if (USERNAME_CHANGED && PROFILE_IMAGE_CHANGED) changed = '닉네임과 프로필 이미지를';

            const content = `${changed}\n수정하시겠어요?`;

            return (
                <CommonModal
                    title={'프로필 수정'}
                    text={content}
                    onPressBackdrop={closeEditProfileModal}
                    buttons={[
                        {
                            content: '네',
                            onPress: handleEditProfile,
                        },
                        {
                            content: '아니요',
                            onPress: closeEditProfileModal,
                            type: 'cancel',
                        },
                    ]}
                />
            );
        }
    );

    const { openOverlay: openOptOutModal, closeOverlay: closeOptOutModal } = useOverlay(() => (
        <OptOutDialogModal closeOverlay={closeOptOutModal} onConfirm={onConfirmOptOut} />
    ));

    const onPressProfilePic = () => {
        openPhotoBottomSheet();
    };

    const handleChangeProfile = (assets: Asset[]) => {
        const { uri } = assets[0];

        setProfileImg(uri!);
        closePhotoBottomSheet();
    };

    const onPressEditProfile = () => {
        keyboardDismiss();
        openEditProfileModal();
    };

    const handleEditProfile = async () => {
        try {
            setLoading(true);

            let changed: Partial<UserDataType> = {};

            if (username !== initialUsername) {
                changed.username = username;
            }
            if (profileImg !== initialProfileImg) {
                changed.profile_img = profileImg;
            }

            const updatedUserData = await updateUserData(userId, { ...changed });
            setUserData(updatedUserData);
            console.log(updatedUserData);

            // closeEditProfileModal();

            openToast({ text: '프로필 변경이 완료되었습니다!', type: 'complete' });
            // goBack();
        } catch (error) {
            openToast({ text: '오류가 발생했습니다.', type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    const checkProfileEdited = () => {
        if (PROFILE_IMAGE_CHANGED) return true;
        if (USERNAME_CHANGED) return true;

        return false;
    };

    const onConfirmOptOut = useCallback(async () => {
        try {
            setLoading(true);
            await optOut();

            closeOptOutModal();
        } catch (error: any) {
            console.log('opt out error : ', error.message);
        } finally {
            setLoading(false);
        }
    }, [closeOptOutModal, optOut, setLoading]);

    return (
        <KeyboardDismissSafeAreaView keyboardAvoiding={false}>
            <InnerNavigationBar screenTitle={'프로필 수정'} goBack={goBack} />

            <View style={styles.container}>
                <View style={styles.editContainer}>
                    <ProfilePicture style={styles.profile} uri={profileImg} />
                    <TouchableOpacity
                        style={styles.profileEditButtonContainer}
                        onPress={onPressProfilePic}
                    >
                        <CustomText>{'이미지 변경'}</CustomText>
                        <VectorIcon name={'image-multiple'} size={13} />
                    </TouchableOpacity>

                    <CustomTextInput
                        value={username}
                        onChangeText={setUsername}
                        clearButton
                        onPressClear={clearUsername}
                        title={'닉네임'}
                        placeholder={username}
                    />
                </View>

                <FullWidthButton
                    title={'수정하기'}
                    disabled={!checkProfileEdited()}
                    onPress={onPressEditProfile}
                />

                <OptOutCautionView onPressOptOut={openOptOutModal} />
            </View>
        </KeyboardDismissSafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: HORIZONTAL_GAP,
        paddingTop: 20,
    },
    editContainer: {
        marginBottom: 20,
    },
    profile: {
        alignSelf: 'center',
        marginBottom: 7,
    },
    profileEditButtonContainer: {
        flexDirection: 'row',
        marginBottom: 20,
        opacity: 0.5,
        gap: 3,
        ...commonStyles.centered,
    },
});

export default UserProfileEditScreen;
