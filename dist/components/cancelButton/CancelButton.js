import { StyleSheet, TouchableOpacity } from 'react-native';
import { useImageEditorContext } from '../../hooks';
import { CustomText } from '../customText';
export const CancelButton = function ({ onCancel }) {
    const { config: { labels, colors }, } = useImageEditorContext();
    return (<TouchableOpacity onPress={onCancel}>
      <CustomText style={[styles.title, { color: colors.headerButtons }]}>
        {labels.CANCEL}
      </CustomText>
    </TouchableOpacity>);
};
const styles = StyleSheet.create({
    title: {
        fontSize: 14,
    },
});
//# sourceMappingURL=CancelButton.js.map