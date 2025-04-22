import { SharedValue } from 'react-native-reanimated';
import { Dimensions, Position } from '../types';
type Props = {
    boxScale: SharedValue<Position>;
    boxPosition: SharedValue<Position>;
    dimensions: Dimensions;
};
export declare const isCropFrameChanged: ({ boxScale, boxPosition, dimensions: { initialCropFramePosition, initialCropFrameScale }, }: Props) => boolean;
export {};
//# sourceMappingURL=isCropFrameChanged.d.ts.map