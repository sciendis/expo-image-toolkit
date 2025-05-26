import { Gesture } from 'react-native-gesture-handler';
import { useAnimatedProps, useAnimatedReaction, useAnimatedStyle, useSharedValue, withTiming, } from 'react-native-reanimated';
import { MIN_ZOOM } from '../constants';
import { clamp, getBoundingLimitation } from '../utils';
import { useImageEditorContext } from './useImageEditorContext';
/**
 * @description Gesture handler for the ZoomRangeBar. Allows users to zoom between 1 and the maxZoom defined in the config (default is 10).
 * Also displays the current zoom level as text.
 *
 * If zoom is at 1x, the focal point resets to the center of the image.
 * Otherwise, the range bar continues zooming based on the last focal point
 * (set by pinch or double tap) until it resets back to 1x.
 *
 * @param props - An object containing:
 * - `currentX`: `SharedValue<number>` – Shared value that holds the current horizontal position of the zoom range pointer.
 * - `rangeLayout`: `LayoutDimensions` – Object representing the layout dimensions of the zoom range bar.
 *
 * @returns { moveRangeBar, styledRangeAnimated, animatedTextProps: animatedTextProps as Partial<AnimatedProps<TextInputProps>> } An object containing:
 * - `moveRangeBar`: `PanGesture` – Gesture handler to move the zoom range bar.
 * - `styledRangeAnimated`: `AnimatedStyle` – Animated style used to update the pointer’s position.
 * - `animatedTextProps`: `Partial<AnimatedProps<TextInputProps>>` – Animated props used to show the current zoom level as text.
 */
export const useMoveZoomRangeBar = function ({ currentX, rangeLayout }) {
    const { zoom, focalPoint, imagePosition, saveHistoryState, dimensions: { centerX, centerY, displayedImageWidth, displayedImageHeight }, config: { maxZoom }, } = useImageEditorContext();
    const startX = useSharedValue(0);
    const prevZoom = useSharedValue(1);
    const zoomRange = maxZoom - MIN_ZOOM;
    const pointerWidth = 20;
    const effectiveWidth = rangeLayout.width - pointerWidth;
    const calculateZoom = (currentPosition) => {
        'worklet';
        return MIN_ZOOM + (currentPosition / effectiveWidth) * zoomRange;
    };
    const calculatePosition = (currentZoom) => {
        'worklet';
        return ((currentZoom - MIN_ZOOM) / zoomRange) * effectiveWidth;
    };
    useAnimatedReaction(() => zoom.get(), (currentZoom) => {
        currentX.set(withTiming(calculatePosition(currentZoom), {
            duration: 100,
        }));
    }, [effectiveWidth]);
    const moveRangeBar = Gesture.Pan()
        .onBegin(() => {
        startX.set(currentX.get());
        const newZoom = zoom.get();
        prevZoom.set(newZoom);
        if (newZoom === 1)
            focalPoint.set({ x: centerX, y: centerY });
    })
        .onUpdate((e) => {
        const newXRangebar = startX.get() + e.translationX;
        const maxXRangeBar = Math.min(newXRangebar, effectiveWidth);
        const newX = Math.max(0, maxXRangeBar);
        currentX.set(newX);
        const newZoom = calculateZoom(newX);
        zoom.set(parseFloat(newZoom.toFixed(2)));
        const { minX, maxX, minY, maxY } = getBoundingLimitation({ displayedImageWidth, displayedImageHeight }, zoom, focalPoint);
        imagePosition.set((prevPos) => ({
            x: clamp(prevPos.x, minX, maxX),
            y: clamp(prevPos.y, minY, maxY),
        }));
    })
        .onEnd(() => {
        const newZoom = zoom.get();
        const prevZoomVal = prevZoom.get();
        if (prevZoomVal === newZoom)
            return;
        saveHistoryState({ zoom: prevZoomVal });
    });
    const styledRangeAnimated = useAnimatedStyle(() => {
        'worklet';
        return {
            left: currentX.get(),
        };
    });
    const animatedTextProps = useAnimatedProps(() => {
        'worklet';
        return {
            text: `${zoom.get().toFixed(2)}x`,
        };
    });
    return {
        moveRangeBar,
        styledRangeAnimated,
        animatedTextProps: animatedTextProps,
    };
};
//# sourceMappingURL=useMoveZoomRangeBar.js.map