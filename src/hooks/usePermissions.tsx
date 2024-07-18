import React from 'react';
import { Platform } from 'react-native';
import { check, PERMISSIONS, PermissionStatus, request } from 'react-native-permissions';

const usePermissions = () => {
    const permissions = {
        camera: Platform.OS === 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA,
    };

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
