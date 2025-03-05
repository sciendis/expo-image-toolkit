import { Poppins_400Regular, useFonts } from "@expo-google-fonts/poppins";
import React from "react";
import { ImageEditorContainer } from "./ImageEditorContainer";
import { ImageEditorProvider } from "./ImageEditorProvider";
export const ImageEditor = function ({ image, onCrop, onCancel, userConfig, }) {
    const [fontsLoaded] = useFonts({ Poppins_400Regular });
    if (!fontsLoaded)
        return null;
    if (!image || !fontsLoaded)
        return <></>;
    return (<ImageEditorProvider image={image} userConfig={userConfig}>
      <ImageEditorContainer onCancel={onCancel} onCrop={onCrop}/>
    </ImageEditorProvider>);
};
//# sourceMappingURL=ImageEditor.js.map