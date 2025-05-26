import { Animated } from 'react-native';
/**
 * @description Provides fade-in/out animations used when switching between editor modes.
 *
 * - `fadeOut`: Fades opacity from 0 to 1.
 * - `fadeIn`: Fades opacity from 1 to 0.
 * - `opacity`: Animated value used in components to control visibility of the loading screen.
 *
 * @returns { opacity, fadeOut, fadeIn }
 */
export declare const useFadeTransition: () => {
    opacity: Animated.Value;
    fadeOut: (duration?: number) => Promise<void>;
    fadeIn: (duration?: number) => Promise<void>;
};
//# sourceMappingURL=useFadeTransition.d.ts.map