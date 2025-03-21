var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { calculateImageOffset } from './calculateImageOffset';
export const getCropData = function ({ image, imageLayout, containerLayout, exactImageDimensions, boxScale, boxPosition, imagePosition, zoom, focalPoint, }) {
    return __awaiter(this, void 0, void 0, function* () {
        const { scaleX, scaleY } = yield calculateImageOffset({
            image,
            imageLayout,
        });
        const focalPointVal = focalPoint.get();
        const boxScaleVal = boxScale.get();
        const zoomVal = zoom.get();
        const imagePosVal = imagePosition.get();
        const boxPosVal = boxPosition.get();
        const croppedWidth = boxScaleVal.x * scaleX;
        const croppedHeight = boxScaleVal.y * scaleY;
        // calculate the center of the image
        const imageCenterX = exactImageDimensions.width / 2;
        const imageCenterY = exactImageDimensions.height / 2;
        // calculate the offset from the center caused by zooming on a focal point
        const focalOffsetX = ((imageCenterX - focalPointVal.x) * (zoomVal - 1)) / zoomVal;
        const focalOffsetY = ((imageCenterY - focalPointVal.y) * (zoomVal - 1)) / zoomVal;
        // calculate position covered image by cropFrame
        const relativeScaleX = imageCenterX * (1 - 1 / zoomVal);
        const relativeScaleY = imageCenterY * (1 - 1 / zoomVal);
        const relativeOffsetX = boxPosVal.x - containerLayout.x - imagePosVal.x;
        const relativeOffsetY = boxPosVal.y - containerLayout.y - imagePosVal.y;
        const relativeX = relativeOffsetX / zoomVal - focalOffsetX + relativeScaleX;
        const relativeY = relativeOffsetY / zoomVal - focalOffsetY + relativeScaleY;
        const cropData = {
            originX: relativeX * scaleX,
            originY: relativeY * scaleY,
            width: croppedWidth / zoomVal,
            height: croppedHeight / zoomVal,
        };
        return cropData;
    });
};
//# sourceMappingURL=getCropData.js.map