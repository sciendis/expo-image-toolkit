import AsyncStorage from '@react-native-async-storage/async-storage';
import { X } from 'lucide-react-native';
import React, { useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useImageEditorContext } from '../../hooks';
import { calculateFontScale } from '../../utils';
import { getHintAlert } from './getHintAlert';

type Props = {
  message: string;
  opacity: 0 | 1;
  setOpacity: React.Dispatch<React.SetStateAction<0 | 1>>;
  id: string;
};

/**
 * @description This Hint component is used in two places: the Rotate editor and the Zoom editor.
 * These hints help users to work more effectively with the app.
 *
 * @param {string} message - The text to display in the hint box.
 * @returns A styled hint box with the given message.
 */
export const Hint = ({ id, message, opacity, setOpacity }: Props) => {
  const {
    config: { colors, labels },
  } = useImageEditorContext();

  const hintId = `image_editor_hint_${id}`;

  useEffect(() => {
    const checkHintStatus = async () => {
      const stored = await AsyncStorage.getItem(hintId);
      if (stored !== 'true') return;
      setOpacity(0);
    };
    checkHintStatus();
  }, [setOpacity, hintId]);

  const handleClose = () => getHintAlert({ hintId, setOpacity, labels });

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: colors.hintBg },
        { opacity, zIndex: opacity === 0 ? -1 : 1 },
      ]}
    >
      <TouchableOpacity style={[styles.closeIcon]} onPress={handleClose}>
        <X color={colors.hint} size={calculateFontScale(14)} />
      </TouchableOpacity>
      <Text style={[styles.message, { color: colors.hint }]}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: '10%',
    right: '10%',
    top: calculateFontScale(35),
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    padding: calculateFontScale(4),
    borderRadius: 5,
    maxWidth: '80%',
  },
  message: {
    fontSize: calculateFontScale(14),
    textAlign: 'auto',
    pointerEvents: 'none',
    userSelect: 'none',
    lineHeight: calculateFontScale(16),
  },
  closeIcon: {
    position: 'absolute',
    top: calculateFontScale(-10),
    right: calculateFontScale(-10),
    padding: calculateFontScale(4),
  },
});
