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
import { useCallback } from "react";
import { useImageEditorContext } from "../components/imageEditor/useImageEditorContext";
export const useSaveStateOnSwitchEditor = function () {
    const { rotate, zoom, image, setImage, setPreviousRotate, flipX, flipY } = useImageEditorContext();
    return useCallback(() => __awaiter(this, void 0, void 0, function* () {
        const actions = [];
        const format = { format: SaveFormat.PNG };
        if (rotate.value !== 0 && rotate.value !== 360)
            actions.push({ rotate: rotate.value });
        if (flipX.value === 180)
            actions.push({ flip: FlipType.Vertical });
        if (flipY.value === 180)
            actions.push({ flip: FlipType.Horizontal });
        if (!actions.length)
            return false;
        try {
            const result = yield manipulateAsync(image, actions, format);
            setImage(result.uri);
        }
        catch (error) {
            console.error("Error saving rotated image:", error);
        }
        // Reset rest values
        setPreviousRotate((prev) => (prev + rotate.value) % 360);
        rotate.value = 0;
        flipX.value = 0;
        flipY.value = 0;
        return true;
    }), 
    // Using all dependencies causes unexpected behavior.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [rotate.value, flipX.value, flipY.value, zoom.value]);
};
//# sourceMappingURL=useSaveStateOnSwitchEditor.js.map