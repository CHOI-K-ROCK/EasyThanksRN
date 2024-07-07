export type BottomSheetType = {
    component: React.FC | null;
    options: BottomSheetOptionsType;
    visible: boolean;
};

export type BottomSheetOptionsType = {
    rawElement?: boolean;
};
