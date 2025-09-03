import AsyncStorage from '@react-native-async-storage/async-storage';
import { X } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useImageEditorContext } from '../../hooks';
import { FontSizes, Spacing } from '../../styles';
import { Alert } from '../alert';

type Props = {
  message: string;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  id: string;
};

/**
 * @description This Hint component is used in two places: the Rotate editor and the Zoom editor.
 * These hints help users to work more effectively with the app.
 *
 * @param {string} message - The text to display in the hint box.
 * @returns A styled hint box with the given message.
 */
export const Hint = ({ id, message, visible, setVisible }: Props) => {
  const {
    config: { colors, labels },
  } = useImageEditorContext();
  const [showAlert, setShowAlert] = useState(false);

  const hintId = `image_editor_hint_${id}`;

  useEffect(() => {
    const checkHintStatus = async () => {
      const stored = await AsyncStorage.getItem(hintId);
      if (stored !== 'true') return;
      setVisible(false);
    };
    checkHintStatus();
  }, [setVisible, hintId]);

  const handleClose = () => setShowAlert(true);

  if (!visible) return null;

  return (
    <>
      <View
        style={[
          styles.container,
          {
            backgroundColor: colors.hintBg,
            zIndex: 1,
          },
        ]}
      >
        <TouchableOpacity style={[styles.closeIcon]} onPress={handleClose}>
          <X color={colors.hint} size={FontSizes.m} />
        </TouchableOpacity>
        <Text style={[styles.message, { color: colors.hint }]}>{message}</Text>
      </View>
      <Alert
        alertText={labels.HINT_ALERT_MESSAGE}
        submitLabel={labels.HINT_ALERT_DONT_SHOW_AGAIN}
        cancelLabel={labels.HINT_ALERT_CLOSE_ONLY}
        onSubmit={() => {
          AsyncStorage.setItem(hintId, 'true');
          setShowAlert(false);
          setVisible(false);
        }}
        onCancel={() => {
          setShowAlert(false);
          setVisible(false);
        }}
        visible={showAlert}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: Spacing.xxs,
    paddingHorizontal: Spacing.l,
    borderRadius: 5,
    marginBottom: Spacing.xs,
    pointerEvents: 'auto',
    maxWidth: '90%',
  },
  message: {
    fontSize: FontSizes.s,
    textAlign: 'auto',
    pointerEvents: 'none',
    userSelect: 'none',
    lineHeight: Spacing.m,
  },
  closeIcon: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
});
