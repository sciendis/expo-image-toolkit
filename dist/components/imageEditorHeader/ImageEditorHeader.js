import { StyleSheet, Text, View } from 'react-native';
import { useImageEditorContext } from '../../hooks';
import { FontSizes, Spacing } from '../../styles';
import { CancelButton } from '../cancelButton';
import { CropImageButton } from '../cropImageButton';
/**
 * @description This is the header of the Modal Editor. This will render CancelButton/FinishButton and the title of the editor which can be edited via userConfig.
 *
 * @param props - An object containing:
 * - `onCancel`: `() => void` – Callback triggered when the user presses the cancel button.
 * - `onCrop`: `() => void` – Callback triggered when the user presses the finish button.
 *
 * @returns A Surface component containing the editor header with cancel, title, and crop actions.
 */
export const ImageEditorHeader = function ({ onCancel, onCrop }) {
    const { config: { colors, labels }, } = useImageEditorContext();
    return (<View style={styles.container}>
      <View style={styles.headerItem}>
        <CancelButton onCancel={onCancel}/>
      </View>
      <View style={[
            styles.headerItem,
            styles.headerCenter,
            { backgroundColor: colors.headerTitleBg },
        ]}>
        <Text style={[styles.headerTitle, { color: colors.headerTitle }]}>
          {labels.EDITOR_TITLE}
        </Text>
      </View>
      <View style={[styles.headerItem, styles.headerRight]}>
        <CropImageButton onCrop={onCrop}/>
      </View>
    </View>);
};
const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: Spacing.xxs,
        position: 'relative',
        zIndex: 1,
    },
    headerItem: {
        marginHorizontal: Spacing.xs,
        flex: 1,
    },
    headerCenter: {
        paddingVertical: 0,
        paddingHorizontal: Spacing.xs,
        borderRadius: 20,
    },
    headerRight: {
        alignItems: 'flex-end',
    },
    headerTitle: {
        fontSize: FontSizes.l,
        fontWeight: '600',
        textAlign: 'center',
    },
});
//# sourceMappingURL=ImageEditorHeader.js.map