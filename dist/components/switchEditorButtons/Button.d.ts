import React from 'react';
import { EditorModes } from '../../constants';
type Props = {
    activeEditor: EditorModes;
    editorName: EditorModes;
    switchEditor: (mode: EditorModes) => Promise<void>;
    children: React.ReactNode;
};
/**
 * @description The main Button component for switching between editor modes (Rotate/Zoom/Crop).
 * Highlights the active editor and triggers `switchEditor` when pressed.
 *
 * @param props - An object containing:
 * - `activeEditor`: `EditorModes` – The currently selected editor mode.
 * - `editorName`: `EditorModes` – The editor mode this button represents.
 * - `switchEditor`: `(mode: EditorModes) => Promise<void>` – Function to switch editor modes.
 * - `children`: `ReactNode` – Usually an icon to visually represent the editor.
 * - `disabled`: `boolean` (optional) – If true, disables the button.
 *
 * @returns A styled TouchableOpacity for editor switching.
 */
export declare const Button: ({ activeEditor, editorName, switchEditor, children, }: Props) => React.JSX.Element;
export {};
//# sourceMappingURL=Button.d.ts.map