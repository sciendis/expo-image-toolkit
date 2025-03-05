import { StyleSheet, TouchableOpacity } from "react-native";
import { Colors } from "../../styles";
import { CustomText } from "../customText";
import { useImageEditorContext } from "../imageEditor/useImageEditorContext";

type Props = {
  onCancel: () => void;
};
export const CancelButton = function ({ onCancel }: Props) {
  const { config } = useImageEditorContext();
  const { labels } = config;

  return (
    <TouchableOpacity onPress={onCancel}>
      <CustomText style={styles.title}>{labels.CANCEL}</CustomText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  title: {
    color: Colors.white,
    fontSize: 16,
  },
});
