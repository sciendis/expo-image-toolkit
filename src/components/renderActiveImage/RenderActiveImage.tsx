import React from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { EditorModes } from '../../constants';
import { useImageEditorContext } from '../../hooks';
import {
  useImageAnimatedOverflow,
  useImageAnimatedTransform,
} from '../../hooks/animatedStyles';
import { CropFrame } from '../cropFrame';

type Props = {
  activeEditor: EditorModes;
};

/**
 * @description Renders the currently edited image and displays applied transformations
 * such as (zoom/crop/rotate).
 *
 * It also manages container overflow visibility depending on the zoom level:
 * - Overflow is hidden when zoom > 1 to avoid showing out-of-bound content.
 * - Overflow is visible when zoom === 1. This is essential for rotated images
 *   (±90°/±270°), where width and height are swapped. In such cases, zoom is reset
 *   to 1 to correctly recalculate dimensions and preserve accurate focal zooming.
 *
 * @param {EditorModes} activeEditor - The current active editor mode (Zoom/Crop/Rotate).
 */
export const RenderActiveImage = function ({ activeEditor }: Props) {
  const {
    image,
    imageRef,
    rotate,
    dimensions: { displayedImageWidth, displayedImageHeight, rotateScale },
  } = useImageEditorContext();

  const { animatedStyleContainer, animatedStyleImage } =
    useImageAnimatedTransform();

  const animatedOverflowStyle = useImageAnimatedOverflow(activeEditor);

  const animatedStyleRotateScale = useAnimatedStyle(() => {
    'worklet';

    return { transform: [{ scale: withTiming(1 / rotateScale) }] };
  }, [rotate, rotateScale]);

  return (
    <Animated.View
      style={[
        styles.container,
        !!displayedImageWidth &&
          !!displayedImageHeight && {
            width: displayedImageWidth,
            height: displayedImageHeight,
          },
        animatedOverflowStyle,
        animatedStyleRotateScale,
      ]}
    >
      <Animated.View ref={imageRef} style={styles.imageContainer}>
        {activeEditor === EditorModes.CROP && <CropFrame />}
        <Animated.View
          style={[styles.imageMovingContainer, animatedStyleContainer]}
        >
          <Animated.Image
            style={[styles.image, animatedStyleImage]}
            source={{ uri: image }}
          />
        </Animated.View>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 0,
    width: '100%',
    height: '100%',
    maxHeight: '70%',
    position: 'relative',
  },
  imageContainer: {
    width: '100%',
    height: '100%',
  },
  imageMovingContainer: {
    width: '100%',
    height: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});
