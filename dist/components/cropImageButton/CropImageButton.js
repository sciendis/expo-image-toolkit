import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useCropImage, useImageEditorContext } from '../../hooks';
/**
 * @description The finish Button that appears on top-right corner of the editor modal header.
 * @param {() => void} onCrop - The function to call when the finish button is pressed.
 * @returns A touchable finish button component.
 */
export const CropImageButton = function ({ onCrop, }) {
    const cropImage = useCropImage({ onCrop });
    const { isLoading, isSaving, config: { labels, colors }, } = useImageEditorContext();
    return (<TouchableOpacity onPress={cropImage} style={styles.container} disabled={isSaving || isLoading}>
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