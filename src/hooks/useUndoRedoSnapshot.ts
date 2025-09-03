import { useRef, useState } from 'react';
import { runOnJS } from 'react-native-reanimated';
import { ImageEditorContextType } from '../components/imageEditor/ImageEditorContext';
import { EditorModes } from '../constants';
import { Dimensions, Position } from '../types';
import { maybeWithTiming } from '../utils';

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

type Props = Pick<
  ImageEditorContextType,
  | 'image'
  | 'setImage'
  | 'rotate'
  | 'previousRotate'
  | 'setPreviousRotate'
  | 'flipX'
  | 'flipY'
  | 'zoom'
  | 'focalPoint'
  | 'imagePosition'
  | 'boxScale'
  | 'boxPosition'
  | 'dimensions'
  | 'setDimensions'
  | 'activeEditor'
  | 'setActiveEditor'
  | 'setIsLoading'
>;

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
export const useUndoRedoSnapshot = function ({
  image,
  setImage,
  rotate,
  previousRotate,
  setPreviousRotate,
  flipX,
  flipY,
  zoom,
  focalPoint,
  imagePosition,
  boxScale,
  boxPosition,
  dimensions,
  setDimensions,
  activeEditor,
  setActiveEditor,
  setIsLoading,
}: Props) {
  const [undoStack, setUndoStack] = useState<EditorStateSnapshot[]>([]);
  const [redoStack, setRedoStack] = useState<EditorStateSnapshot[]>([]);
  const isUndoRedoUpdated = useRef(false);

  const updateUndoStack = (snapshot: EditorStateSnapshot) => {
    setUndoStack((p) => [...p, snapshot]);
    setRedoStack([]); // clear redo stack
  };

  const clearUndoRedoStack = () => {
    setUndoStack([]);
    setRedoStack([]);
  };

  // save current state in undo stack
  const saveHistoryState = (snapshotValue?: Partial<EditorStateSnapshot>) => {
    'worklet';

    const snapshot: EditorStateSnapshot = {
      image,
      rotate: rotate.get(),
      previousRotate,
      flipX: flipX.get(),
      flipY: flipY.get(),
      zoom: zoom.get(),
      focalPoint: { ...focalPoint.get() },
      imagePosition: { ...imagePosition.get() },
      boxScale: { ...boxScale.get() },
      boxPosition: { ...boxPosition.get() },
      dimensions: { ...dimensions },
      activeEditor,
    };

    runOnJS(updateUndoStack)({ ...snapshot, ...snapshotValue });
  };

  const restorePreviousState = (state: EditorStateSnapshot) => {
    isUndoRedoUpdated.current = true;

    const isImageChanged = state.image !== image;
    if (isImageChanged) {
      setIsLoading('contents');
      setImage(state.image);
    }

    if (state.activeEditor !== activeEditor)
      setActiveEditor(state.activeEditor);

    setPreviousRotate(state.previousRotate);
    setDimensions({ ...state.dimensions });

    setTimeout(() => {
      rotate.set(maybeWithTiming(state.rotate, !isImageChanged));
      flipX.set(maybeWithTiming(state.flipX, !isImageChanged));
      flipY.set(maybeWithTiming(state.flipY, !isImageChanged));
      zoom.set(maybeWithTiming(state.zoom, !isImageChanged));
      focalPoint.set({ ...state.focalPoint });
      imagePosition.set(
        maybeWithTiming({ ...state.imagePosition }, !isImageChanged)
      );
      boxScale.set(maybeWithTiming({ ...state.boxScale }, !isImageChanged));
      boxPosition.set(
        maybeWithTiming({ ...state.boxPosition }, !isImageChanged)
      );
      isUndoRedoUpdated.current = false;
      if (isImageChanged) setTimeout(() => setIsLoading('none'), 200);
    }, 100);
  };

  const undo = () => {
    if (undoStack.length === 0) return;

    const state = undoStack[undoStack.length - 1];
    runOnJS(setUndoStack)((p) => p.slice(0, -1));

    setRedoStack((p) => [
      ...p,
      {
        image,
        rotate: rotate.get(),
        previousRotate,
        flipX: flipX.get(),
        flipY: flipY.get(),
        zoom: zoom.get(),
        focalPoint:
          zoom.get() === 1 ? { ...state.focalPoint } : { ...focalPoint.get() },
        imagePosition: { ...imagePosition.get() },
        boxScale: { ...boxScale.get() },
        boxPosition: { ...boxPosition.get() },
        dimensions: { ...dimensions },
        activeEditor,
      },
    ]);

    // restore previous state
    restorePreviousState(state);
  };

  const redo = () => {
    if (redoStack.length === 0) return;

    const state = redoStack[redoStack.length - 1];
    runOnJS(setRedoStack)((p) => p.slice(0, -1));

    setUndoStack((p) => [
      ...p,
      {
        image,
        rotate: rotate.get(),
        previousRotate,
        flipX: flipX.get(),
        flipY: flipY.get(),
        zoom: zoom.get(),
        focalPoint:
          zoom.get() === 1 ? { ...state.focalPoint } : { ...focalPoint.get() },
        imagePosition: { ...imagePosition.get() },
        boxScale: { ...boxScale.get() },
        boxPosition: { ...boxPosition.get() },
        dimensions: { ...dimensions },
        activeEditor,
      },
    ]);

    // restore next state
    restorePreviousState(state);
  };

  return {
    undo,
    redo,
    undoStack,
    redoStack,
    saveHistoryState,
    isUndoRedoUpdated,
    clearUndoRedoStack,
  };
};
