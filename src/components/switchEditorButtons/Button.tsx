import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { EditorModes } from '../../constants';
import { useImageEditorContext } from '../imageEditor/useImageEditorContext';
type Props = {
  activeEditor: EditorModes | null;
  editorName: EditorModes;
  switchEditor: (mode: EditorModes) => Promise<void>;
  children: React.ReactNode;
};

export const Button = function ({
  activeEditor,
  editorName,
  switchEditor,
  children,
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
