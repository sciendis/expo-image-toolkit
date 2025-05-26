/**
 * Detect if the CropFrame has been changed by the user or not, by comparing the current CropFrame-Position/Scale
 * with the initial-Position/Scale, and checking if the scale or position has changed.
 *
 * @param props - An object containing:
 * - `boxScale`: `SharedValue<Position>` – The current scale of the CropFrame.
 * - `boxPosition`: `SharedValue<Position>` – The current position of the CropFrame.
 * - `dimensions`: `Dimensions` – The initial crop frame position and scale used for comparison.
 *
 * @returns `boolean` – Returns `true` if the CropFrame has been changed by the user.
 */
export const isCropFrameChanged = function ({ boxScale, boxPosition, dimensions: { initialCropFramePosition, initialCropFrameScale }, }) {
    const initBoxScaleVal = initialCropFrameScale;
    const initBoxPosVal = initialCropFramePosition;
    const boxScaleVal = boxScale.get();
    const boxPosVal = boxPosition.get();
    const initScaleX = Math.round(initBoxScaleVal.x);
    const initScaleY = Math.round(initBoxScaleVal.y);
    const initPosX = Math.round(initBoxPosVal.x);
    const initPosY = Math.round(initBoxPosVal.y);
    const curScaleX = Math.round(boxScaleVal.x);
    const curScaleY = Math.round(boxScaleVal.y);
    const curPosX = Math.round(boxPosVal.x);
    const curPosY = Math.round(boxPosVal.y);
    const isScaleChanged = curScaleX !== initScaleX || curScaleY !== initScaleY;
    const isPositionChanged = curPosX !== initPosX || curPosY !== initPosY;
    const isValidScale = curScaleX !== 0 && curScaleY !== 0;
    return isValidScale && (isScaleChanged || isPositionChanged);
};
//# sourceMappingURL=isCropFrameChanged.js.map