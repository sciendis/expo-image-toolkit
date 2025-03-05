import { useCallback, useEffect, useState } from "react";
import { useImageEditorContext } from "../components/imageEditor/useImageEditorContext";
import { EditorModes } from "../constants";
import { useFadeTransition } from "./useFadeTransition";
import { useSaveStateOnSwitchEditor } from "./useSaveStateOnSwitchEditor";

/**
 * Step 1: Switch to CROP editor useEffect after loading the image.
 * By default, the editor can be set without using useEffect. However, since
 * the loadingIndicator is needed, I used useEffect here.
 */
export const useSwitchEditor = function () {
  const { image, setActiveEditor, activeEditor, config } =
    useImageEditorContext();
  const saveStateOnSwitchEditor = useSaveStateOnSwitchEditor();
  const { opacity, opacityReverse, fadeOut, fadeIn } = useFadeTransition();

  const [isLoading, setIsLoading] = useState(false);

  const switchEditor = useCallback(
    async (mode: EditorModes) => {
      if (mode === activeEditor) return;

      setIsLoading(true);
      await fadeOut();
      setActiveEditor(mode);

      const needTimeout = await saveStateOnSwitchEditor();
      if (needTimeout || activeEditor === null) {
        await new Promise<void>((resolve) =>
          requestAnimationFrame(() => setTimeout(resolve, 200))
        );
      }

      await fadeIn(1000);
      setIsLoading(false);
    },
    [activeEditor, fadeOut, setActiveEditor, saveStateOnSwitchEditor, fadeIn]
  );

  useEffect(() => {
    if (activeEditor !== null) return;
    switchEditor(EditorModes[config.defaultEditor]);
  }, [activeEditor, image, switchEditor]);

  return { switchEditor, opacity, opacityReverse, isLoading, activeEditor };
};
