var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { useCallback, useRef, useState } from 'react';
import { EditorModes } from '../constants';
import { useSetInitialEditor } from '../utils';
import { useFadeTransition } from './useFadeTransition';
import { useImageEditorContext } from './useImageEditorContext';
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
    const [pendingEditor, setPendingEditor] = useState(null); // Store the next editor
    const [showAlert, setShowAlert] = useState(false);
    const initRender = useRef(false);
    // continue the editor switch
    const performSwitch = useCallback((mode, needsTimeout) => __awaiter(this, void 0, void 0, function* () {
        if (activeEditor === null && initRender.current)
            return;
        initRender.current = true;
        if (activeEditor === null || needsTimeout) {
            yield new Promise((resolve) => requestAnimationFrame(() => setTimeout(resolve, 200)));
        }
        setActiveEditor(mode);
        yield fadeIn(1000);
        setIsLoading(false);
    }), [activeEditor, setActiveEditor, fadeIn]);
    const switchEditor = useCallback((mode) => __awaiter(this, void 0, void 0, function* () {
        if (mode === activeEditor)
            return;
        setIsLoading(true);
        yield fadeOut();
        // Check if we need to save state and show an alert
        // pass boxPositin and boxScale rather than using from appContext to avoid re-rendering
        const { needsConfirmation, needsTimeout } = yield saveStateOnSwitch(activeEditor);
        if (needsConfirmation && activeEditor === EditorModes.CROP) {
            // Pause switching and show alert
            setPendingEditor(mode); // Save the intended editor
            setShowAlert(true);
            setIsLoading(false); // Stop loading while alert is shown
            return;
        }
        // No alert needed
        yield performSwitch(mode, needsTimeout);
    }), [activeEditor, fadeOut, saveStateOnSwitch, performSwitch]);
    // alert confirmation
    const handleAlertResponse = useCallback((shouldCrop) => __awaiter(this, void 0, void 0, function* () {
        setShowAlert(false);
        if (!pendingEditor)
            return;
        setIsLoading(true);
        yield fadeOut();
        if (shouldCrop) {
            yield saveStateOnSwitch(activeEditor, true); // should crop
        }
        yield performSwitch(pendingEditor);
        setPendingEditor(null);
    }), [pendingEditor, saveStateOnSwitch, activeEditor, performSwitch, fadeOut]);
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
//# sourceMappingURL=useSwitchEditor.js.map