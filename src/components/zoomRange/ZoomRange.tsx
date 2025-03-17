import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import {
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, { useSharedValue } from 'react-native-reanimated';
import {
  useMoveZoomRangeBar,
  useSetInitialZoomAnimatedText,
  useSetViewLayout,
} from '../../hooks';
import { useImageEditorContext } from '../imageEditor/useImageEditorContext';

const AnimatedText = Animated.createAnimatedComponent(TextInput);

export const ZoomRange = function () {
  const {
    config: { colors },
  } = useImageEditorContext();

  const currentX = useSharedValue(1);

  const [rangeLayout, onRangeLayout] = useSetViewLayout();

  const { moveRangeBar, animatedTextProps, styledRangeAnimated } =
    useMoveZoomRangeBar({ currentX, rangeLayout });

  const initialZoomValue = useSetInitialZoomAnimatedText();

  return (
    <View
      style={[styles.container, { backgroundColor: colors.zoomRangebarBg }]}
      onLayout={onRangeLayout}
    >
      <GestureHandlerRootView>
        <GestureDetector gesture={moveRangeBar}>
          <Animated.View
            style={[
              styles.pointer,
              { backgroundColor: colors.zoomRangebarDot },
              styledRangeAnimated,
            ]}
          >
            <AnimatedText
              animatedProps={animatedTextProps}
              style={[
                styles.text,
                { backgroundColor: colors.zoomTextBg, color: colors.zoomText },
              ]}
              value={`${initialZoomValue.toFixed(2)}x`}
              editable={false}
            />
          </Animated.View>
        </GestureDetector>
      </GestureHandlerRootView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: 20,
    position: 'absolute',
    bottom: '5%',
    left: '5%',
    zIndex: 500,
    borderRadius: 20,
  },
  pointer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: 20,
    height: 20,
    borderRadius: 50,
    zIndex: 50,
  },
  text: {
    position: 'absolute',
    bottom: 25,
    left: -30 + 10, // -25 because of text box width: 50 / 2. 10 is because of the pointer width: 20 / 2
    borderRadius: 100,
    overflow: 'hidden',
    padding: 0,
    width: 50,
    aspectRatio: 1,
    textAlign: 'center',
  },
});
