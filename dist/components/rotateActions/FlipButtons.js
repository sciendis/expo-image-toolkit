import { FlipHorizontal, FlipVertical } from "lucide-react-native";
import React from "react";
import { withTiming } from "react-native-reanimated";
import { Colors } from "../../styles";
import { resetZoomState } from "../../utils";
import { useImageEditorContext } from "../imageEditor/useImageEditorContext";
import { Button } from "./Button";
export const FlipButtons = function () {
    const { flipX, flipY, zoom, imagePosition } = useImageEditorContext();
    const flipVertical = () => {
        resetZoomState(zoom, imagePosition);
        flipX.value = withTiming(flipX.value === 180 ? 0 : 180);
    };
    const flipHorizontal = () => {
        resetZoomState(zoom, imagePosition);
        flipY.value = withTiming(flipY.value === 180 ? 0 : 180);
    };
    return (<>
      <Button onPress={flipVertical}>
        <FlipVertical color={Colors.black}/>
      </Button>
      <Button onPress={flipHorizontal}>
        <FlipHorizontal color={Colors.black}/>
      </Button>
    </>);
};
//# sourceMappingURL=FlipButtons.js.map