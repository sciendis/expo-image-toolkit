import React from 'react';
import { Animated } from 'react-native';
type Props = {
    children: React.ReactNode;
    isLoading: boolean;
    opacity: Animated.Value;
};
/**
 * @description The layout wrapper for the active editor (Zoom/Rotate/Crop) that handles the loading screen while changing active editor.
 *
 * @param props - An object containing:
 * - `activeEditor`: `EditorModes` – The currently active editor mode.
 * - `isLoading`: `boolean` – Indicates whether a loading indicator should be shown.
 * - `opacity`: `Animated.Value` – Opacity value used for the loading indicator.
 *
 * @returns The selected editor UI, with gesture support and mode-specific tools.
 */
export declare const ContentWrapper: ({ children, isLoading, opacity, }: Props) => React.JSX.Element;
export {};
//# sourceMappingURL=ContentWrapper.d.ts.map