import { StyleSheet, TouchableOpacity } from 'react-native';
import { useCropImage, useImageEditorContext } from '../../hooks';
import { CustomText } from '../customText';
import { ImageEditorProps } from '../imageEditor/ImageEditor';

export const CropImageButton = function ({
  onCrop,
}: Pick<ImageEditorProps, 'onCrop'>) {
  const cropImage = useCropImage({ onCrop });
  const {
    isSaving,
    config: { labels, colors },
  } = useImageEditorContext();

  return (
    <TouchableOpacity onPress={cropImage} disabled={isSaving}>
      <CustomText style={[styles.title, { color: colors.headerButtons }]}>
        {labels.SET}
      </CustomText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 14,
  },
});
