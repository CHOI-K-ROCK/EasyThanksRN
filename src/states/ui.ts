import { atom } from 'recoil';

// 레이아웃(모달, 바텀시트) 상태
export const overlaysAtom = atom<any[]>({ key: 'overlaysAtom', default: [] });

// 토스트 상태
export const toastsAtom = atom<any[]>({ key: 'toastsAtom', default: [] });

// 로딩 상태
export const isLoadingAtom = atom<boolean>({ key: 'isLoadingAtom', default: false });
