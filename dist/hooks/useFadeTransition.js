import { useCallback, useRef } from 'react';
import { Animated } from 'react-native';
export const useFadeTransition = () => {
    const opacity = useRef(new Animated.Value(1)).current;
    const opacityReverse = useRef(new Animated.Value(0)).current;
    const fadeOut = useCallback(() => {
        return new Promise((resolve) => {
            Animated.timing(opacity, {
                toValue: 0,
                duration: 0,
                useNativeDriver: true,
            }).start(() => {
                Animated.timing(opacityReverse, {
                    toValue: 1,
                    duration: 0,
                    useNativeDriver: true,
                }).start(() => resolve());
            });
        });
    }, [opacity, opacityReverse]);
    const fadeIn = useCallback((duration = 200) => {
        return new Promise((resolve) => {
            Animated.timing(opacity, {
                toValue: 1,
                duration,
                useNativeDriver: true,
            }).start(() => {
                Animated.timing(opacityReverse, {
                    toValue: 0,
                    duration,
                    useNativeDriver: true,
                }).start(() => resolve());
            });
        });
    }, [opacity, opacityReverse]);
    return { opacity, opacityReverse, fadeOut, fadeIn };
};
/**

export const useFadeTransition = () => {
  const opacity = useSharedValue(1); // Use Reanimated shared value
  const opacityReverse = useSharedValue(0);

  const fadeOut = useCallback(() => {
    return new Promise<void>((resolve) => {
      opacity.set(withTiming(0, { duration: 0 }, () => {
        opacityReverse.set(withTiming(1, { duration: 0 }, () => resolve()));
      }));
    });
  }, [opacity, opacityReverse]);

  const fadeIn = useCallback(
    (duration = 200) => {
      return new Promise<void>((resolve) => {
        opacity.set(withTiming(1, { duration }, () => {
          opacityReverse.set(withTiming(0, { duration }, () => resolve()));
        }));
      });
    },
    [opacity, opacityReverse]
  );

  return { opacity, opacityReverse, fadeOut, fadeIn };
};

 */
//# sourceMappingURL=useFadeTransition.js.map