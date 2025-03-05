import { StyleSheet, TouchableOpacity } from "react-native";
import { useCropImage } from "../../hooks";
import { Colors } from "../../styles";
import { CustomText } from "../customText";
import { ImageEditorProps } from "../imageEditor/ImageEditor";
import { useImageEditorContext } from "../imageEditor/useImageEditorContext";

export const CropImageButton = function ({
  onCrop,
}: Pick<ImageEditorProps, "onCrop">) {
  const cropImage = useCropImage({ onCrop });
  const { isSaving, config } = useImageEditorContext();
  const { labels } = config;

  return (
    <TouchableOpacity onPress={cropImage} disabled={isSaving}>
      <CustomText style={styles.title}>{labels.SET}</CustomText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  title: {
    color: Colors.white,
    fontSize: 16,
  },
});
