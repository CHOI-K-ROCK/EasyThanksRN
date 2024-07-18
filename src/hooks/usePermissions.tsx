import React from 'react';

import { Platform } from 'react-native';
import { check, PERMISSIONS, PermissionStatus, request } from 'react-native-permissions';

const usePermissions = () => {
    const IS_IOS = Platform.OS === 'ios';

    const permissions = {
        camera: IS_IOS ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA,
        imageLibrary: IS_IOS
            ? PERMISSIONS.IOS.PHOTO_LIBRARY
            : PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
    };
    // todo 위처럼 퍼미션즈로만 해결하려 하지 말기.
    // todo swtich 문으로 android 의 경우 외장 스토리지에서 이미지를 가져올 수도 있으므로 exrernal 권한도 활성화해야함.

    // blocked 나 이미 유저가 권한을 설정한 경우 다시 요청을 할 수 없음
    // 컨텍스트로 구성하거나, bottomsheet 를 구성하여 수동으로 권한설정을 할 수 있게끔
    // 시트를 표시하는 방식으로 진행해야 할 듯.
    // permission provider / type 받고 그에 맞는 메시지 및 openSetting 제공.
    //

    const checkPermission = (type: keyof typeof permissions) => {
        return new Promise<PermissionStatus>(async (resolve, reject) => {
            try {
                const perm = permissions[type];
                const res = await check(perm);

                resolve(res);
            } catch (error) {
                reject(error);
                console.log('permission check error', error);
            }
        });
    };

    const requestPermission = (type: keyof typeof permissions) => {
        return new Promise<PermissionStatus>(async (resolve, reject) => {
            // todo 여기서 모달창 열어줘야함.
            // todo 단순 hook 으로 처리하면 안되니, Provider 로 별도 구성 필요
            try {
                const perm = permissions[type];
                const res = await request(PERMISSIONS.IOS.PHOTO_LIBRARY);
                console.log();

                resolve(res);
            } catch (error) {
                reject(error);
                console.log('permission request error', error);
            }
        });
    };

    return { checkPermission, requestPermission };
};

export default usePermissions;
