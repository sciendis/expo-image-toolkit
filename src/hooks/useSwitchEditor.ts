import { useCallback, useRef, useState } from 'react';
import { useImageEditorContext } from '../components/imageEditor/useImageEditorContext';
import { EditorModes } from '../constants';
import { useSetInitialEditor } from '../utils';
import { useFadeTransition } from './useFadeTransition';
import { useSaveStateOnSwitch } from './useSaveStateOnSwitch';

/**
 * Step 1: Switch to CROP editor useEffect after loading the image.
 * By default, the editor can be set without using useEffect. However, since
 * the loadingIndicator is needed, I used useEffect here.
 */
export const useSwitchEditor = function () {
  const { setActiveEditor, activeEditor } = useImageEditorContext();
  const { saveStateOnSwitch } = useSaveStateOnSwitch();
  const { opacity, opacityReverse, fadeOut, fadeIn } = useFadeTransition();

  const [isLoading, setIsLoading] = useState(false);
  const [pendingEditor, setPendingEditor] = useState<EditorModes | null>(null); // Store the next editor
  const [showAlert, setShowAlert] = useState(false);

  const initRender = useRef(false);

  // continue the editor switch
  const performSwitch = useCallback(
    async (mode: EditorModes, needsTimeout?: boolean) => {
      if (activeEditor === null && initRender.current) return;
      initRender.current = true;

      if (activeEditor === null || needsTimeout) {
        await new Promise<void>((resolve) =>
          requestAnimationFrame(() => setTimeout(resolve, 200))
        );
      }
      setActiveEditor(mode);
      await fadeIn(1000);
      setIsLoading(false);
    },
    [activeEditor, setActiveEditor, fadeIn]
  );

  const switchEditor = useCallback(
    async (mode: EditorModes) => {
      if (mode === activeEditor) return;

      setIsLoading(true);
      await fadeOut();

      // Check if we need to save state and show an alert
      // pass boxPositin and boxScale rather than using from appContext to avoid re-rendering
      const { needsConfirmation, needsTimeout } =
        await saveStateOnSwitch(activeEditor);
      if (needsConfirmation && activeEditor === EditorModes.CROP) {
        // Pause switching and show alert
        setPendingEditor(mode); // Save the intended editor
        setShowAlert(true);
        setIsLoading(false); // Stop loading while alert is shown
        return;
      }

      // No alert needed
      await performSwitch(mode, needsTimeout);
    },
    [activeEditor, fadeOut, saveStateOnSwitch, performSwitch]
  );

  // alert confirmation
  const handleAlertResponse = useCallback(
    async (shouldCrop: boolean) => {
      setShowAlert(false);

      if (!pendingEditor) return;
      setIsLoading(true);
      await fadeOut();
      if (shouldCrop) {
        await saveStateOnSwitch(activeEditor, true); // should crop
      }
      await performSwitch(pendingEditor);
      setPendingEditor(null);
    },
    [pendingEditor, saveStateOnSwitch, activeEditor, performSwitch, fadeOut]
  );

  useSetInitialEditor(switchEditor);

  return {
    switchEditor,
    opacity,
    opacityReverse,
    isLoading,
    activeEditor,
    showAlert,
    handleAlertResponse,
  };
};
