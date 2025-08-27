import { ImageEditorProps } from '../components/imageEditor';
import { DefaultCropFrameState, EditorModes } from '../constants';
import { getCropData, isRotate90, rotateAndCropManipulator } from '../utils';
import { useImageEditorContext } from './useImageEditorContext';

type Props = Pick<ImageEditorProps, 'onCrop'>;

/**
 * @description Returns the `cropImage` function, used when the `CropImageButton` is pressed.
 *
 * The function gathers the current editor state (zoom/crop/rotation), performs the crop and transformation,
 * and returns the final edited image via the `onCrop` callback.
 *
 * @param {() => void} onCrop - Callback called after cropping. If successful, it receives the result; if not, it's called with no arguments to close the editor.
 * @returns {() => Promise<void>} cropImage function
 */
export const useCropImage = function ({ onCrop }: Props) {
  const {
    image,
    boxPosition,
    boxScale,
    zoom,
    rotate,
    flipX,
    flipY,
    setIsSaving,
    focalPoint,
    imagePosition,
    dimensions,
    activeEditor,
    config: { quality, saveFormat },
  } = useImageEditorContext();

  return async function cropImage() {
    setIsSaving(true);

    const cropData = getCropData({
      dimensions,
      boxScale,
      boxPosition,
      imagePosition,
      zoom,
      focalPoint,
      activeEditor,
    });

    if (
      cropData.width < DefaultCropFrameState.minWidth ||
      cropData.height < DefaultCropFrameState.minHeight
    ) {
      setIsSaving(false);
      return;
    }

    try {
      const is90 = isRotate90(rotate.get());
      if (activeEditor === EditorModes.ROTATE && is90) {
        const originX = cropData.originX;
        const originY = cropData.originY;
        const width = cropData.width;
        const height = cropData.height;
        cropData.originX = originX;
        cropData.originY = originY;
        cropData.width = height;
        cropData.height = width;
      }

      const result = await rotateAndCropManipulator({
        image,
        rotate,
        flipX,
        flipY,
        cropData,
        quality,
        saveFormat,
      });

      onCrop({
        uri: result.uri,
        width: cropData.width,
        height: cropData.height,
        rotate: rotate.get(),
      });
    } catch (error) {
      console.error('Wrong Crop Data:', error);
      onCrop(); // Call onCrop without arguments to close the editor if something fails, to avoid confusion caused by the loading indicator.
    }
  };
};
