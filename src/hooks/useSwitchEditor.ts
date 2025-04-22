import { useState } from 'react';
import { EditorModes } from '../constants';
import { useFadeTransition } from './useFadeTransition';
import { useImageEditorContext } from './useImageEditorContext';
import { useSaveStateOnSwitch } from './useSaveStateOnSwitch';

export const useSwitchEditor = function () {
  const { setActiveEditor, activeEditor } = useImageEditorContext();
  const { saveStateOnSwitch } = useSaveStateOnSwitch();
  const { opacity, fadeOut, fadeIn } = useFadeTransition();

  const [isLoading, setIsLoading] = useState(false);
  const [pendingEditor, setPendingEditor] = useState<EditorModes | null>(null);
  const [showAlert, setShowAlert] = useState(false);

  const performSwitch = async (mode: EditorModes) => {
    setActiveEditor(mode);
    await fadeIn(300);
    setIsLoading(false);
  };

  const switchEditor = async (mode: EditorModes) => {
    if (mode === activeEditor) return;

    setIsLoading(true);
    await fadeOut(300);

    const notNeedAlert = await saveStateOnSwitch(activeEditor);
    if (!notNeedAlert && activeEditor === EditorModes.CROP) {
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
    isLoading,
    activeEditor,
    showAlert,
    handleAlertResponse,
  };
};
