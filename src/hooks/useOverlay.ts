import { useSetRecoilState } from 'recoil';

import { overlaysAtom } from '../states/ui';

import useUuid from './useUuid';
import React, { useCallback } from 'react';

/**
 *
 * 오버레이 관리를 위한 훅
 * @params component - 열고자하는 오버레이 컴포넌트를 전달받습니다. 내부에 상태를 사용하는 오버레이의 경우 따로 컴포넌트로 분리하여 관리해야합니다. (OptOutDialogModal 참고)
 * @returns openModal - 전달받은 오버레이 컴포넌트를 오픈합니다.
 * @returns closeModal - 해당 오버레이를 닫습니다.
 * @returns clearModal - 모든 오버레이를 닫습니다.
 *
 */
const useOverlay = (component: React.FC) => {
    const updateOverlaysAtom = useSetRecoilState(overlaysAtom);
    const uuid = useUuid();
    const id = uuid();

    const openOverlay = useCallback(() => {
        updateOverlaysAtom(prev => [...prev, { id, component }]);
    }, [component, id, updateOverlaysAtom]);

    const closeOverlay = useCallback(() => {
        updateOverlaysAtom(prev => prev.filter(e => e.id !== id));
    }, [id, updateOverlaysAtom]);

    const clearOverlay = useCallback(() => {
        updateOverlaysAtom([]);
    }, [updateOverlaysAtom]);

    return { openOverlay, closeOverlay, clearOverlay };
};

export default useOverlay;
