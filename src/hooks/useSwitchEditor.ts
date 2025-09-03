import { useState } from 'react';
import { EditorModes } from '../constants';
import { useFadeTransition } from './useFadeTransition';
import { useHandleCropFrameChange } from './useHandleCropFrameChange';
import { useImageEditorContext } from './useImageEditorContext';
import { useSaveStateOnSwitch } from './useSaveStateOnSwitch';

/**
 * @description Handles all necessary actions when switching editors — like generating a new image or detecting CropFrame changes to show the related alert.
 * @returns the opacity, activeEditor, showAlert for handling loadingScreen or showing the CropFrame warning alert.
 */
export const useSwitchEditor = function () {
  const { setActiveEditor, activeEditor, setIsLoading } =
    useImageEditorContext();
  const saveStateOnSwitch = useSaveStateOnSwitch();
  const { opacity, fadeOut, fadeIn } = useFadeTransition();

  const [pendingEditor, setPendingEditor] = useState<EditorModes | null>(null);
  const [showAlert, setShowAlert] = useState(false);

  const handleCropFrameChange = useHandleCropFrameChange({
    setPendingEditor,
    setShowAlert,
  });

  const performSwitch = async (mode: EditorModes) => {
    setActiveEditor(mode);
    await fadeIn();
    setIsLoading('none');
  };

  const switchEditor = async (mode: EditorModes) => {
    if (mode === activeEditor) return;

    if (activeEditor === EditorModes.CROP) {
      const isChanged = handleCropFrameChange(mode);
      if (isChanged) return;
    }

    setIsLoading('contents');
    await fadeOut();

    const needAlert = await saveStateOnSwitch(activeEditor);
    if (needAlert && activeEditor === EditorModes.CROP) {
      setPendingEditor(mode);
      setShowAlert(true);
      await fadeIn();
      setIsLoading('none');
      return;
    }

    await performSwitch(mode);
  };

  const handleAlertResponse = async (shouldCrop: boolean) => {
    setShowAlert(false);

    if (!pendingEditor) return;
    setIsLoading('contents');
    await fadeOut();
    await saveStateOnSwitch(activeEditor, shouldCrop);
    await performSwitch(pendingEditor);
    setPendingEditor(null);
  };

  return {
    switchEditor,
    opacity,
    activeEditor,
    showAlert,
    handleAlertResponse,
  };
};
