import { FlipType, ImageManipulator, SaveFormat } from 'expo-image-manipulator';
import { ImageEditorProps } from '../components/imageEditor/ImageEditor';
import { useImageEditorContext } from '../components/imageEditor/useImageEditorContext';
import { getCropData } from '../utils';

type Props = Pick<ImageEditorProps, 'onCrop'>;

export const useCropImage = function ({ onCrop }: Props) {
  const {
    imageLayout,
    containerLayout,
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
    exactImageDimensions,
  } = useImageEditorContext();

  const cropImage = async () => {
    if (imageLayout.width <= 0 || imageLayout.height <= 0) return;

    setIsSaving(true);

    const format = { format: SaveFormat.PNG };

    const cropData = await getCropData({
      image,
      imageLayout,
      containerLayout,
      exactImageDimensions,
      boxScale,
      boxPosition,
      imagePosition,
      zoom,
      focalPoint,
    });

    try {
      const rotateVal = rotate.get();

      const manipulate = ImageManipulator.manipulate(image);
      let manipulator = manipulate.rotate(rotateVal);
      if (flipX.get() === 180)
        manipulator = manipulator.flip(FlipType.Vertical);
      if (flipY.get() === 180)
        manipulator = manipulator.flip(FlipType.Horizontal);

      manipulator = manipulator.crop(cropData);
      const result = await manipulator.renderAsync();
      const res = await result.saveAsync(format);

      onCrop({
        uri: res.uri,
        width: cropData.width,
        height: cropData.height,
        rotate: rotateVal,
      });
    } catch (error) {
      console.error('Wrong Crop Data:', error);
    }
  };

  return cropImage;
};
