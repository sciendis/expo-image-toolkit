import React from 'react';
import { Animated, StyleSheet } from 'react-native';
import { useImageEditorContext } from '../imageEditor/useImageEditorContext';

type Props = {
  opacity: Animated.Value;
  children: React.ReactNode;
};

export const ContentWrapper = function ({ opacity, children }: Props) {
  const {
    config: { colors },
  } = useImageEditorContext();
  const colorStylesContainer = { backgroundColor: colors.background };

  // TODO: Apply opacity again with useAnimatedStyle to fix the problem
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
