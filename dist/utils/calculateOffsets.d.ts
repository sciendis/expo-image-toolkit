import { LayoutDimensions } from "../types";
type Props = {
    imageLayout: LayoutDimensions;
    imageAspectRatio: number;
    viewAspectRatio: number;
    width: number;
    height: number;
};
export declare const calculateOffsets: ({ imageLayout, imageAspectRatio, viewAspectRatio, width, height, }: Props) => {
    scaleX: number;
    scaleY: number;
    offsetX: number;
    offsetY: number;
    displayedImageWidth: number;
    displayedImageHeight: number;
};
export {};
//# sourceMappingURL=calculateOffsets.d.ts.map