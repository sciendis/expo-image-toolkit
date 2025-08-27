import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { useImageEditorContext } from '../../hooks';
import { calculateFontScale, getExpoConstants } from '../../utils';
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
    const { statusBarHeight } = getExpoConstants();
    const { config: { colors, labels }, } = useImageEditorContext();
    return (<SafeAreaView style={[styles.container, { marginTop: statusBarHeight }]}>
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
    </SafeAreaView>);
};
const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: calculateFontScale(6),
    },
    headerItem: {
        marginHorizontal: calculateFontScale(10),
        flex: 1,
    },
    headerCenter: {
        paddingVertical: 0,
        borderRadius: 20,
        flex: 1.5,
    },
    headerRight: {
        alignItems: 'flex-end',
    },
    headerTitle: {
        fontSize: calculateFontScale(21),
        fontWeight: '600',
        textAlign: 'center',
    },
});
//# sourceMappingURL=ImageEditorHeader.js.map