import React from 'react';
import { EditorModes } from '../../constants';
import { Animated } from 'react-native';
type Props = {
    activeEditor: EditorModes;
    opacity: Animated.Value;
    showOrientationHint?: boolean;
};
/**
 * @description Renders the active editor contents (Zoom/Rotate/Crop) based on the currently selected mode
 * with gesture handling and active editor tools components.
 *
 * @param props - An object containing:
 * - `children`: `ReactNode` – The active editor contents to render inside the wrapper.
 *
 * @returns The view of the active editor or loading screen.
 */
export declare const ImageEditorContents: ({ activeEditor, opacity, showOrientationHint, }: Props) => React.JSX.Element;
export {};
//# sourceMappingURL=ImageEditorContents.d.ts.map