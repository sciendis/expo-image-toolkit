import { Gesture } from 'react-native-gesture-handler';
import { useSharedValue, withTiming } from 'react-native-reanimated';
import { DefaultPositionState, MIN_ZOOM } from '../constants';
import { clamp, getBoundingLimitation } from '../utils';
import { useImageEditorContext } from './useImageEditorContext';
export const useZoomGesture = function () {
    const { zoom, focalPoint, imagePosition, dimensions: { displayedImageWidth, displayedImageHeight }, config: { maxZoom }, } = useImageEditorContext();
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
            newZoom = zoomLvl2;
            focalPoint.set({ x: fx, y: fy });
        }
        else {
            newZoom = defZoom;
        }
        zoom.set(withTiming(newZoom));
        prevZoom.set(newZoom);
        // reset image position on double tap zoom
        imagePosition.set(withTiming({ x: 0, y: 0 }));
    });
    const combinedGestures = Gesture.Simultaneous(moveGesture, zoomGesturePinch, zoomGestureTap);
    return { zoomGesture: combinedGestures };
};
//# sourceMappingURL=useZoomGesture.js.map