import { SharedValue } from 'react-native-reanimated';
import { Dimensions, Position } from '../types';
import { EditorModes } from '../constants';
type Props = {
    dimensions: Dimensions;
    boxScale: SharedValue<Position>;
    boxPosition: SharedValue<Position>;
    imagePosition: SharedValue<Position>;
    zoom: SharedValue<number>;
    focalPoint: SharedValue<Position>;
    activeEditor: EditorModes;
};
/**
 * @description Calculates the cropping data for the zoomed and positioned image
 * based on the CropFrame-Scale/Position, zoom level, focal point, and image transformations.
 *
 * This is used in two cases:
 * - When the user presses the crop button (`CropImageButton`) to finish the crop.
 * - Inside `useSaveStateOnSwitch` when detecting the changes in the crop frame and user confirms the CropAlert.
 *
 *
 * @param param0 - An object containing:
 * - `dimensions`: `Dimensions` – Information about the image layout and scaling (scaleX, scaleY, centerX, etc.).
 * - `boxScale`: `SharedValue<Position>` – The current scale (width/height) of the CropFrame.
 * - `boxPosition`: `SharedValue<Position>` – The current position of the CropFrame.
 * - `imagePosition`: `SharedValue<Position>` – The current offset of the image itself.
 * - `zoom`: `SharedValue<number>` – The zoom scale applied to the image.
 * - `focalPoint`: `SharedValue<Position>` – The point at which the zoom is focused.
 *
 * @returns A `cropData` object containing:
 * - `originX`: `number` – The X coordinate of the crop box’s left axis in the actual image size.
 * - `originY`: `number` – The Y coordinate of the crop box’s top axis in the actual image size.
 * - `width`: `number` – The width of the cropped area in the actual image size.
 * - `height`: `number` – The height of the cropped area in the actual image size.
 */
export declare const getCropData: ({ dimensions: { scaleX, scaleY, centerX, centerY, imageWidth, imageHeight }, boxScale, boxPosition, imagePosition, zoom, focalPoint, activeEditor, }: Props) => {
    originX: number;
    originY: number;
    width: number;
    height: number;
};
export {};
//# sourceMappingURL=getCropData.d.ts.map