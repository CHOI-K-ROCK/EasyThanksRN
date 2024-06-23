import { atom } from 'jotai';

// 모달 상태
export const modals = atom<any[]>([]);

// 토스트 상태
export const toasts = atom<any[]>([]);

// 로딩 상태
export const isLoading = atom<boolean>(false);