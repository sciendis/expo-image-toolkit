import { STATIC_TEXTS } from '@/constants';
import { useCropImage } from '@/hooks';
import { Colors } from '@/styles';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { CustomText } from '../customText';
import { ImageEditorProps } from '../imageEditor/ImageEditor';
import { useImageEditorContext } from '../imageEditor/useImageEditorContext';

export const CropImageButton = function ({
  onCrop,
}: Pick<ImageEditorProps, 'onCrop'>) {
  const cropImage = useCropImage({ onCrop });
  const { isSaving } = useImageEditorContext();

  return (
    <TouchableOpacity onPress={cropImage} disabled={isSaving}>
      <CustomText style={styles.title}>{STATIC_TEXTS.SET}</CustomText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  title: {
    color: Colors.white,
    fontSize: 16,
  },
});
