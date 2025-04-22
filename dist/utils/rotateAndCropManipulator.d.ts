import { ActionCrop } from 'expo-image-manipulator';
import { SharedValue } from 'react-native-reanimated';
type Props = {
    image: string;
    rotate: SharedValue<number>;
    flipX: SharedValue<number>;
    flipY: SharedValue<number>;
    cropData?: ActionCrop['crop'];
};
export declare const rotateAndCropManipulator: ({ image, rotate, flipX, flipY, cropData, }: Props) => Promise<import("expo-image-manipulator").ImageResult>;
export {};
//# sourceMappingURL=rotateAndCropManipulator.d.ts.map