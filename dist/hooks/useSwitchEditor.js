var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    const { image, setActiveEditor, activeEditor, config } = useImageEditorContext();
    const saveStateOnSwitchEditor = useSaveStateOnSwitchEditor();
    const { opacity, opacityReverse, fadeOut, fadeIn } = useFadeTransition();
    const [isLoading, setIsLoading] = useState(false);
    const switchEditor = useCallback((mode) => __awaiter(this, void 0, void 0, function* () {
        if (mode === activeEditor)
            return;
        setIsLoading(true);
        yield fadeOut();
        setActiveEditor(mode);
        const needTimeout = yield saveStateOnSwitchEditor();
        if (needTimeout || activeEditor === null) {
            yield new Promise((resolve) => requestAnimationFrame(() => setTimeout(resolve, 200)));
        }
        yield fadeIn(1000);
        setIsLoading(false);
    }), [activeEditor, fadeOut, setActiveEditor, saveStateOnSwitchEditor, fadeIn]);
    useEffect(() => {
        if (activeEditor !== null)
            return;
        switchEditor(EditorModes[config.defaultEditor]);
    }, [activeEditor, image, switchEditor]);
    return { switchEditor, opacity, opacityReverse, isLoading, activeEditor };
};
//# sourceMappingURL=useSwitchEditor.js.map