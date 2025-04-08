import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useImageEditorContext } from '../../hooks';
export const Button = function ({ activeEditor, editorName, switchEditor, children, }) {
    const { config: { colors }, } = useImageEditorContext();
    return (<TouchableOpacity style={[
            styles.container,
            { backgroundColor: colors.switchEditorIconBg },
            activeEditor === editorName && {
                backgroundColor: colors.switchEditorIconActive,
            },
        ]} onPress={() => switchEditor(editorName)}>
      {children}
    </TouchableOpacity>);
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
//# sourceMappingURL=Button.js.map