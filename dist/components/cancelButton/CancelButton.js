import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useImageEditorContext } from '../../hooks';
export const CancelButton = function ({ onCancel }) {
    const { config: { labels, colors }, } = useImageEditorContext();
    return (<TouchableOpacity style={styles.container} onPress={onCancel}>
      <Text style={[styles.title, { color: colors.headerButtons }]}>
        {labels.CANCEL}
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
//# sourceMappingURL=CancelButton.js.map