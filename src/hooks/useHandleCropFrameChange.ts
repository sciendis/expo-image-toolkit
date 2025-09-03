import { runOnJS } from 'react-native-reanimated';
import { isCropFrameChanged } from '../utils';
import { useImageEditorContext } from './useImageEditorContext';
import { Dispatch, SetStateAction } from 'react';
import { EditorModes } from '../constants';

type UseHandleCropFrameChangeProps = {
  setPendingEditor: Dispatch<SetStateAction<EditorModes | null>>;
  setShowAlert: Dispatch<SetStateAction<boolean>>;
};

export const useHandleCropFrameChange = function ({
  setPendingEditor,
  setShowAlert,
}: UseHandleCropFrameChangeProps) {
  const {
    boxPosition,
    boxScale,
    setDimensions,
    dimensions: { initialCropFramePosition, initialCropFrameScale },
  } = useImageEditorContext();

  return function handleCropFrameChange(mode: EditorModes) {
    const isChanged = isCropFrameChanged({
      boxPosition,
      boxScale,
      initialCropFramePosition,
      initialCropFrameScale,
    });

    if (isChanged) {
      const pos = boxPosition.get();
      const scale = boxScale.get();

      runOnJS(setDimensions)((prev) => ({
        ...prev,
        savedInitialCropFramePosition: pos,
        savedInitialCropFrameScale: scale,
      }));

      setPendingEditor(mode);
      setShowAlert(true);

      return true;
    }

    return false;
  };
};
