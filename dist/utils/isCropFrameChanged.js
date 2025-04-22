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