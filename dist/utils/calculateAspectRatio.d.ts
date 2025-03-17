import { LayoutDimensions } from '../types';
type Props = {
    image: string;
    imageLayout: LayoutDimensions;
};
export declare const calculateAspectRatio: ({ image, imageLayout, }: Props) => Promise<{
    imageAspectRatio: number;
    viewAspectRatio: number;
    width: number;
    height: number;
}>;
export {};
//# sourceMappingURL=calculateAspectRatio.d.ts.map