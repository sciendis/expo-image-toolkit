import { StyleSheet, TouchableOpacity } from 'react-native';
import { CustomText } from '../customText';
import { useImageEditorContext } from '../imageEditor/useImageEditorContext';

type Props = {
  onCancel: () => void;
};
export const CancelButton = function ({ onCancel }: Props) {
  const {
    config: { labels, colors },
  } = useImageEditorContext();

  return (
    <TouchableOpacity onPress={onCancel}>
      <CustomText style={[styles.title, { color: colors.headerButtons }]}>
        {labels.CANCEL}
      </CustomText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 14,
  },
});
