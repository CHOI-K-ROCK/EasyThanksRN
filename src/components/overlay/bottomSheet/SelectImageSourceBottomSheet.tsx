import React from 'react';

import BottomSheet from './BottomSheet';
import BottomSheetMenuList from './BottomSheetMenuList';

import {
    Asset,
    CameraOptions,
    ImageLibraryOptions,
    launchCamera,
    launchImageLibrary,
} from 'react-native-image-picker';

import useToast from 'hooks/useToast';
import useOverlay from 'hooks/useOverlay';
import CommonModal from '../modal/CommonModal';
import { openSettings } from 'react-native-permissions';
import usePermissions from 'hooks/usePermissions';

type Props = {
    type?: 'both' | 'camera' | 'imageLibrary';

    closeBottomSheet: () => void;

    onChangeImages: (Assets: Asset[]) => void;
    onCancel?: () => void;

    selectionLimit?: number;

    launchCameraOptions?: CameraOptions;
    launchImageLibraryOptions?: ImageLibraryOptions;
};

const SelectImageSourceBottomSheet = (props: Props) => {
    const { checkPermission } = usePermissions();

    const { openOverlay: openCameraPermissionModal, closeOverlay: closeCameraPermissionModal } =
        useOverlay(() => renderPermissionModal('camera', closeCameraPermissionModal));
    const { openOverlay: openLibraryPermissionModal, closeOverlay: closeLibraryPermissionModal } =
        useOverlay(() => renderPermissionModal('library', closeLibraryPermissionModal));

    const renderPermissionModal = (type: 'camera' | 'library', closeModal: () => void) => {
        // todo 해당 로직을 usePermission 에서 checkPermission 으로 분리 하는 것 고려

        const CAMERA_PERMISSON_TITLE = '카메라 접근 권한 필요';
        const LIBLARY_PERMISSON_TITLE = '사진 앨범 접근 권한 필요';

        const CAMERA_PERMISSON_MSG = '카메라에 대한 접근 권한이 없습니다.';
        const LIBLARY_PERMISSON_MSG = '사진 앨범에 대한 접근 권한이 없습니다.';

        const COMMON_MSG = '설정에서 직접 허용 해주세요.';

        const permissionTitle =
            type === 'camera' ? CAMERA_PERMISSON_TITLE : LIBLARY_PERMISSON_TITLE;

        const permissionMsg = type === 'camera' ? CAMERA_PERMISSON_MSG : LIBLARY_PERMISSON_MSG;
        const modalMsg = `${permissionMsg}\n${COMMON_MSG}`;

        return (
            <CommonModal
                title={permissionTitle}
                text={modalMsg}
                onPressBackdrop={closeModal}
                buttons={[
                    { content: '설정 바로가기', onPress: openSettings },
                    { content: '취소하기', type: 'cancel', onPress: closeModal },
                ]}
            />
        );
    };

    const {
        type = 'both',

        closeBottomSheet,

        onChangeImages,
        onCancel,

        selectionLimit = 1,

        launchCameraOptions,
        launchImageLibraryOptions,
    } = props;

    const cameraOptions: CameraOptions = {
        mediaType: 'photo',
        presentationStyle: 'currentContext',
        quality: 0.7,

        ...launchCameraOptions,
    };

    const imageLibraryOptions: ImageLibraryOptions = {
        mediaType: 'photo',
        presentationStyle: 'popover',
        selectionLimit: selectionLimit,
        quality: 0.7,

        ...launchImageLibraryOptions,
    };

    // handler

    const handleLaunch = async (launchType: 'camera' | 'library') => {
        const IS_LAUNCH_CAMERA = launchType === 'camera';
        const launchMethod = IS_LAUNCH_CAMERA ? launchCamera : launchImageLibrary;

        let perm = '';
        // check permission
        if (IS_LAUNCH_CAMERA) {
            perm = await checkPermission('camera');
        } else {
            perm = await checkPermission('imageLibrary');
        }

        if (perm === 'granted') {
            if (IS_LAUNCH_CAMERA) {
                openCameraPermissionModal();
            } else {
                openLibraryPermissionModal();
            }

            return;
        }

        const options = (IS_LAUNCH_CAMERA ? cameraOptions : imageLibraryOptions) as
            | CameraOptions
            | ImageLibraryOptions;

        launchMethod(options, res => {
            const { assets, errorCode, didCancel } = res;
            if (errorCode) {
                console.log(errorCode);
                return;
            }
            if (didCancel) {
                onCancel && onCancel();
            }
            if (!assets) return;
            onChangeImages(assets);
        });
    };

    const menuData = [
        {
            title: '사진찍기',
            onPress: () => handleLaunch('camera'),
            iconName: 'camera',
        },
        {
            title: '앨범에서 업로드하기',
            onPress: () => handleLaunch('library'),
            iconName: 'image-multiple',
        },
    ];

    const menuDataForEachType = {
        camera: [menuData[0]],
        imageLibrary: [menuData[1]],
        both: menuData,
    };

    return (
        <BottomSheet closeBottomSheet={closeBottomSheet}>
            <BottomSheetMenuList data={menuDataForEachType[type]} />
        </BottomSheet>
    );
};

export default SelectImageSourceBottomSheet;
