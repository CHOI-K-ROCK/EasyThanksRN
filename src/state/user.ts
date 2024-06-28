import { atom } from 'jotai';
import { SsoProviderType, UserDataType } from '../@types/models/user';

export const userDataAtom = atom<UserDataType | null>(null);
export const userSsoProviderAtom = atom<SsoProviderType>(get => get(userDataAtom)!.ssoProvider);
