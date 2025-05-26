import { StyleSheet, View } from 'react-native';
import { Surface, Title } from 'react-native-paper';
import { useImageEditorContext } from '../../hooks';
import { getExpoConstants } from '../../utils';
import { CancelButton } from '../cancelButton';
import { CropImageButton } from '../cropImageButton';
/**
 * @description This is the header of the Modal Editor. This will render CancelButton/FinishButton and the title of the editor which can be edited via userConfig.
 *
 * @param props - An object containing:
 * - `onCancel`: `() => void` – Callback triggered when the user presses the cancel button.
 * - `onCrop`: `() => void` – Callback triggered when the user presses the finish button.
 * - `onLayout`: `(event: LayoutChangeEvent) => void` (optional) – Used to pass layout changes to the parent.
 *
 * @returns A Surface component containing the editor header with cancel, title, and crop actions.
 */
export const ImageEditorHeader = function ({ onCancel, onCrop, onLayout, }) {
    const { statusBarHeight } = getExpoConstants();
    const { config: { colors, labels }, } = useImageEditorContext();
    return (<Surface onLayout={onLayout} style={[styles.container, { marginTop: statusBarHeight }]}>
      <View style={styles.headerItem}>
        <CancelButton onCancel={onCancel}/>
      </View>
      <View style={[
            styles.headerItem,
            styles.headerCenter,
            { backgroundColor: colors.headerTitleBg },
        ]}>
        <Title style={[styles.headerTitle, { color: colors.headerTitle }]}>
          {labels.EDITOR_TITLE}
        </Title>
      </View>
      <View style={[styles.headerItem, styles.headerRight]}>
        <CropImageButton onCrop={onCrop}/>
      </View>
    </Surface>);
};
const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: 'transparent',
    },
    headerItem: {
        marginHorizontal: 10,
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
        fontSize: 21,
        fontWeight: '600',
        textAlign: 'center',
    },
});
//# sourceMappingURL=ImageEditorHeader.js.map