import * as FileSystem from "expo-file-system";
import { Dispatch, SetStateAction } from "react";
import { SavedImageInfo } from "../types";

type Props = {
  setDimensions: Dispatch<SetStateAction<SavedImageInfo>>;
  setImage: Dispatch<SetStateAction<string | null>>;
  setShowEditor: Dispatch<SetStateAction<boolean>>;
};

export type SaveCroppedImageProps = {
  uri: string;
  width: number;
  height: number;
  rotate: number;
};

export const createSaveCroppedImage = function ({
  setDimensions,
  setImage,
  setShowEditor,
}: Props) {
  return async function saveCroppedImage({
    uri,
    width,
    height,
    rotate,
  }: SaveCroppedImageProps) {
    const fileName = `cropped_image_${Date.now()}.png`;
    const newUri = `${FileSystem.documentDirectory}${fileName}`;

    await FileSystem.copyAsync({
      from: uri,
      to: newUri,
    });

    setImage(newUri);
    setShowEditor(false);
    setDimensions({ width, height, rotate });
  };
};
