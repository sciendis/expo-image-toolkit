import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useImageEditorContext } from '../../hooks';
import { calculateFontScale } from '../../utils';

type Props = {
  onCancel: () => void;
};

/**
 * @description The cancel Button that appears on top-left corner of the editor modal header.
 * @param {() => void} onCancel - The function to call when the cancel button is pressed.
 * @returns A touchable cancel button component.
 */
export const CancelButton = function ({ onCancel }: Props) {
  const {
    config: { labels, colors },
  } = useImageEditorContext();

  return (
    <TouchableOpacity style={styles.container} onPress={onCancel}>
      <Text style={[styles.title, { color: colors.headerButtons }]}>
        {labels.CANCEL}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 4,
    paddingVertical: 8,
  },
  title: {
    fontSize: calculateFontScale(14),
  },
});
