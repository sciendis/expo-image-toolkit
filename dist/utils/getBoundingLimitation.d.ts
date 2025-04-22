import { SharedValue } from 'react-native-reanimated';
import { Dimensions, Position } from '../types';
export declare const getBoundingLimitation: ({ displayedImageWidth, displayedImageHeight, }: Pick<Dimensions, 'displayedImageWidth' | 'displayedImageHeight'>, zoom: SharedValue<number>, focalPoint: SharedValue<Position>) => {
    minX: number;
    maxX: number;
    minY: number;
    maxY: number;
};
//# sourceMappingURL=getBoundingLimitation.d.ts.map