import { useState } from 'react';
import { EditorModes } from '../constants';
import { useFadeTransition } from './useFadeTransition';
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

  const performSwitch = async (mode: EditorModes) => {
    setActiveEditor(mode);

    await fadeIn(100);

    setIsLoading(false);
  };

  const switchEditor = async (mode: EditorModes) => {
    if (mode === activeEditor) return;

    setIsLoading(true);
    await fadeOut();

    const needAlert = await saveStateOnSwitch(activeEditor);
    if (needAlert && activeEditor === EditorModes.CROP) {
      setPendingEditor(mode);
      setShowAlert(true);
      setIsLoading(false);
      return;
    }

    await performSwitch(mode);
  };

  const handleAlertResponse = async (shouldCrop: boolean) => {
    setShowAlert(false);

    if (!pendingEditor) return;
    setIsLoading(true);
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
