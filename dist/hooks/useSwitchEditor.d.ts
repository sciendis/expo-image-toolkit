import { EditorModes } from '../constants';
/**
 * @description Handles all necessary actions when switching editors — like generating a new image or detecting CropFrame changes to show the related alert.
 * @returns the opacity, activeEditor, showAlert for handling loadingScreen or showing the CropFrame warning alert.
 */
export declare const useSwitchEditor: () => {
    switchEditor: (mode: EditorModes) => Promise<void>;
    opacity: import("react-native").Animated.Value;
    activeEditor: EditorModes;
    showAlert: boolean;
    handleAlertResponse: (shouldCrop: boolean) => Promise<void>;
};
//# sourceMappingURL=useSwitchEditor.d.ts.map