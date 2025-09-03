import { useEffect, useRef } from 'react';
import { useSafeAreaFrame } from 'react-native-safe-area-context';
import { useImageEditorContext } from './useImageEditorContext';
import { DefaultDimensionState } from '../constants';

export const useUpdateDeviceOrientation = function () {
  const { setDimensions, clearUndoRedoStack } = useImageEditorContext();

  const frame = useSafeAreaFrame();

  const screenWidth = frame.width;
  const screenHeight = frame.height;
  const isLandscapeMode = screenHeight < screenWidth;

  const prevOrientation = useRef(isLandscapeMode);
  const didRotate = useRef(false);

  useEffect(() => {
    if (prevOrientation.current === isLandscapeMode) {
      didRotate.current = false;
      return;
    }
    // reset dimensions when device orientation changes.
    clearUndoRedoStack();
    setDimensions(DefaultDimensionState);

    didRotate.current = true;
    prevOrientation.current = isLandscapeMode;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screenWidth, screenHeight, setDimensions]);

  return {
    isLandscapeMode,
    screenWidth,
    screenHeight,
    isDeviceRotated: didRotate.current,
  };
};
