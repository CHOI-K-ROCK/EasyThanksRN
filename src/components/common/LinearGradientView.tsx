import React from 'react';
import LinearGradient, { LinearGradientProps } from 'react-native-linear-gradient';

type Props = LinearGradientProps & {
    gradientDirection?: GradientDirectionType;
};

type GradientDirectionType = 'ltr' | 'rtl' | 'btt' | 'ttb';

const LinearGradientView = (props: Props) => {
    const { children, gradientDirection = 'btt', ...restProps } = props;

    const directionOption = {
        ltr: 90,
        rtl: 270,
        btt: 0, // 라이브러리 기본값
        ttb: 180,
    };

    const angle = directionOption[gradientDirection];

    return (
        <LinearGradient useAngle={true} angle={angle} {...restProps}>
            {children}
        </LinearGradient>
    );
};

export default LinearGradientView;
