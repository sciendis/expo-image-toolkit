import { ImageEditorProps } from '@/components/imageEditor/ImageEditor';
import { useImageEditorContext } from '@/components/imageEditor/useImageEditorContext';
import { calculateImageOffset } from '@/utils';
import {
  Action,
  ActionCrop,
  FlipType,
  manipulateAsync,
  SaveFormat,
} from 'expo-image-manipulator';

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

    const { scaleX, scaleY } = await calculateImageOffset({
      image,
      imageLayout,
    });

    const croppedWidth = boxScale.value.x * scaleX;
    const croppedHeight = boxScale.value.y * scaleY;

    // calculate the center of the image
    const imageCenterX = exactImageDimensions.width / 2;
    const imageCenterY = exactImageDimensions.height / 2;

    // calculate the offset from the center caused by zooming on a focal point
    const focalOffsetX =
      ((imageCenterX - focalPoint.value.x) * (zoom.value - 1)) / zoom.value;
    const focalOffsetY =
      ((imageCenterY - focalPoint.value.y) * (zoom.value - 1)) / zoom.value;

    // calculate position covered image by cropFrame
    const relativeScaleX = imageCenterX * (1 - 1 / zoom.value);
    const relativeScaleY = imageCenterY * (1 - 1 / zoom.value);
    const relativeOffsetX =
      boxPosition.value.x - containerLayout.x - imagePosition.value.x;
    const relativeOffsetY =
      boxPosition.value.y - containerLayout.y - imagePosition.value.y;

    const relativeX =
      relativeOffsetX / zoom.value - focalOffsetX + relativeScaleX;
    const relativeY =
      relativeOffsetY / zoom.value - focalOffsetY + relativeScaleY;

    const cropData: ActionCrop['crop'] = {
      originX: relativeX * scaleX,
      originY: relativeY * scaleY,
      width: croppedWidth / zoom.value,
      height: croppedHeight / zoom.value,
    };

    actions.push({ crop: cropData });
    if (rotate.value !== 0) actions.push({ rotate: rotate.value });
    if (flipX.value === 180) actions.push({ flip: FlipType.Vertical });
    if (flipY.value === 180) actions.push({ flip: FlipType.Horizontal });

    try {
      const result = await manipulateAsync(image, actions, format);

      onCrop({
        uri: result.uri,
        width: croppedWidth,
        height: croppedHeight,
        rotate: rotate.value,
      });
    } catch (error) {
      console.error('Wrong Crop Data:', error);
    }
  };

  return cropImage;
};
