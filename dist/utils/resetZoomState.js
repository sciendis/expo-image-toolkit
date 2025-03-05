import { withTiming } from "react-native-reanimated";
export const resetZoomState = function (zoom, imagePosition) {
    if (zoom.value === 1)
        return;
    zoom.value = withTiming(1);
    imagePosition.value = withTiming({ x: 0, y: 0 });
};
//# sourceMappingURL=resetZoomState.js.map