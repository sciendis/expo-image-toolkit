import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useImageEditorContext } from '../../hooks';
import { Spacing } from '../../styles';
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
export const Button = function ({ activeEditor, editorName, switchEditor, children, }) {
    const { isLoading, config: { colors }, } = useImageEditorContext();
    return (<TouchableOpacity style={[
            styles.container,
            { backgroundColor: colors.switchEditorIconBg },
            activeEditor === editorName && {
                backgroundColor: colors.switchEditorIconActive,
            },
        ]} onPress={() => switchEditor(editorName)} disabled={isLoading !== 'none'}>
      {children}
    </TouchableOpacity>);
};
const styles = StyleSheet.create({
    container: {
        borderRadius: 100,
        width: Spacing.xxl,
        height: Spacing.xxl,
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
});
//# sourceMappingURL=Button.js.map