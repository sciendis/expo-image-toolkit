import { EditorModes } from '@/constants';
import { useGetActiveImageStyles, useUpdateImageDimensions } from '@/hooks';
import { setLayoutDimensions } from '@/utils';
import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { useImageEditorContext } from '../imageEditor/useImageEditorContext';

type Props = {
  activeEditor: EditorModes | null;
};

export const RenderActiveImage = function ({ activeEditor }: Props) {
  const {
    image,
    imageRef,
    setContainerLayout,
    zoom,
    flipX,
    flipY,
    rotate,
    focalPoint,
    imagePosition,
    setExactImageDimensions,
  } = useImageEditorContext();
  const onContainerLayout = setLayoutDimensions(setContainerLayout);

  const imageDimensions = useUpdateImageDimensions();

  const { top, left, centerX, centerY, exactImageDimensions } =
    useGetActiveImageStyles(imageDimensions);

  const isOverflowVisible = useSharedValue(true);

  useEffect(() => {
    if (!exactImageDimensions) return;
    setExactImageDimensions(exactImageDimensions);
  }, [exactImageDimensions, setExactImageDimensions]);

  useAnimatedReaction(
    () => zoom.value,
    (currentZoom) => {
      isOverflowVisible.value =
        currentZoom === 1 && activeEditor === EditorModes.ROTATE;
    },
    [activeEditor]
  );

  const animatedTransform = useAnimatedStyle(() => {
    const focalOffsetX = focalPoint.value.x - centerX;
    const focalOffsetY = focalPoint.value.y - centerY;

    return {
      transform: [
        { translateX: imagePosition.value.x },
        { translateY: imagePosition.value.y },

        { translateX: focalOffsetX },
        { translateY: focalOffsetY },

        { scale: zoom.value },

        { translateX: -focalOffsetX },
        { translateY: -focalOffsetY },

        { rotateX: `${flipX.value}deg` },
        { rotateY: `${flipY.value}deg` },
        { rotate: `${rotate.value}deg` },
      ],
    };
  });

  const animatedOverflowStyle = useAnimatedStyle(() => ({
    overflow: isOverflowVisible.value ? 'visible' : 'hidden',
  }));

  return (
    <Animated.View
      style={[
        styles.container,
        { top, left },
        exactImageDimensions,
        animatedOverflowStyle,
      ]}
      onLayout={onContainerLayout}
    >
      <Animated.View ref={imageRef} style={styles.imageContainer}>
        <Animated.View style={styles.imageMovingContainer}>
          <Animated.Image
            style={[styles.image, animatedTransform]}
            source={{ uri: image }}
          />
        </Animated.View>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: -1,
    width: '100%',
    height: '100%',
    maxHeight: '70%',
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
