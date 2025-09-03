import React from 'react';
import { Animated, StyleSheet } from 'react-native';
import { useImageEditorContext } from '../../hooks';
import { HistoryButtons } from '../historyButtons';
import { LoadingIndicator } from '../loadingIndicator';
/**
 * @description The layout wrapper for the active editor (Zoom/Rotate/Crop) that handles the loading screen while changing active editor.
 *
 * @param props - An object containing:
 * - `activeEditor`: `EditorModes` – The currently active editor mode.
 *
 * @returns The selected editor UI, with gesture support and mode-specific tools.
 */
export const ContentWrapper = function ({ children }) {
    const { isLoading, config: { colors }, } = useImageEditorContext();
    const colorStylesContainer = { backgroundColor: colors.background };
    return (<Animated.View style={[styles.container, colorStylesContainer]}>
      <HistoryButtons />
      {isLoading === 'contents' && <LoadingIndicator />}
      {children}
    </Animated.View>);
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
//# sourceMappingURL=ContentWrapper.js.map