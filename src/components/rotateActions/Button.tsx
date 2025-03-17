import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useImageEditorContext } from '../imageEditor/useImageEditorContext';

type Props = {
  onPress: () => void;
  children: React.ReactNode;
  disabled?: boolean;
};

export const Button = function ({ children, onPress, disabled }: Props) {
  const {
    config: { colors },
  } = useImageEditorContext();
  const colorStyles = { backgroundColor: colors.rotateActionsBg };
  const disabledStyles = { backgroundColor: colors.rotateActionsDeactive };

  return (
    <TouchableOpacity
      style={[styles.item, colorStyles, disabled && disabledStyles]}
      onPress={onPress}
      disabled={disabled}
    >
      {children}
    </TouchableOpacity>
  );
};

export const styles = StyleSheet.create({
  item: {
    borderRadius: 100,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    resizeMode: 'contain',
    width: '100%',
    height: '100%',
  },
});
