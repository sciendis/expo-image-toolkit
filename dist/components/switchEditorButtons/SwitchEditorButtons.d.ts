/// <reference types="react" />
import { EditorModes } from '../../constants';
type Props = {
    activeEditor: EditorModes;
    switchEditor: (mode: EditorModes) => Promise<void>;
    isLoading: boolean;
};
/**
 * @description Renders buttons for switching between available editors: (Rotate/Zoom/Crop).
 * Each button activates its related editor when pressed.
 *
 * @param props - An object containing:
 * - `activeEditor`: `EditorModes` – The currently active editor mode.
 * - `switchEditor`: `(mode: EditorModes) => Promise<void>` – Function to handle switch editor modes.
 * - `isLoading`: `boolean` – Disables buttons while the image is processing.
 *
 * @returns A horizontal row of editor selection buttons.
 */
export declare const SwitchEditorButtons: ({ activeEditor, switchEditor, isLoading, }: Props) => import("react").JSX.Element;
export {};
//# sourceMappingURL=SwitchEditorButtons.d.ts.map