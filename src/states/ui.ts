import { atom } from 'recoil';
import { BottomSheetType } from 'types/models/bottomSheet';

// 모달 상태
export const modalsAtom = atom<any[]>({ key: 'modalsAtom', default: [] });

// 토스트 상태
export const toastsAtom = atom<any[]>({ key: 'toastsAtom', default: [] });

// 바텀시트 상태
export const bottomSheetAtom = atom<BottomSheetType>({
    key: 'bottomSheetAtom',
    default: { component: null, options: {}, visible: false },
});

// 로딩 상태
export const isLoadingAtom = atom<boolean>({ key: 'isLoadingAtom', default: false });
