import { useEffect, useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import Animated, { useSharedValue } from 'react-native-reanimated';
import { useMoveRotateRangeBar, useSetViewLayout } from '../../hooks';
import { useImageEditorContext } from '../imageEditor/useImageEditorContext';

const AnimatedText = Animated.createAnimatedComponent(TextInput);

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
    height: 1,
    position: 'absolute',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    bottom: 10,
    left: 0,
  },
  text: {
    position: 'absolute',
    bottom: 0,
    borderRadius: 100,
    overflow: 'hidden',
    width: 40,
    height: 40,
    textAlign: 'center',
  },
});
