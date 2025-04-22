import { useCallback, useRef } from 'react';
import { Animated } from 'react-native';
export const useFadeTransition = () => {
    const opacity = useRef(new Animated.Value(0)).current;
    const fadeOut = useCallback((duration = 0) => {
        return new Promise((resolve) => {
            Animated.timing(opacity, {
                toValue: 1,
                duration,
                useNativeDriver: true,
            }).start(() => resolve());
        });
    }, [opacity]);
    const fadeIn = useCallback((duration = 0) => {
        return new Promise((resolve) => {
            Animated.timing(opacity, {
                toValue: 0,
                duration,
                useNativeDriver: true,
            }).start(() => resolve());
        });
    }, [opacity]);
    return { opacity, fadeOut, fadeIn };
};
//# sourceMappingURL=useFadeTransition.js.map