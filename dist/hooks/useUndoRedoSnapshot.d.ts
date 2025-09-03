/// <reference types="react" />
import { ImageEditorContextType } from '../components/imageEditor/ImageEditorContext';
import { EditorModes } from '../constants';
import { Dimensions, Position } from '../types';
type EditorStateSnapshot = {
    image: string;
    rotate: number;
    previousRotate: number;
    flipX: number;
    flipY: number;
    zoom: number;
    focalPoint: Position;
    imagePosition: Position;
    boxScale: Position;
    boxPosition: Position;
    dimensions: Dimensions;
    activeEditor: EditorModes;
};
type Props = Pick<ImageEditorContextType, 'image' | 'setImage' | 'rotate' | 'previousRotate' | 'setPreviousRotate' | 'flipX' | 'flipY' | 'zoom' | 'focalPoint' | 'imagePosition' | 'boxScale' | 'boxPosition' | 'dimensions' | 'setDimensions' | 'activeEditor' | 'setActiveEditor' | 'setIsLoading'>;
/**
 * @description A custom hook that manages undo and redo functionality for the image editor,
 * maintaining a history of editor actions, including crop frame adjustments, image cropping, zooming, moving zoomed images, rotation, and flipping.
 *
 * @param props - Parameters:
 * - `image`: `string` – The current image URI.
 * - `setImage`: `React.Dispatch<React.SetStateAction<string>>` – Setter for updating the image URI.
 * - `rotate`: `SharedValue<number>` – Animated value for the image rotation angle.
 * - `previousRotate`: `number` – The rotation angle from the last saved state when a new image is generated at ±90/±270 degrees.
 * - `setPreviousRotate`: `React.Dispatch<React.SetStateAction<number>>` – Setter for updating previousRotate.
 * - `flipX`: `SharedValue<number>` – Animated value for horizontal flip angle.
 * - `flipY`: `SharedValue<number>` – Animated value for vertical flip angle.
 * - `zoom`: `SharedValue<number>` – Animated value for the zoom level.
 * - `focalPoint`: `SharedValue<Position>` – Animated position of the focal point.
 * - `imagePosition`: `SharedValue<Position>` – Animated position of the image.
 * - `boxScale`: `SharedValue<Position>` – Animated dimensions (width and height) of the crop frame.
 * - `boxPosition`: `SharedValue<Position>` – Animated top-left position of the crop frame.
 * - `dimensions`: `Dimensions` – Dimensions of the editor, including image and layout sizes.
 * - `setDimensions`: `React.Dispatch<React.SetStateAction<Dimensions>>` – Setter for updating dimensions.
 * - `activeEditor`: `EditorModes` – The currently active editor mode (Crop/Zoom/Rotate).
 * - `setActiveEditor`: `React.Dispatch<React.SetStateAction<EditorModes>>` – Setter for updating the active editor mode.
 *
 * @remarks Props are passed directly from ImageEditorProvider rather than accessed via ImageEditorContext to ensure initial availability.
 *
 * @returns An object containing:
 * - `undo`: `() => void` – Reverts to the previous editor state.
 * - `redo`: `() => void` – Restores the next editor state.
 * - `undoStack`: `EditorStateSnapshot[]` – Array of previous editor state snapshots.
 * - `redoStack`: `EditorStateSnapshot[]` – Array of redoable editor state snapshots.
 * - `saveHistoryState`: `(snapshotValue?: Partial<EditorStateSnapshot>) => void` – Worklet function to save the current editor state to the undo stack.
 * - `isUndoRedoUpdated`: `React.MutableRefObject<boolean>` – Indicates if an undo/redo operation is in progress,
 * preventing unnecessary dimension recalculations when restoring a state with saved dimensions.
 */
export declare const useUndoRedoSnapshot: ({ image, setImage, rotate, previousRotate, setPreviousRotate, flipX, flipY, zoom, focalPoint, imagePosition, boxScale, boxPosition, dimensions, setDimensions, activeEditor, setActiveEditor, setIsLoading, }: Props) => {
    undo: () => void;
    redo: () => void;
    undoStack: EditorStateSnapshot[];
    redoStack: EditorStateSnapshot[];
    saveHistoryState: (snapshotValue?: Partial<EditorStateSnapshot>) => void;
    isUndoRedoUpdated: import("react").MutableRefObject<boolean>;
    clearUndoRedoStack: () => void;
};
export {};
//# sourceMappingURL=useUndoRedoSnapshot.d.ts.map