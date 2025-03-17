import { SharedValue } from 'react-native-reanimated';
import { Dimensions, LayoutDimensions, Position } from '../types';
type Props = {
    image: string;
    imageLayout: LayoutDimensions;
    containerLayout: LayoutDimensions;
    exactImageDimensions: Dimensions;
    boxScale: SharedValue<Position>;
    boxPosition: SharedValue<Position>;
    imagePosition: SharedValue<Position>;
    zoom: SharedValue<number>;
    focalPoint: SharedValue<Position>;
};
export declare const getCropData: ({ image, imageLayout, containerLayout, exactImageDimensions, boxScale, boxPosition, imagePosition, zoom, focalPoint, }: Props) => Promise<{
    originX: number;
    originY: number;
    width: number;
    height: number;
}>;
export {};
//# sourceMappingURL=getCropData.d.ts.map