import { Animated } from 'react-native';
export declare const useFadeTransition: () => {
    opacity: Animated.Value;
    opacityReverse: Animated.Value;
    fadeOut: () => Promise<void>;
    fadeIn: (duration?: number) => Promise<void>;
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
//# sourceMappingURL=useFadeTransition.d.ts.map