import { withTiming } from 'react-native-reanimated';
export const resetZoomState = function (zoom, imagePosition) {
    if (zoom.get() === 1)
        return;
    zoom.set(withTiming(1));
    imagePosition.set(withTiming({ x: 0, y: 0 }));
};
//# sourceMappingURL=resetZoomState.js.map