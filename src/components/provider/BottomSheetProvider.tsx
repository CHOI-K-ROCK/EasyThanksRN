import BottomSheet from 'components/modal/common/BottomSheet';
import useBottomSheet from 'hooks/useBottomSheet';

import React from 'react';
import { useRecoilValue } from 'recoil';
import { bottomSheetAtom } from 'states/ui';

const BottomSheetProvider = () => {
    const bottomSheetState = useRecoilValue(bottomSheetAtom);
    const { closeBottomSheet } = useBottomSheet();

    const { component, visible, options } = bottomSheetState;

    return (
        <BottomSheet visible={visible} onPressBackdrop={closeBottomSheet} {...options}>
            {component ? <Component component={component} /> : <></>}
        </BottomSheet>
    );
};

const Component = ({ component, ...rest }: { component: React.FC }) => {
    return component({ ...rest });
};

export default BottomSheetProvider;
