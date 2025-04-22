export const getCropData = function ({ dimensions: { scaleX, scaleY, centerX, centerY, imageWidth, imageHeight }, boxScale, boxPosition, imagePosition, zoom, focalPoint, }) {
    const focalPointVal = focalPoint.get();
    const boxScaleVal = boxScale.get();
    const zoomVal = zoom.get();
    const imagePosVal = imagePosition.get();
    const boxPosVal = boxPosition.get();
    const croppedWidth = boxScaleVal.x * scaleX;
    const croppedHeight = boxScaleVal.y * scaleY;
    // calculate the offset from the center caused by zooming on a focal point
    const focalOffsetX = ((centerX - focalPointVal.x) * (zoomVal - 1)) / zoomVal;
    const focalOffsetY = ((centerY - focalPointVal.y) * (zoomVal - 1)) / zoomVal;
    // calculate position covered image by cropFrame
    const relativeScaleX = centerX * (1 - 1 / zoomVal);
    const relativeScaleY = centerY * (1 - 1 / zoomVal);
    const relativeOffsetX = boxPosVal.x - imagePosVal.x;
    const relativeOffsetY = boxPosVal.y - imagePosVal.y;
    const relativeX = relativeOffsetX / zoomVal - focalOffsetX + relativeScaleX;
    const relativeY = relativeOffsetY / zoomVal - focalOffsetY + relativeScaleY;
    const cropData = {
        originX: relativeX * scaleX,
        originY: relativeY * scaleY,
        width: Math.min(croppedWidth / zoomVal, imageWidth),
        height: Math.min(croppedHeight / zoomVal, imageHeight),
    };
    return cropData;
};
//# sourceMappingURL=getCropData.js.map