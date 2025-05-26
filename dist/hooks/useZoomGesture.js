import { Gesture } from 'react-native-gesture-handler';
import { useSharedValue, withTiming } from 'react-native-reanimated';
import { DefaultPositionState, MIN_ZOOM } from '../constants';
import { clamp, getBoundingLimitation } from '../utils';
import { useImageEditorContext } from './useImageEditorContext';
/**
 * @description Handles double-tap zoom and pinch-to-zoom gestures on the focal point, and merges them with the move gesture when zoom > 1.
 * This supports all interactions within the ZoomEditor.
 * Note: the ZoomRangeBar is handled by a separate hook and not included here.
 */
export const useZoomGesture = function () {
    const { zoom, focalPoint, imagePosition, dimensions: { displayedImageWidth, displayedImageHeight }, saveHistoryState, config: { maxZoom }, } = useImageEditorContext();
    const prevImagePosition = useSharedValue(DefaultPositionState);
    const prevZoom = useSharedValue(1);
    const prevFocalPoint = useSharedValue(DefaultPositionState);
    const moveGesture = Gesture.Pan()
        .onBegin(() => prevImagePosition.set(Object.assign({}, imagePosition.get())))
        .onUpdate((e) => {
        const { minX, maxX, minY, maxY } = getBoundingLimitation({ displayedImageWidth, displayedImageHeight }, zoom, focalPoint);
        const prevImgPosVal = prevImagePosition.get();
        const newX = prevImgPosVal.x + e.translationX;
        const newY = prevImgPosVal.y + e.translationY;
        imagePosition.set({
            x: clamp(newX, minX, maxX),
            y: clamp(newY, minY, maxY),
        });
    })
        .onEnd(() => {
        const { x: pIpX, y: pIpY } = prevImagePosition.get();
        const { x: ipX, y: ipY } = imagePosition.get();
        if (pIpX === ipX && pIpY === ipY)
            return;
        saveHistoryState({ imagePosition: prevImagePosition.get() });
    });
    const zoomGesturePinch = Gesture.Pinch()
        .onStart((event) => {
        const zoomVal = zoom.get();
        prevZoom.set(zoomVal);
        const fp = focalPoint.get();
        prevFocalPoint.set({ x: fp.x, y: fp.y });
        if (zoomVal === 1) {
            focalPoint.set({ x: event.focalX, y: event.focalY });
        }
    })
        .onUpdate((event) => {
        const prevZoomVal = prevZoom.get();
        const newScale = prevZoomVal * event.scale;
        const newZoom = clamp(newScale, MIN_ZOOM, maxZoom);
        zoom.set(newZoom);
        const { minX, maxX, minY, maxY } = getBoundingLimitation({ displayedImageWidth, displayedImageHeight }, zoom, focalPoint);
        imagePosition.set((prevPosVal) => ({
            x: clamp(prevPosVal.x, minX, maxX),
            y: clamp(prevPosVal.y, minY, maxY),
        }));
    })
        .onEnd(() => {
        const newZoom = zoom.get();
        const prevZoomVal = prevZoom.get();
        if (prevZoomVal === newZoom)
            return;
        saveHistoryState({ zoom: prevZoomVal });
    });
    const zoomGestureTap = Gesture.Tap()
        .numberOfTaps(2)
        .onEnd((event) => {
        const defZoom = 1;
        const zoomLvl2 = (maxZoom - defZoom) / 2 + defZoom;
        const fx = event.x;
        const fy = event.y;
        let newZoom = zoom.get();
        if (newZoom === defZoom) {
            saveHistoryState({ zoom: newZoom, focalPoint: { x: fx, y: fy } });
            newZoom = zoomLvl2;
            focalPoint.set({ x: fx, y: fy });
        }
        else {
            saveHistoryState({ zoom: newZoom });
            newZoom = defZoom;
        }
        zoom.set(withTiming(newZoom));
        prevZoom.set(newZoom);
        // reset image position on double tap zoom
        imagePosition.set(withTiming({ x: 0, y: 0 }));
    });
    const combinedGestures = Gesture.Simultaneous(moveGesture, zoomGesturePinch, zoomGestureTap);
    return combinedGestures;
};
//# sourceMappingURL=useZoomGesture.js.map