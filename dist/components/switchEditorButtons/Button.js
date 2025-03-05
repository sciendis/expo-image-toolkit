import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Colors } from "../../styles";
export const Button = function ({ activeEditor, editorName, switchEditor, children, }) {
    return (<TouchableOpacity style={[styles.container, activeEditor === editorName && styles.active]} onPress={() => switchEditor(editorName)}>
      {children}
    </TouchableOpacity>);
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
//# sourceMappingURL=Button.js.map