import { removeImage, uploadImage } from 'services/files';

import { updateUserData } from 'services/users';
import { UserDataType } from 'types/models/user';

import { v4 } from 'uuid';

export const updateUser = async (
    id: string,
    userData: UserDataType,
    newUserData: Partial<UserDataType>
) => {
    try {
        const copiedNewUserData = { ...newUserData };

        if (newUserData.profile_img) {
            const uploadRes = await uploadImage(`profiles`, v4(), newUserData.profile_img);
            copiedNewUserData.profile_img = uploadRes.publicUrl;

            if (userData.profile_img) {
                const pathWithFolderName = userData.profile_img.split('/').slice(-2).join('/');
                await removeImage([pathWithFolderName]);
            }
        }

        const updatedUserData = updateUserData(id, newUserData);

        return updatedUserData;
    } catch (error) {
        console.log('update user error :', error);
    }
};
