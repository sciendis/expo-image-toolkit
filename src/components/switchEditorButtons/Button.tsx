import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { EditorModes } from '../../constants';
import { useImageEditorContext } from '../../hooks';

type Props = {
  activeEditor: EditorModes;
  editorName: EditorModes;
  switchEditor: (mode: EditorModes) => Promise<void>;
  children: React.ReactNode;
  disabled?: boolean;
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
  disabled,
}: Props) {
  const {
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
      disabled={disabled}
    >
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 100,
    width: 55,
    height: 55,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
