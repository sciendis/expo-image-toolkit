import React from 'react';
import { Animated, StyleSheet } from 'react-native';
import { useImageEditorContext } from '../imageEditor/useImageEditorContext';

type Props = {
  children: React.ReactNode;
};

export const ContentWrapper = function ({ children }: Props) {
  const {
    config: { colors },
  } = useImageEditorContext();
  const colorStylesContainer = { backgroundColor: colors.background };

  return (
    <Animated.View style={[styles.container, colorStylesContainer]}>
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
