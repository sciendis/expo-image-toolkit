import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { EditorModes } from "../../constants";
import { Colors } from "../../styles";
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
  return (
    <TouchableOpacity
      style={[styles.container, activeEditor === editorName && styles.active]}
      onPress={() => switchEditor(editorName)}
    >
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.black,
    borderRadius: 100,
    width: 55,
    height: 55,
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  active: {
    backgroundColor: Colors.lightGrayTransparent,
  },
});
