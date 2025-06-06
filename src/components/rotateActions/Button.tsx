import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useImageEditorContext } from '../../hooks';

type Props = {
  onPress: () => void;
  children: React.ReactNode;
  disabled?: boolean;
};

/**
 * @description The main Button component for Rotate/Flip actions.
 * It accepts any ReactNode as children (usually an icon).
 *
 * @param props - An object containing:
 * - `children`: `React.ReactNode` – Accepts any ReactNode, but typically used for Rotate/Flip icons.
 * - `onPress`: `() => void` – Callback triggered when the button is pressed.
 * - `disabled`: `boolean` (optional) – If true, disables the button and applies a deactivated background style.
 *
 */
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
