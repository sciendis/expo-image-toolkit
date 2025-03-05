var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { FlipType, manipulateAsync, SaveFormat, } from "expo-image-manipulator";
import { useImageEditorContext } from "../components/imageEditor/useImageEditorContext";
import { calculateImageOffset } from "../utils";
export const useCropImage = function ({ onCrop }) {
    const { imageLayout, containerLayout, image, boxPosition, boxScale, zoom, rotate, flipX, flipY, setIsSaving, focalPoint, imagePosition, exactImageDimensions, } = useImageEditorContext();
    const cropImage = () => __awaiter(this, void 0, void 0, function* () {
        if (imageLayout.width <= 0 || imageLayout.height <= 0)
            return;
        setIsSaving(true);
        const actions = [];
        const format = { format: SaveFormat.PNG };
        const { scaleX, scaleY } = yield calculateImageOffset({
            image,
            imageLayout,
        });
        const croppedWidth = boxScale.value.x * scaleX;
        const croppedHeight = boxScale.value.y * scaleY;
        // calculate the center of the image
        const imageCenterX = exactImageDimensions.width / 2;
        const imageCenterY = exactImageDimensions.height / 2;
        // calculate the offset from the center caused by zooming on a focal point
        const focalOffsetX = ((imageCenterX - focalPoint.value.x) * (zoom.value - 1)) / zoom.value;
        const focalOffsetY = ((imageCenterY - focalPoint.value.y) * (zoom.value - 1)) / zoom.value;
        // calculate position covered image by cropFrame
        const relativeScaleX = imageCenterX * (1 - 1 / zoom.value);
        const relativeScaleY = imageCenterY * (1 - 1 / zoom.value);
        const relativeOffsetX = boxPosition.value.x - containerLayout.x - imagePosition.value.x;
        const relativeOffsetY = boxPosition.value.y - containerLayout.y - imagePosition.value.y;
        const relativeX = relativeOffsetX / zoom.value - focalOffsetX + relativeScaleX;
        const relativeY = relativeOffsetY / zoom.value - focalOffsetY + relativeScaleY;
        const cropData = {
            originX: relativeX * scaleX,
            originY: relativeY * scaleY,
            width: croppedWidth / zoom.value,
            height: croppedHeight / zoom.value,
        };
        actions.push({ crop: cropData });
        if (rotate.value !== 0)
            actions.push({ rotate: rotate.value });
        if (flipX.value === 180)
            actions.push({ flip: FlipType.Vertical });
        if (flipY.value === 180)
            actions.push({ flip: FlipType.Horizontal });
        try {
            const result = yield manipulateAsync(image, actions, format);
            onCrop({
                uri: result.uri,
                width: croppedWidth,
                height: croppedHeight,
                rotate: rotate.value,
            });
        }
        catch (error) {
            console.error("Wrong Crop Data:", error);
        }
    });
    return cropImage;
};
//# sourceMappingURL=useCropImage.js.map