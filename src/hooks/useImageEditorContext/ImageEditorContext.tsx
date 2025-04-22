import { createContext, Dispatch, RefObject, SetStateAction } from 'react';
import { View } from 'react-native';
import { SharedValue } from 'react-native-reanimated';
import { EditorModes } from '../../constants';
import { Config, Dimensions, Position } from '../../types';

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

  isSaving: boolean;
  setIsSaving: Dispatch<SetStateAction<boolean>>;
};

export const ImageEditorContext = createContext<
  ImageEditorContextType | undefined
>(undefined);
