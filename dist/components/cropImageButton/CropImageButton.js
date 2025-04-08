import { StyleSheet, TouchableOpacity } from 'react-native';
import { useCropImage, useImageEditorContext } from '../../hooks';
import { CustomText } from '../customText';
export const CropImageButton = function ({ onCrop, }) {
    const cropImage = useCropImage({ onCrop });
    const { isSaving, config: { labels, colors }, } = useImageEditorContext();
    return (<TouchableOpacity onPress={cropImage} disabled={isSaving}>
      <CustomText style={[styles.title, { color: colors.headerButtons }]}>
        {labels.SET}
      </CustomText>
    </TouchableOpacity>);
};
const styles = StyleSheet.create({
    title: {
        fontSize: 14,
    },
});
//# sourceMappingURL=CropImageButton.js.map