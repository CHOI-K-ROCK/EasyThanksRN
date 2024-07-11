import { ReactElement } from 'react';
import { DimensionValue } from 'react-native';

export type BottomSheetType = {
    children: ReactElement;
    closeBottomSheet: () => void;

    closeButton?: boolean;
    closeByBackdrop?: boolean;
    rawElement?: boolean;
};
