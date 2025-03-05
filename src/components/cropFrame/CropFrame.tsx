import { StyleSheet, View } from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { Colors } from "../../styles";
import { useImageEditorContext } from "../imageEditor/useImageEditorContext";
import { Aim } from "./Aim";
import { Corners } from "./Corners";
import { ExtraBorders } from "./ExtraBorders";

export const CropFrame = function () {
  const { boxPosition, boxScale } = useImageEditorContext();

  const animatedStyle = useAnimatedStyle(() => {
    if (boxScale.value.x === 0 || boxScale.value.y === 0) return {};
    if (boxPosition.value.x === 0 && boxPosition.value.y === 0) return {};
    return {
      width: boxScale.value.x,
      height: boxScale.value.y,
      left: boxPosition.value.x,
      top: boxPosition.value.y,
      opacity: 100,
    };
  });

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <View style={styles.box}>
        <Aim />
        <Corners />
        <ExtraBorders />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    borderWidth: 1,
    borderColor: Colors.white,
    backgroundColor: Colors.lightGrayTransparent,
    pointerEvents: "box-none",
    opacity: 0,
  },
  box: {
    height: "100%",
    width: "100%",
  },
});
