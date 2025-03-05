import { RotateCcw, RotateCw } from "lucide-react-native";
import { StyleSheet, View } from "react-native";
import { useDerivedValue, withTiming } from "react-native-reanimated";
import { Colors } from "../../styles";
import { getNextLeftAngle, getNextRightAngle, resetZoomState, } from "../../utils";
import { useImageEditorContext } from "../imageEditor/useImageEditorContext";
import { Button } from "./Button";
import { FlipButtons } from "./FlipButtons";
export const RotateButtons = function () {
    const { rotate, previousRotate, zoom, imagePosition } = useImageEditorContext();
    /** previousRotate holding the rotation angle from the last time that users changing image rotation and switch on another editor,
     * then because saving totally a new image from rotation, we keep the last state of rotation in previousRotate state
     */
    const totalRotation = useDerivedValue(() => previousRotate + rotate.value);
    const rotateRight = () => {
        resetZoomState(zoom, imagePosition);
        const nextAngle = getNextRightAngle(totalRotation.value);
        rotate.value = withTiming(nextAngle - previousRotate);
    };
    const rotateLeft = () => {
        resetZoomState(zoom, imagePosition);
        const nextAngle = getNextLeftAngle(totalRotation.value);
        rotate.value = withTiming(nextAngle - previousRotate);
    };
    return (<View style={styles.container}>
      <Button onPress={rotateLeft}>
        <RotateCcw color={Colors.black}/>
      </Button>
      <FlipButtons />
      <Button onPress={rotateRight}>
        <RotateCw color={Colors.black}/>
      </Button>
    </View>);
};
export const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-around",
        paddingHorizontal: 8,
        position: "absolute",
        bottom: 40,
        left: 0,
        width: "100%",
        flexWrap: "wrap",
    },
});
//# sourceMappingURL=RotateButtons.js.map