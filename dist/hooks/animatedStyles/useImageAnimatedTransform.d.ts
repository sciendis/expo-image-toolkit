/**
 * @description Provides two animated styles:
 * - `animatedStyleContainer`: Applies image rotation.
 * - `animatedStyleImage`: Applies zoom, pan (image position), focal zooming, and flip transformations.
 *
 * Handles correct positioning of the zoomed image relative to the focal point.
 * Rotation of ±180° inverts the coordinate axis, which is accounted for during transformation.
 */
export declare const useImageAnimatedTransform: () => {
    animatedStyleContainer: {
        transform: {
            rotate: string;
        }[];
    };
    animatedStyleImage: {
        transform: ({
            translateX: number;
            translateY?: undefined;
            scale?: undefined;
            rotateX?: undefined;
            rotateY?: undefined;
        } | {
            translateY: number;
            translateX?: undefined;
            scale?: undefined;
            rotateX?: undefined;
            rotateY?: undefined;
        } | {
            scale: number;
            translateX?: undefined;
            translateY?: undefined;
            rotateX?: undefined;
            rotateY?: undefined;
        } | {
            rotateX: string;
            translateX?: undefined;
            translateY?: undefined;
            scale?: undefined;
            rotateY?: undefined;
        } | {
            rotateY: string;
            translateX?: undefined;
            translateY?: undefined;
            scale?: undefined;
            rotateX?: undefined;
        })[];
    };
};
//# sourceMappingURL=useImageAnimatedTransform.d.ts.map