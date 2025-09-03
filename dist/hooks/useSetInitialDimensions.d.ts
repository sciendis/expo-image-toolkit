/**
 * @description This custom hook calculates the actual and displayed image dimensions, along with all necessary scales and offsets.
 * These values are needed for further calculations like zooming on a focal point, moving a zoomed image, and cropping.
 * The effect only runs on initial render or when a new image is generated. for example, after cropping or rotating the image by ±90/±270 degrees.
 */
export declare const useSetInitialDimensions: () => {
    isDeviceRotated: boolean;
};
//# sourceMappingURL=useSetInitialDimensions.d.ts.map