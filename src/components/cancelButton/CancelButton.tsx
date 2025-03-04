import { STATIC_TEXTS } from '@/constants';
import { Colors } from '@/styles';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { CustomText } from '../customText';

type Props = {
  onCancel: () => void;
};
export const CancelButton = function ({ onCancel }: Props) {
  return (
    <TouchableOpacity onPress={onCancel}>
      <CustomText style={styles.title}>{STATIC_TEXTS.CANCEL}</CustomText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  title: {
    color: Colors.white,
    fontSize: 16,
  },
});
