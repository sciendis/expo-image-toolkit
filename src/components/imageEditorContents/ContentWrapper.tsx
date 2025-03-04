import { Colors } from '@/styles';
import React from 'react';
import { StyleSheet, Animated } from 'react-native';

type Props = {
  opacity: Animated.Value;
  children: React.ReactNode;
};

export const ContentWrapper = function ({ opacity, children }: Props) {
  return (
    <Animated.View style={[styles.container, { opacity }]}>
      {children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.background,
    flexDirection: 'row',
  },
});
