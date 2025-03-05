import { createContext, Dispatch, RefObject, SetStateAction } from "react";
import { View } from "react-native";
import { SharedValue } from "react-native-reanimated";
import { EditorModes } from "../../constants";
import { Config, Dimensions, LayoutDimensions, Position } from "../../types";

type ImageEditorContextType = {
  config: Config;

  image: string;
  setImage: Dispatch<SetStateAction<string>>;
  imageRef: RefObject<View>;

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

  offset: Position;
  setOffset: Dispatch<SetStateAction<Position>>;

  containerLayout: LayoutDimensions;
  setContainerLayout: Dispatch<SetStateAction<LayoutDimensions>>;
  imageLayout: LayoutDimensions;
  setImageLayout: Dispatch<SetStateAction<LayoutDimensions>>;

  activeEditor: EditorModes | null;
  setActiveEditor: Dispatch<SetStateAction<EditorModes | null>>;

  isSaving: boolean;
  setIsSaving: Dispatch<SetStateAction<boolean>>;

  exactImageDimensions: Dimensions;
  setExactImageDimensions: Dispatch<SetStateAction<Dimensions>>;
};

export const ImageEditorContext = createContext<
  ImageEditorContextType | undefined
>(undefined);
