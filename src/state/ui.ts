import { atom } from 'jotai';

// 모달 상태
export const modalsAtom = atom<any[]>([]);

// 토스트 상태
export const toastsAtom = atom<any[]>([]);

// 로딩 상태
export const isLoadingAtom = atom<boolean>(false);
