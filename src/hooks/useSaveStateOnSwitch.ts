import { ImageManipulator, SaveFormat } from 'expo-image-manipulator';
import { DefaultDimensionState, EditorModes } from '../constants';
import {
  getCropData,
  isCropFrameChanged,
  isRotate90,
  rotateAndCropManipulator,
} from '../utils';
import { useImageEditorContext } from './useImageEditorContext';

export const useSaveStateOnSwitch = function () {
  const {
    rotate,
    zoom,
    image,
    setImage,
    setPreviousRotate,
    flipX,
    flipY,
    imagePosition,
    focalPoint,
    boxPosition,
    boxScale,
    dimensions,
    setDimensions,
  } = useImageEditorContext();

  const saveStateOnSwitch = async (
    activeEditor: EditorModes,
    shouldCrop = false
  ) => {
    if (activeEditor === EditorModes.ZOOM) return true;

    const format = { format: SaveFormat.PNG };

    const rotateVal = rotate.get();

    if (activeEditor === EditorModes.ROTATE) {
      if (!isRotate90(rotateVal)) return true;

      try {
        const { uri, width, height } = await rotateAndCropManipulator({
          image,
          rotate,
          flipX,
          flipY,
        });

        setImage(uri);
        setPreviousRotate((prev) => (prev + rotateVal) % 360);
        setDimensions(DefaultDimensionState);
        rotate.set(0);
        flipX.set(0);
        flipY.set(0);
        boxScale.set({ x: width, y: height });
        return true;
      } catch (error) {
        console.error('Error rotating image:', error);
      }

      return true;
    }

    // activeEditor === Crop editor
    const isChanged = isCropFrameChanged({
      boxPosition,
      boxScale,
      dimensions,
    });

    const needsConfirmation = isChanged && !shouldCrop;

    if (needsConfirmation) {
      return setDimensions((prev) => ({
        ...prev,
        savedInitialCropFramePosition: boxPosition.get(),
        savedInitialCropFrameScale: boxScale.get(),
      }));
    }
    if (!shouldCrop) return true;

    const cropData = getCropData({
      dimensions,
      boxScale,
      boxPosition,
      imagePosition,
      zoom,
      focalPoint,
    });

    try {
      const manipulate = ImageManipulator.manipulate(image);
      const manipulator = manipulate.crop(cropData);
      const result = await manipulator.renderAsync();
      const { uri } = await result.saveAsync(format);

      setImage(uri);
      setDimensions(DefaultDimensionState);
    } catch (error) {
      console.error('Error saving image:', error);
    }

    // reset zoom and image position
    zoom.set(1);
    imagePosition.set({ x: 0, y: 0 });

    return true;
  };

  return { saveStateOnSwitch };
};
