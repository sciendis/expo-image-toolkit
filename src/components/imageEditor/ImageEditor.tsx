import { Poppins_400Regular, useFonts } from "@expo-google-fonts/poppins";
import { SaveCroppedImageProps } from "@/utils";
import React from "react";
import { ImageEditorContainer } from "./ImageEditorContainer";
import { ImageEditorProvider } from "./ImageEditorProvider";

export type ImageEditorProps = {
  image: string | null;
  onCancel: () => void;
  onCrop: (props: SaveCroppedImageProps) => void;
};

export const ImageEditor = function ({
  image,
  onCrop,
  onCancel,
}: ImageEditorProps) {
  const [fontsLoaded] = useFonts({ Poppins_400Regular });

  if (!fontsLoaded) return null;

  if (!image || !fontsLoaded) return <></>;
  return (
    <ImageEditorProvider image={image}>
      <ImageEditorContainer onCancel={onCancel} onCrop={onCrop} />
    </ImageEditorProvider>
  );
};
