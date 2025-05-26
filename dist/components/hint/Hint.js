import { X } from 'lucide-react-native';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useImageEditorContext } from '../../hooks';
/**
 * @description This Hint component is used in two places: the Rotate editor and the Zoom editor.
 * These hints help users to work more effectively with the app.
 *
 * @param {string} message - The text to display in the hint box.
 * @returns A styled hint box with the given message.
 */
export const Hint = function ({ message, opacity, setOpacity }) {
    const { config: { colors }, } = useImageEditorContext();
    return (<View style={[
            styles.container,
            { backgroundColor: colors.hintBg },
            { opacity, zIndex: opacity === 0 ? -1 : 1 },
        ]}>
      <TouchableOpacity style={[styles.closeIcon]} onPress={() => setOpacity(0)}>
        <X color={colors.hint} size={14}/>
      </TouchableOpacity>
      <Text style={[styles.message, { color: colors.hint }]}>{message}</Text>
    </View>);
};
const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: '10%',
        right: '10%',
        top: 45,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
        padding: 4,
        borderRadius: 5,
        maxWidth: '80%',
    },
    message: {
        fontSize: 14,
        textAlign: 'auto',
        pointerEvents: 'none',
        userSelect: 'none',
        lineHeight: 16,
    },
    closeIcon: {
        position: 'absolute',
        top: -10,
        right: -10,
        padding: 4,
    },
});
//# sourceMappingURL=Hint.js.map