import { EditorModes } from '../constants';
/**
 * Step 1: Switch to CROP editor useEffect after loading the image.
 * By default, the editor can be set without using useEffect. However, since
 * the loadingIndicator is needed, I used useEffect here.
 */
export declare const useSwitchEditor: () => {
    switchEditor: (mode: EditorModes) => Promise<void>;
    opacity: import("react-native").Animated.Value;
    opacityReverse: import("react-native").Animated.Value;
    isLoading: boolean;
    activeEditor: EditorModes | null;
    showAlert: boolean;
    handleAlertResponse: (shouldCrop: boolean) => Promise<void>;
};
//# sourceMappingURL=useSwitchEditor.d.ts.map