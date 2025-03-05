import { useImageEditorContext } from "@/components/imageEditor/useImageEditorContext";
import { Position } from "@/types";
import { clamp, getBoundingLimitation } from "@/utils";
import { Gesture } from "react-native-gesture-handler";
import { useSharedValue, withTiming } from "react-native-reanimated";

export const useZoomGesture = function () {
  const { zoom, focalPoint, imagePosition, exactImageDimensions, config } =
    useImageEditorContext();
  const { minZoom, maxZoom } = config;

  const prevImagePosition = useSharedValue<Position>({ x: 0, y: 0 });
  const prevZoom = useSharedValue(1);
  const prevFocalPoint = useSharedValue({ x: 0, y: 0 });

  const moveGesture = Gesture.Pan()
    .onBegin(() => (prevImagePosition.value = { ...imagePosition.value }))
    .onUpdate((e) => {
      const { minX, maxX, minY, maxY } = getBoundingLimitation(
        exactImageDimensions,
        zoom,
        focalPoint
      );

      const newX = prevImagePosition.value.x + e.translationX;
      const newY = prevImagePosition.value.y + e.translationY;

      imagePosition.value = {
        x: clamp(newX, minX, maxX),
        y: clamp(newY, minY, maxY),
      };
    });

  const zoomGesturePinch = Gesture.Pinch()
    .onStart(() => {
      prevZoom.value = zoom.value;
      prevFocalPoint.value = { ...focalPoint.value };
    })
    .onUpdate((event) => {
      const newScale = prevZoom.value * event.scale;
      const newZoom = clamp(newScale, minZoom, maxZoom);

      focalPoint.value = {
        x: prevZoom.value === 1 ? event.focalX : prevFocalPoint.value.x,
        y: prevZoom.value === 1 ? event.focalY : prevFocalPoint.value.y,
      };
      zoom.value = newZoom;

      const { minX, maxX, minY, maxY } = getBoundingLimitation(
        exactImageDimensions,
        zoom,
        focalPoint
      );

      imagePosition.value = {
        x: clamp(imagePosition.value.x, minX, maxX),
        y: clamp(imagePosition.value.y, minY, maxY),
      };
    });

  const zoomGestureTap = Gesture.Tap()
    .numberOfTaps(2)
    .onStart(() => {
      prevFocalPoint.value = { ...focalPoint.value };
    })
    .onEnd((event) => {
      const defZoom = 1;
      const zoomLvl2 = Math.floor(maxZoom / 2);

      const fx = event.x;
      const fy = event.y;

      let newZoom = zoom.value;
      if (zoom.value === defZoom) {
        newZoom = zoomLvl2;
        focalPoint.value = { x: fx, y: fy };
      } else {
        newZoom = defZoom;
      }

      zoom.value = withTiming(newZoom);
      prevZoom.value = newZoom;

      // reset image position on double tap zoom
      imagePosition.value = withTiming({ x: 0, y: 0 });
    });

  const combinedGestures = Gesture.Simultaneous(
    moveGesture,
    zoomGesturePinch,
    zoomGestureTap
  );

  return { zoomGesture: combinedGestures };
};
