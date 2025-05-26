import React from 'react';
import { Animated } from 'react-native';
import { EditorModes } from '../../constants';
type Props = {
    activeEditor: EditorModes;
    isLoading: boolean;
    opacity: Animated.Value;
};
/**
 * @description Renders the active editor contents (Zoom/Rotate/Crop) based on the currently selected mode
 * with gesture handling and active editor tools components.
 *
 * @param props - An object containing:
 * - `children`: `ReactNode` – The active editor contents to render inside the wrapper.
 * - `isLoading`: `boolean` – If true, displays the loading indicator.
 * - `opacity`: `Animated.Value` – Opacity value for animating the loading indicator.
 *
 * @returns The view of the active editor or loading screen.
 */
export declare const ImageEditorContents: ({ activeEditor, isLoading, opacity, }: Props) => React.JSX.Element;
export {};
//# sourceMappingURL=ImageEditorContents.d.ts.map