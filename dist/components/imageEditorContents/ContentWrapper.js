import React from 'react';
import { Animated, StyleSheet } from 'react-native';
import { useImageEditorContext } from '../../hooks';
export const ContentWrapper = function ({ children }) {
    const { config: { colors }, } = useImageEditorContext();
    const colorStylesContainer = { backgroundColor: colors.background };
    return (<Animated.View style={[styles.container, colorStylesContainer]}>
      {children}
    </Animated.View>);
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
});
//# sourceMappingURL=ContentWrapper.js.map