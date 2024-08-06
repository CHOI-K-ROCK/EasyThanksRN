import { atom } from 'recoil';
import { SsoProviderType, UserDataType } from '../@types/models/user';

const defaultUserData = {
    id: '',
    email: '',

    username: '',
    profile_img: '',

    sso_provider: 'kakao' as SsoProviderType,

    created_at: '',
    updated_at: '',
};

export const userDataAtom = atom<UserDataType>({ key: 'userDataAtom', default: defaultUserData });
