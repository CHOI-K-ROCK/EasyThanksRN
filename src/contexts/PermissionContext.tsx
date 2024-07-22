import React, { ReactNode, createContext, useRef } from 'react';

import { Platform } from 'react-native';
import CommonModal from 'components/overlay/modal/CommonModal';
import VectorIcon from 'components/common/VectorIcon';

import useOverlay from 'hooks/useOverlay';
import useCustomTheme from 'hooks/useCustomTheme';

import {
    PERMISSIONS,
    Permission,
    PermissionStatus,
    check,
    openSettings,
    request,
} from 'react-native-permissions';

type PermissionType = 'camera' | 'photoLibrary' | 'notification';

type PermissionContextType = {
    checkPermission: (type: PermissionType) => Promise<PermissionStatus>;
    requestPermission: (type: PermissionType) => Promise<PermissionStatus>;
};

const PermissionContext = createContext<PermissionContextType>({
    checkPermission: () => new Promise<PermissionStatus>(() => { }),
    requestPermission: () => new Promise<PermissionStatus>(() => { }),
});

const PermissionProvider = ({ children }: { children: ReactNode }) => {
    const { colors } = useCustomTheme();

    const IS_IOS = Platform.OS === 'ios';
    const IS_ANDROID = Platform.OS === 'android';
    const IS_AVOBE_ANDROID_SDK_33 = IS_ANDROID && Number(Platform.Version) >= 33;

    let requiredPermission = 'camera' as PermissionType;

    const { openOverlay: openPermissionModal, closeOverlay: closePermissionModal } = useOverlay(
        () => renderPermissionModal(requiredPermission, closePermissionModal)
    );

    const getPermission = (type: PermissionType) => {
        // 가독성을 위해 case 내부 if문 분리하여 사용
        switch (type) {
            case 'camera': {
                if (IS_IOS) {
                    return PERMISSIONS.IOS.CAMERA;
                }
                if (IS_ANDROID) {
                    return PERMISSIONS.ANDROID.CAMERA;
                }
                break;
            }
            case 'photoLibrary': {
                if (IS_IOS) {
                    return PERMISSIONS.IOS.PHOTO_LIBRARY;
                }
                if (IS_ANDROID) {
                    return IS_AVOBE_ANDROID_SDK_33
                        ? PERMISSIONS.ANDROID.READ_MEDIA_IMAGES
                        : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE;
                }
                break;
            }
        }
    };

    const checkPermission = (type: PermissionType) => {
        return new Promise<PermissionStatus>(async (resolve, reject) => {
            try {
                let permStatus: PermissionStatus = 'denied';

                const permission = getPermission(type) as Permission;
                permStatus = await check(permission);

                resolve(permStatus);
            } catch (error) {
                reject(error);
                console.log('permission check error', error);
            }
        });
    };

    const requestPermission = (type: PermissionType) => {
        return new Promise<PermissionStatus>(async (resolve, reject) => {
            try {
                const perm = await checkPermission(type);

                if (perm === 'blocked') {
                    requiredPermission = type;
                    // 상태로 관리 될 경우 비동기 업데이트로 인해 이전 값으로 참조됨.
                    openPermissionModal();
                    return;
                }
                const permission = getPermission(type) as Permission;
                const res = await request(permission);

                resolve(res);
            } catch (error) {
                console.log('requestPermission error : ', error);
                reject(error);
            }
        });
    };

    // ui

    const renderPermissionModal = (type: PermissionType, closeModal: () => void) => {
        const { title, message } = REQUEST_PERMISSION_CONTENT[type];
        const COMMON_MSG = '설정에서 직접 허용 해주세요.';

        const modalMsg = `${message}\n${COMMON_MSG}`;

        return (
            <CommonModal
                title={title}
                titleIcon={<VectorIcon name="alert" color={colors.caution} />}
                text={modalMsg}
                onPressBackdrop={closeModal}
                buttons={[
                    { content: '설정 바로가기', onPress: openSettings },
                    { content: '취소하기', type: 'cancel', onPress: closeModal },
                ]}
            />
        );
    };

    return (
        <PermissionContext.Provider value={{ checkPermission, requestPermission }}>
            {children}
        </PermissionContext.Provider>
    );
};

const REQUEST_PERMISSION_CONTENT: Record<PermissionType, { title: string; message: string }> = {
    camera: {
        title: '카메라 접근 권한 필요',
        message: '카메라에 대한 접근 권한이 없습니다.',
    },
    photoLibrary: {
        title: '사진 앨범 접근 권한 필요',
        message: '사진 앨범에 대한 접근 권한이 없습니다.',
    },
    notification: {
        title: '알림 권한 필요',
        message: '알림 전송에 대한 접근 권한이 없습니다.',
    },
};

export { PermissionContext, PermissionProvider };
