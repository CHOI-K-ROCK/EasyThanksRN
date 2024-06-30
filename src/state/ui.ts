import { atom } from 'recoil';

// 모달 상태
export const modalsAtom = atom<any[]>({ key: 'modalsAtom', default: [] });

// 토스트 상태
export const toastsAtom = atom<any[]>({ key: 'toastsAtom', default: [] });

// 로딩 상태
export const isLoadingAtom = atom<boolean>({ key: 'isLoadingAtom', default: false });
