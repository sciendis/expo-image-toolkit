import { EditorModes } from '../../constants';
/**
 * @description Controls the overflow behavior based on the zoom level:
 * - Overflow is hidden when the zoom value is greater than 1.
 * - Overflow is visible when the zoom value is exactly 1.
 *
 * This logic is important for the RotateEditor. When the image is rotated ±90° or ±270°,
 * the width and height swap, and the zoom is reset to 1 to maintain correct dimensions.
 * Without resetting zoom and making overflow visible, the image would be cropped or distorted
 * due to misaligned focal zoom calculations.
 *
 * @param activeEditor - The currently active editor mode.
 * @returns Animated style that sets the correct overflow.
 */
export declare const useImageAnimatedOverflow: (activeEditor: EditorModes) => {
    overflow: "visible" | "hidden";
};
//# sourceMappingURL=useImageAnimatedOverflow.d.ts.map