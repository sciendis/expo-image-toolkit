import { SharedValue } from 'react-native-reanimated';
import { Dimensions, Position } from '../types';
type Props = {
    boxScale: SharedValue<Position>;
    boxPosition: SharedValue<Position>;
    dimensions: Dimensions;
};
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
export declare const isCropFrameChanged: ({ boxScale, boxPosition, dimensions: { initialCropFramePosition, initialCropFrameScale }, }: Props) => boolean;
export {};
//# sourceMappingURL=isCropFrameChanged.d.ts.map