import { StyleSheet, Text, View } from 'react-native';
import { useImageEditorContext } from '../../hooks';

type Props = {
  message: string;
};

export const Hint = function ({ message }: Props) {
  const {
    config: { colors },
  } = useImageEditorContext();
  const colorStyles = { color: colors.hint, backgroundColor: colors.hintBg };

  return (
    <View style={styles.container}>
      <Text style={[styles.message, colorStyles]}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: '5%',
    right: '5%',
    top: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    pointerEvents: 'none',
    userSelect: 'none',
    zIndex: 10,
  },
  message: {
    fontSize: 14,
    textAlign: 'auto',
    borderRadius: 5,
    overflow: 'hidden',
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
});
