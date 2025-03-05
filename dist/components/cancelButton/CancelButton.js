import { StyleSheet, TouchableOpacity } from "react-native";
import { Colors } from "../../styles";
import { CustomText } from "../customText";
import { useImageEditorContext } from "../imageEditor/useImageEditorContext";
export const CancelButton = function ({ onCancel }) {
    const { config } = useImageEditorContext();
    const { labels } = config;
    return (<TouchableOpacity onPress={onCancel}>
      <CustomText style={styles.title}>{labels.CANCEL}</CustomText>
    </TouchableOpacity>);
};
const styles = StyleSheet.create({
    title: {
        color: Colors.white,
        fontSize: 16,
    },
});
//# sourceMappingURL=CancelButton.js.map