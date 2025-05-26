import { useAnimatedStyle } from 'react-native-reanimated';
import { useImageEditorContext } from '../useImageEditorContext';

/**
 * @description Provides two animated styles:
 * - `animatedStyleContainer`: Applies image rotation.
 * - `animatedStyleImage`: Applies zoom, pan (image position), focal zooming, and flip transformations.
 *
 * Handles correct positioning of the zoomed image relative to the focal point.
 * Rotation of ±180° inverts the coordinate axis, which is accounted for during transformation.
 */
export const useImageAnimatedTransform = function () {
  const {
    zoom,
    flipX,
    flipY,
    rotate,
    focalPoint,
    imagePosition,
    dimensions: { centerX, centerY },
  } = useImageEditorContext();

  const animatedStyleImage = useAnimatedStyle(() => {
    'worklet';

    const focalPointVal = focalPoint.get();
    const imagePositionVal = imagePosition.get();
    const focalOffsetX = focalPointVal.x - centerX;
    const focalOffsetY = focalPointVal.y - centerY;

    // when rotate is ±180, the Coordinate Axis is reverse
    const rotateVal = rotate.get();
    const focalTransformFactor = Math.abs(rotateVal) === 180 ? -1 : 1;

    return {
      transform: [
        { translateX: imagePositionVal.x * focalTransformFactor },
        { translateY: imagePositionVal.y * focalTransformFactor },

        { translateX: focalOffsetX * focalTransformFactor },
        { translateY: focalOffsetY * focalTransformFactor },

        { scale: zoom.get() },

        { translateX: -focalOffsetX * focalTransformFactor },
        { translateY: -focalOffsetY * focalTransformFactor },

        { rotateX: `${flipX.get()}deg` },
        { rotateY: `${flipY.get()}deg` },
      ],
    };
  });

  const animatedStyleContainer = useAnimatedStyle(() => {
    'worklet';

    return {
      transform: [{ rotate: `${rotate.get()}deg` }],
    };
  });

  return { animatedStyleContainer, animatedStyleImage };
};
