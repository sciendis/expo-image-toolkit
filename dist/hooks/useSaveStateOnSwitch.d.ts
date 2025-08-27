import { EditorModes } from '../constants';
/**
 * @description This hook returns the saveStateOnSwitch function, which saves the current state of the RotateEditor
 * when switching to another editor, only if the rotation value is ±90/±270. In such cases, it generates a new image.
 * For other rotation values (like ±180/±360), this function won’t run since the image dimensions stay the same.
 * It also checks if the CropFrame was modified. If changes are detected while switching editors, an alert will ask whether to keep the cropped area.
 * If the user selects “No,” nothing happens. If they confirm, a new image is generated using the current CropFrame.
 */
export declare const useSaveStateOnSwitch: () => (activeEditor: EditorModes, shouldCrop?: boolean) => Promise<boolean>;
//# sourceMappingURL=useSaveStateOnSwitch.d.ts.map