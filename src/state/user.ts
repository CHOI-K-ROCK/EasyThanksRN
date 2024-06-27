import { atom } from 'jotai';
import { UserDataType } from '../@types/models/user';

export const userDataAtom = atom<any | null>(null);
