import { atom } from 'recoil';

export const systemAtom = atom<{ isSigned: boolean }>({
    key: 'systemAtom',
    default: { isSigned: false },
});
