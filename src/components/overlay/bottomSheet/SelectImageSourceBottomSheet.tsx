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
    const { openToast } = useToast();

    const {
        type = 'both',

        closeBottomSheet,

        onChangeImages,
        onCancel,

        selectionLimit = 1,

        launchCameraOptions,
        launchImageLibraryOptions,
    } = props;

    const cameraOptions = {
        mediaType: 'photo',
        presentationStyle: 'currentContext',
        quality: 0.7,
        ...launchCameraOptions,
    };

    const imageLibraryOptions = {
        mediaType: 'photo',
        presentationStyle: 'popover',
        selectionLimit: selectionLimit,
        quality: 0.7,
        ...launchImageLibraryOptions,
    };

    // handler

    const handleLaunch = (launchType: 'camera' | 'library') => {
        const IS_LAUNCH_CAMERA = launchType === 'camera';
        const launchMethod = IS_LAUNCH_CAMERA ? launchCamera : launchImageLibrary;

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
