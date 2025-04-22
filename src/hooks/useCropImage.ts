import { ImageEditorProps } from '../components/imageEditor';
import { getCropData, rotateAndCropManipulator } from '../utils';
import { useImageEditorContext } from './useImageEditorContext';

type Props = Pick<ImageEditorProps, 'onCrop'>;

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
  } = useImageEditorContext();

  const cropImage = async () => {
    setIsSaving(true);

    const cropData = getCropData({
      dimensions,
      boxScale,
      boxPosition,
      imagePosition,
      zoom,
      focalPoint,
    });

    try {
      const result = await rotateAndCropManipulator({
        image,
        rotate,
        flipX,
        flipY,
        cropData,
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

  return cropImage;
};
