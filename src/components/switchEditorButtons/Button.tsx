import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { EditorModes } from '../../constants';
import { useImageEditorContext } from '../../hooks';
import { calculateFontScale } from '../../utils';

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
export const Button = function ({
  activeEditor,
  editorName,
  switchEditor,
  children,
}: Props) {
  const {
    isLoading,
    config: { colors },
  } = useImageEditorContext();

  return (
    <TouchableOpacity
      style={[
        styles.container,
        { backgroundColor: colors.switchEditorIconBg },
        activeEditor === editorName && {
          backgroundColor: colors.switchEditorIconActive,
        },
      ]}
      onPress={() => switchEditor(editorName)}
      disabled={isLoading}
    >
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 100,
    width: calculateFontScale(50),
    height: calculateFontScale(50),
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
});
