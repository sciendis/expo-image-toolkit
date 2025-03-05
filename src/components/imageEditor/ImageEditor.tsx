import { UserConfig } from "@/types";
import { SaveCroppedImageProps } from "@/utils";
import { Poppins_400Regular, useFonts } from "@expo-google-fonts/poppins";
import React from "react";
import { ImageEditorContainer } from "./ImageEditorContainer";
import { ImageEditorProvider } from "./ImageEditorProvider";

export type ImageEditorProps = {
  image: string | null;
  onCancel: () => void;
  onCrop: (props: SaveCroppedImageProps) => void;
  userConfig?: UserConfig;
};

export const ImageEditor = function ({
  image,
  onCrop,
  onCancel,
  userConfig,
}: ImageEditorProps) {
  const [fontsLoaded] = useFonts({ Poppins_400Regular });

  if (!fontsLoaded) return null;

  if (!image || !fontsLoaded) return <></>;
  return (
    <ImageEditorProvider image={image} userConfig={userConfig}>
      <ImageEditorContainer onCancel={onCancel} onCrop={onCrop} />
    </ImageEditorProvider>
  );
};
