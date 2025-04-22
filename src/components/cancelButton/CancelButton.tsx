import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useImageEditorContext } from '../../hooks';

type Props = {
  onCancel: () => void;
};
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
    fontSize: 14,
  },
});
