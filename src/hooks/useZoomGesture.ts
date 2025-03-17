import { Gesture } from 'react-native-gesture-handler';
import { useSharedValue, withTiming } from 'react-native-reanimated';
import { useImageEditorContext } from '../components/imageEditor/useImageEditorContext';
import { DefaultPositionState, MIN_ZOOM } from '../constants';
import { Position } from '../types';
import { clamp, getBoundingLimitation } from '../utils';

export const useZoomGesture = function () {
  const { zoom, focalPoint, imagePosition, exactImageDimensions, config } =
    useImageEditorContext();
  const { maxZoom } = config;

  const prevImagePosition = useSharedValue<Position>(DefaultPositionState);
  const prevZoom = useSharedValue(1);
  const prevFocalPoint = useSharedValue<Position>(DefaultPositionState);

  const moveGesture = Gesture.Pan()
    .onBegin(() => prevImagePosition.set({ ...imagePosition.get() }))
    .onUpdate((e) => {
      const { minX, maxX, minY, maxY } = getBoundingLimitation(
        exactImageDimensions,
        zoom,
        focalPoint
      );

      const prevImgPosVal = prevImagePosition.get();

      const newX = prevImgPosVal.x + e.translationX;
      const newY = prevImgPosVal.y + e.translationY;

      imagePosition.set({
        x: clamp(newX, minX, maxX),
        y: clamp(newY, minY, maxY),
      });
    });

  const zoomGesturePinch = Gesture.Pinch()
    .onStart(() => {
      prevZoom.set(zoom.get());
      prevFocalPoint.set({ ...focalPoint.get() });
    })
    .onUpdate((event) => {
      const prevZoomVal = prevZoom.get();
      const prevFocalPointVal = prevFocalPoint.get();

      const newScale = prevZoomVal * event.scale;
      const newZoom = clamp(newScale, MIN_ZOOM, maxZoom);

      focalPoint.set({
        x: prevZoomVal === 1 ? event.focalX : prevFocalPointVal.x,
        y: prevZoomVal === 1 ? event.focalY : prevFocalPointVal.y,
      });
      zoom.set(newZoom);

      const { minX, maxX, minY, maxY } = getBoundingLimitation(
        exactImageDimensions,
        zoom,
        focalPoint
      );

      imagePosition.set((prevPosVal) => ({
        x: clamp(prevPosVal.x, minX, maxX),
        y: clamp(prevPosVal.y, minY, maxY),
      }));
    });

  const zoomGestureTap = Gesture.Tap()
    .numberOfTaps(2)
    .onStart(() => {
      prevFocalPoint.set({ ...focalPoint.get() });
    })
    .onEnd((event) => {
      const defZoom = 1;
      const zoomLvl2 = (maxZoom - defZoom) / 2 + defZoom;

      const fx = event.x;
      const fy = event.y;

      let newZoom = zoom.get();
      if (newZoom === defZoom) {
        newZoom = zoomLvl2;
        focalPoint.set({ x: fx, y: fy });
      } else {
        newZoom = defZoom;
      }

      zoom.set(withTiming(newZoom));
      prevZoom.set(newZoom);

      // reset image position on double tap zoom
      imagePosition.set(withTiming({ x: 0, y: 0 }));
    });

  const combinedGestures = Gesture.Simultaneous(
    moveGesture,
    zoomGesturePinch,
    zoomGestureTap
  );

  return { zoomGesture: combinedGestures };
};
