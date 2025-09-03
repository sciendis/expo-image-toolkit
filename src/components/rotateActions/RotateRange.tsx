import { useEffect, useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import Animated, { useSharedValue } from 'react-native-reanimated';
import {
  useImageEditorContext,
  useMoveRotateRangeBar,
  useSetViewLayout,
} from '../../hooks';
import { FontSizes, Spacing } from '../../styles';

const AnimatedText = Animated.createAnimatedComponent(TextInput);

/**
 * @description This component and the `useMoveRotateRangeBar` hook were originally used to render a range bar
 * and let users rotate the image at any angle. Now, it only shows the current angle, since the range bar
 * is disabled for now due to the current cropFrame calculation and limitations of the older version of imageManipulator.
 *
 * I kept the original name because I want to bring back full-angle rotation later as a new feature. I think
 * it’ll be possible with the new version of imageManipulator after updating Expo to 52.
 *
 */
export const RotateRange = function () {
  const {
    config: { colors },
  } = useImageEditorContext();
  const colorStyles = {
    backgroundColor: colors.rotateAngleBg,
    color: colors.rotateAngleText,
  };

  const currentX = useSharedValue(0);

  const [rangeLayout, onRangeLayout] = useSetViewLayout();

  const { animatedTextProps, currentAngle } = useMoveRotateRangeBar({
    currentX,
    rangeLayout,
  });

  const [currentAngleValue, setCurrentAngleValue] = useState(0);
  useEffect(() => setCurrentAngleValue(currentAngle.get()), [currentAngle]);

  return (
    <View style={styles.container} onLayout={onRangeLayout}>
      <AnimatedText
        animatedProps={animatedTextProps}
        style={[styles.text, colorStyles]}
        value={`${currentAngleValue}°`}
        editable={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'absolute',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: '1%',
    left: 0,
    opacity: 0.8,
    pointerEvents: 'none',
  },
  text: {
    borderRadius: 100,
    overflow: 'hidden',
    width: Spacing.xl,
    height: Spacing.xl,
    fontSize: FontSizes.xs,
    textAlign: 'center',
  },
});
