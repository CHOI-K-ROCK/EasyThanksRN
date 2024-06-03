import { FontWeightType } from "../components/common/CustomText";

/**
 * 안드로이드에서 fontWeight이 인식되지 않는 문제를 해결하기 위해,
 * 
 * fontWeight 을 fontFamily 로 변환하여 반환합니다.(font - Pretendard)
 * 
 * @param fontWeight 
 * @returns {string} fontFamily
 */
export const convertFontWeightToFontFamily = (fontWeight: FontWeightType) => {
    if (fontWeight == undefined) {
        return 'Pretendard-Regular';
    };

    switch (fontWeight) {
        case '100':
            return 'Pretendard-Thin';
        case '200':
            return 'Pretendard-ExtraLight';
        case '300':
            return 'Pretendard-Light';
        case 'normal':
        case '400':
            return 'Pretendard-Regular';
        case '500':
            return 'Pretendard-Medium';
        case '600':
            return 'Pretendard-SemiBold';
        case 'bold':
        case '700':
            return 'Pretendard-Bold';
        case '800':
            return 'Pretendard-ExtraBold';
    };
};