import React from 'react';
import { EditorModes } from '../../constants';
type Props = {
    activeEditor: EditorModes;
};
/**
 * @description Renders the currently edited image and displays applied transformations
 * such as (zoom/crop/rotate).
 *
 * It also manages container overflow visibility depending on the zoom level:
 * - Overflow is hidden when zoom > 1 to avoid showing out-of-bound content.
 * - Overflow is visible when zoom === 1. This is essential for rotated images
 *   (±90°/±270°), where width and height are swapped. In such cases, zoom is reset
 *   to 1 to correctly recalculate dimensions and preserve accurate focal zooming.
 *
 * @param {EditorModes} activeEditor - The current active editor mode (Zoom/Crop/Rotate).
 */
export declare const RenderActiveImage: ({ activeEditor }: Props) => React.JSX.Element;
export {};
//# sourceMappingURL=RenderActiveImage.d.ts.map