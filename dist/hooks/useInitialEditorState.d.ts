/**
 * @description Calculates min/max bounds and size for the CropFrame.
 *
 * - Provides `minX`, `maxX`, `minY`, `maxY` to limit frame movement within the CropFrame.
 * - Also returns `minWidth` and `minHeight` to enforce minimum frame size during resizing.
 *
 * These values depend on editor layout dimensions and configured CropFrame offset.
 */
export declare const useInitialEditorState: () => {
    minX: number;
    maxX: number;
    minY: number;
    maxY: number;
    minWidth: 100;
    minHeight: 100;
};
//# sourceMappingURL=useInitialEditorState.d.ts.map