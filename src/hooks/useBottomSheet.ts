import React, { useCallback } from 'react';

import { useSetRecoilState } from 'recoil';
import { bottomSheetAtom } from '../states/ui';

import { BottomSheetOptionsType, BottomSheetType } from 'types/models/bottomSheet';
import { delay } from 'utils/data';

/**
 *
 * 바텀시트 관리를 위한 훅
 * @returns openBottomSheet - 열고자 하는 컴포넌트를 전달받고, 엽니다.
 * @returns closeModal - 바텀시트를 닫습니다.
 *
 */

const useBottomSheet = () => {
    const setBottomSheetAtom = useSetRecoilState(bottomSheetAtom);

    const openBottomSheet = useCallback(
        (component: React.FC, options?: BottomSheetOptionsType) => {
            setBottomSheetAtom({ component, options: options || {}, visible: true });
        },
        [setBottomSheetAtom]
    );

    const closeBottomSheet = useCallback(async () => {
        setBottomSheetAtom(prev => ({ ...prev, visible: false } as BottomSheetType));
        await delay(300);
        // 컴포넌트 언마운트 시 해당 위치가 비어 어색한 부분 해결
        setBottomSheetAtom({ component: null, options: {}, visible: false });
    }, [setBottomSheetAtom]);
    return { openBottomSheet, closeBottomSheet };
};

export default useBottomSheet;
