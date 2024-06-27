import { atom } from 'jotai';

export const systemAtom = atom<{ isSigned: boolean }>({ isSigned: false });
// 임시로 시스템 상태라고 가정
