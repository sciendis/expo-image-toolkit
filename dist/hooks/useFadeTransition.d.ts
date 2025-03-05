import { Animated } from 'react-native';
export declare const useFadeTransition: () => {
    opacity: Animated.Value;
    opacityReverse: Animated.Value;
    fadeOut: () => Promise<void>;
    fadeIn: (duration?: number) => Promise<void>;
};
//# sourceMappingURL=useFadeTransition.d.ts.map