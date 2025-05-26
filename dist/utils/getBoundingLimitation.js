/**
 * @description Calculates the bounding limits (min/max on each axis) of a zoomed image inside its layout container.
 * This is used in the Zoom Gesture Handler. When an image is zoomed, it becomes larger than its original layout dimensions
 * and may overflow its container. This overflow should be accessible. users must be able to move the zoomed image to explore hidden areas.
 * However, we also need to restrict how far the image can be moved to prevent dragging it completely outside the visible container.
 * This function calculates these limits based on the zoom level and focal point, so that the image remains within visible bounds.
 *
 * @param param0 - An object containing:
 * - `displayedImageWidth`: `number` – The rendered width of the image in the layout.
 * - `displayedImageHeight`: `number` – The rendered height of the image in the layout.
 * @param zoom - `SharedValue<number>` – The current zoom scale of the image.
 * @param focalPoint - `SharedValue<Position>` – The point where the zoom is focused (used to center movement constraints).
 *
 * @returns An object containing `minX`, `maxX`, `minY`, and `maxY` values that define the movement bounds of the zoomed image.
 */
export const getBoundingLimitation = function ({ displayedImageWidth, displayedImageHeight, }, zoom, focalPoint) {
    'worklet';
    const fp = focalPoint.get();
    const z = zoom.get();
    const w = displayedImageWidth;
    const h = displayedImageHeight;
    const sw = w * z;
    const sh = h * z;
    const focalRatioX = fp.x / w;
    const focalRatioY = fp.y / h;
    const offsetX = (sw - w) * focalRatioX;
    const offsetY = (sh - h) * focalRatioY;
    const minX = w - sw + offsetX;
    const maxX = offsetX;
    const minY = h - sh + offsetY;
    const maxY = offsetY;
    return { minX, maxX, minY, maxY };
};
//# sourceMappingURL=getBoundingLimitation.js.map