import { StyleSheet, View } from 'react-native';
import { Surface, Title } from 'react-native-paper';
import { getExpoConstants } from '../../utils';
import { CancelButton } from '../cancelButton';
import { CropImageButton } from '../cropImageButton';
import { useImageEditorContext } from '../imageEditor/useImageEditorContext';
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
        padding: 4,
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