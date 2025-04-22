import React from 'react';
import { Animated, StyleSheet } from 'react-native';
import { useImageEditorContext } from '../../hooks';
import { LoadingIndicator } from '../loadingIndicator';

type Props = {
  children: React.ReactNode;
  isLoading: boolean;
  opacity: Animated.Value;
};

export const ContentWrapper = function ({
  children,
  isLoading,
  opacity,
}: Props) {
  const {
    config: { colors },
  } = useImageEditorContext();
  const colorStylesContainer = { backgroundColor: colors.background };

  return (
    <Animated.View style={[styles.container, colorStylesContainer]}>
      {isLoading && <LoadingIndicator opacity={opacity} />}
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
