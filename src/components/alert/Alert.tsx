import { useEffect, useRef } from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useImageEditorContext } from '../../hooks';
import { FontSizes, Spacing } from '../../styles';

type Props = {
  visible: boolean;
  onSubmit: () => void;
  onCancel: () => void;
  alertText: string;
  submitLabel: string;
  cancelLabel: string;
};

/**
 * @description This is a custom alert built for ImageEditor.
 *
 * @param props - An object containing:
 * - `visible`: `boolean` – Check if the alert should be shown.
 * - `onSubmit`: `() => void` – Callback returning the user’s submit the alert.
 * - `onCancel`: `() => void` – Callback returning the user’s cancel the alert.
 *
 * @returns A Dialog animated alert with YES and NO buttons.
 */
export const Alert = function ({
  visible,
  onSubmit,
  onCancel,
  alertText,
  submitLabel,
  cancelLabel,
}: Props) {
  const {
    config: { colors },
  } = useImageEditorContext();

  const fadeAnim = useRef(new Animated.Value(0));
  const scaleAnim = useRef(new Animated.Value(0.8));

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim.current, {
        toValue: visible ? 1 : 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim.current, {
        toValue: visible ? 1 : 0.8,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, [visible]);

  return (
    <View style={styles.overlay} pointerEvents={visible ? 'auto' : 'none'}>
      <Animated.View
        style={[
          styles.container,
          {
            opacity: fadeAnim.current,
            transform: [{ scale: scaleAnim.current }],
            backgroundColor: colors.alertBg,
            shadowColor: colors.alertShadow,
          },
        ]}
      >
        <View style={styles.messageContainer}>
          <Text style={[styles.message, { color: colors.alertMessage }]}>
            {alertText}
          </Text>
        </View>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonsParent}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: colors.alertCancelBg }]}
              onPress={() => onCancel()}
            >
              <Text
                style={[styles.buttonText, { color: colors.alertCancelText }]}
              >
                {cancelLabel}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonsParent}>
            <TouchableOpacity
              style={[styles.button, { backgroundColor: colors.alertSubmitBg }]}
              onPress={() => onSubmit()}
            >
              <Text
                style={[styles.buttonText, { color: colors.alertSubmitText }]}
              >
                {submitLabel}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  container: {
    width: '80%',
    borderRadius: 12,
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 30,
  },
  messageContainer: {
    width: '100%',
    paddingVertical: Spacing.xxs,
    paddingHorizontal: Spacing.xs,
  },
  message: {
    textAlign: 'justify',
    fontSize: FontSizes.m,
  },
  buttonsContainer: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    width: '100%',
    justifyContent: 'space-evenly',
    marginTop: Spacing.m,
    marginBottom: Spacing.xs,
    paddingHorizontal: Spacing.xxs,
  },
  buttonsParent: {
    width: '40%',
  },
  button: {
    padding: Spacing.xxs,
    borderRadius: 5,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: Spacing.xs,
  },
});
