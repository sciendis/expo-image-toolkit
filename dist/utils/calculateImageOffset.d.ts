import { LayoutDimensions } from '../types';
export type CalculateImageOffsetProps = {
    image: string;
    imageLayout: LayoutDimensions;
};
export declare const calculateImageOffset: ({ image, imageLayout, }: CalculateImageOffsetProps) => Promise<{
    scaleX: number;
    scaleY: number;
    offsetX: number;
    offsetY: number;
    displayedImageWidth: number;
    displayedImageHeight: number;
}>;
//# sourceMappingURL=calculateImageOffset.d.ts.map