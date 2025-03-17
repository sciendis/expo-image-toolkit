import { EditorModes } from '../constants';
export declare const useSaveStateOnSwitch: () => {
    saveStateOnSwitch: (activeEditor: EditorModes | null, shouldCrop?: boolean) => Promise<{
        needsConfirmation: boolean;
        needsTimeout: boolean;
    }>;
};
//# sourceMappingURL=useSaveStateOnSwitch.d.ts.map