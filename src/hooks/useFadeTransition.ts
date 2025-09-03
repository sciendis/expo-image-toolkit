import { useCallback, useRef } from 'react';
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
export const useFadeTransition = function () {
  const opacity = useRef(new Animated.Value(1)).current;

  const fadeOut = useCallback(
    (duration = 0) => {
      return new Promise<void>((resolve) => {
        Animated.timing(opacity, {
          toValue: 0,
          duration,
          useNativeDriver: true,
        }).start(() => resolve());
      });
    },
    [opacity]
  );

  const fadeIn = useCallback(
    (duration = 0) => {
      return new Promise<void>((resolve) => {
        Animated.timing(opacity, {
          toValue: 1,
          duration,
          useNativeDriver: true,
        }).start(() => resolve());
      });
    },
    [opacity]
  );

  return { opacity, fadeOut, fadeIn };
};
