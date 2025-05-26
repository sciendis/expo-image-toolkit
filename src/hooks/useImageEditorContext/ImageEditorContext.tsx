import { createContext, Dispatch, RefObject, SetStateAction } from 'react';
import { View } from 'react-native';
import { SharedValue } from 'react-native-reanimated';
import { EditorModes } from '../../constants';
import { Config, Dimensions, Position } from '../../types';

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

type ImageEditorContextType = {
  config: Config;

  image: string;
  setImage: Dispatch<SetStateAction<string>>;
  imageRef: RefObject<View>;
  dimensions: Dimensions;
  setDimensions: Dispatch<SetStateAction<Dimensions>>;

  boxScale: SharedValue<Position>;
  boxPosition: SharedValue<Position>;

  rotate: SharedValue<number>;
  previousRotate: number;
  setPreviousRotate: Dispatch<SetStateAction<number>>;
  flipX: SharedValue<number>;
  flipY: SharedValue<number>;
  zoom: SharedValue<number>;
  focalPoint: SharedValue<Position>;
  imagePosition: SharedValue<Position>;

  activeEditor: EditorModes;
  setActiveEditor: Dispatch<SetStateAction<EditorModes>>;

  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  isSaving: boolean;
  setIsSaving: Dispatch<SetStateAction<boolean>>;

  undo: () => void;
  redo: () => void;
  undoStack: EditorStateSnapshot[];
  redoStack: EditorStateSnapshot[];
  saveHistoryState: (snapshotValue?: Partial<EditorStateSnapshot>) => void;
  isUndoRedoUpdated: React.MutableRefObject<boolean>;
};

export const ImageEditorContext = createContext<
  ImageEditorContextType | undefined
>(undefined);
