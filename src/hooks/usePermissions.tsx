import React from 'react';
import { Platform } from 'react-native';
import { check, PERMISSIONS, PermissionStatus, request } from 'react-native-permissions';

const usePermissions = () => {
    const permissions = {
        camera: Platform.OS === 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA,
    };

    // blocked 나 이미 유저가 권한을 설정한 경우 다시 요청을 할 수 ㅇ

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
