import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useCropImage, useImageEditorContext } from '../../hooks';
export const CropImageButton = function ({ onCrop, }) {
    const cropImage = useCropImage({ onCrop });
    const { isSaving, config: { labels, colors }, } = useImageEditorContext();
    return (<TouchableOpacity onPress={cropImage} style={styles.container} disabled={isSaving}>
      <Text style={[styles.title, { color: colors.headerButtons }]}>
        {labels.SET}
      </Text>
    </TouchableOpacity>);
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
//# sourceMappingURL=CropImageButton.js.map