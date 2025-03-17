import {
  Action,
  FlipType,
  manipulateAsync,
  SaveFormat,
} from 'expo-image-manipulator';
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

    const actions: Action[] = [];
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

    actions.push({ crop: cropData });

    const rotateVal = rotate.get();

    if (rotateVal !== 0) actions.push({ rotate: rotateVal });
    if (flipX.get() === 180) actions.push({ flip: FlipType.Vertical });
    if (flipY.get() === 180) actions.push({ flip: FlipType.Horizontal });

    try {
      const result = await manipulateAsync(image, actions, format);

      onCrop({
        uri: result.uri,
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
