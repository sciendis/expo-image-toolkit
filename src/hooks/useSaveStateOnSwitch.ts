import { DefaultDimensionState, EditorModes } from '../constants';
import {
  getCropData,
  isCropFrameChanged,
  isRotate90,
  rotateAndCropManipulator,
} from '../utils';
import { useImageEditorContext } from './useImageEditorContext';

/**
 * @description This hook returns the saveStateOnSwitch function, which saves the current state of the RotateEditor
 * when switching to another editor, only if the rotation value is ±90/±270. In such cases, it generates a new image.
 * For other rotation values (like ±180/±360), this function won’t run since the image dimensions stay the same.
 * It also checks if the CropFrame was modified. If changes are detected while switching editors, an alert will ask whether to keep the cropped area.
 * If the user selects “No,” nothing happens. If they confirm, a new image is generated using the current CropFrame.
 */
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
    saveHistoryState,
  } = useImageEditorContext();

  return async function saveStateOnSwitch(
    activeEditor: EditorModes,
    shouldCrop = false
  ) {
    if (activeEditor === EditorModes.ZOOM) return true;

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
      activeEditor,
    });

    try {
      const { uri } = await rotateAndCropManipulator({
        image,
        rotate,
        flipX,
        flipY,
        cropData,
      });

      saveHistoryState({ image, dimensions });
      setImage(uri);
      setPreviousRotate((prev) => (prev + rotateVal) % 360);
      setDimensions(DefaultDimensionState);
      rotate.set(0);
      flipX.set(0);
      flipY.set(0);
    } catch (error) {
      console.error('Error saving image:', error);
    }

    // reset zoom and image position
    zoom.set(1);
    imagePosition.set({ x: 0, y: 0 });

    return true;
  };
};
