import { SharedValue } from 'react-native-reanimated';
import { Dimensions, Position } from '../types';
type Props = {
    dimensions: Dimensions;
    boxScale: SharedValue<Position>;
    boxPosition: SharedValue<Position>;
    imagePosition: SharedValue<Position>;
    zoom: SharedValue<number>;
    focalPoint: SharedValue<Position>;
};
export declare const getCropData: ({ dimensions: { scaleX, scaleY, centerX, centerY, imageWidth, imageHeight }, boxScale, boxPosition, imagePosition, zoom, focalPoint, }: Props) => {
    originX: number;
    originY: number;
    width: number;
    height: number;
};
export {};
//# sourceMappingURL=getCropData.d.ts.map