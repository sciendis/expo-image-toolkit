import { useImageEditorContext } from '@/components/imageEditor/useImageEditorContext';
import {
  Action,
  FlipType,
  manipulateAsync,
  SaveFormat,
} from 'expo-image-manipulator';
import { useCallback } from 'react';

export const useSaveStateOnSwitchEditor = function () {
  const { rotate, zoom, image, setImage, setPreviousRotate, flipX, flipY } =
    useImageEditorContext();

  return useCallback(
    async () => {
      const actions: Action[] = [];
      const format = { format: SaveFormat.PNG };

      if (rotate.value !== 0 && rotate.value !== 360)
        actions.push({ rotate: rotate.value });

      if (flipX.value === 180) actions.push({ flip: FlipType.Vertical });
      if (flipY.value === 180) actions.push({ flip: FlipType.Horizontal });

      if (!actions.length) return false;

      try {
        const result = await manipulateAsync(image, actions, format);
        setImage(result.uri);
      } catch (error) {
        console.error('Error saving rotated image:', error);
      }

      // Reset rest values
      setPreviousRotate((prev) => (prev + rotate.value) % 360);
      rotate.value = 0;
      flipX.value = 0;
      flipY.value = 0;

      return true;
    },
    // Using all dependencies causes unexpected behavior.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [rotate.value, flipX.value, flipY.value, zoom.value]
  );
};
