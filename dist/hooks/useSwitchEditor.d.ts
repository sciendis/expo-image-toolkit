import { EditorModes } from '../constants';
export declare const useSwitchEditor: () => {
    switchEditor: (mode: EditorModes) => Promise<void>;
    opacity: import("react-native").Animated.Value;
    isLoading: boolean;
    activeEditor: EditorModes;
    showAlert: boolean;
    handleAlertResponse: (shouldCrop: boolean) => Promise<void>;
};
//# sourceMappingURL=useSwitchEditor.d.ts.map