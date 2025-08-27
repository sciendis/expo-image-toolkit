var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    const { setActiveEditor, activeEditor, setIsLoading } = useImageEditorContext();
    const saveStateOnSwitch = useSaveStateOnSwitch();
    const { opacity, fadeOut, fadeIn } = useFadeTransition();
    const [pendingEditor, setPendingEditor] = useState(null);
    const [showAlert, setShowAlert] = useState(false);
    const performSwitch = (mode) => __awaiter(this, void 0, void 0, function* () {
        setActiveEditor(mode);
        yield fadeIn(100);
        setIsLoading(false);
    });
    const switchEditor = (mode) => __awaiter(this, void 0, void 0, function* () {
        if (mode === activeEditor)
            return;
        setIsLoading(true);
        yield fadeOut();
        const needAlert = yield saveStateOnSwitch(activeEditor);
        if (needAlert && activeEditor === EditorModes.CROP) {
            setPendingEditor(mode);
            setShowAlert(true);
            setIsLoading(false);
            return;
        }
        yield performSwitch(mode);
    });
    const handleAlertResponse = (shouldCrop) => __awaiter(this, void 0, void 0, function* () {
        setShowAlert(false);
        if (!pendingEditor)
            return;
        setIsLoading(true);
        yield fadeOut();
        yield saveStateOnSwitch(activeEditor, shouldCrop);
        yield performSwitch(pendingEditor);
        setPendingEditor(null);
    });
    return {
        switchEditor,
        opacity,
        activeEditor,
        showAlert,
        handleAlertResponse,
    };
};
//# sourceMappingURL=useSwitchEditor.js.map