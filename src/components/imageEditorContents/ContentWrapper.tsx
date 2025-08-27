import React from 'react';
import { Animated, StyleSheet } from 'react-native';
import { useImageEditorContext } from '../../hooks';
import { HistoryButtons } from '../historyButtons';
import { LoadingIndicator } from '../loadingIndicator';

type Props = {
  children: React.ReactNode;
};

/**
 * @description The layout wrapper for the active editor (Zoom/Rotate/Crop) that handles the loading screen while changing active editor.
 *
 * @param props - An object containing:
 * - `activeEditor`: `EditorModes` – The currently active editor mode.
 *
 * @returns The selected editor UI, with gesture support and mode-specific tools.
 */
export const ContentWrapper = function ({ children }: Props) {
  const {
    isLoading,
    config: { colors },
  } = useImageEditorContext();
  const colorStylesContainer = { backgroundColor: colors.background };

  return (
    <Animated.View style={[styles.container, colorStylesContainer]}>
      <HistoryButtons />
      {isLoading && <LoadingIndicator />}
      {children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
