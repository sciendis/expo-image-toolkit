import { useState } from "react";
import { Modal } from "react-native";
import { DefaultDimensionState } from "../../constants";
import { createPickImageLibrary, createSaveCroppedImage, createTakePhotoCamera, } from "../../utils";
import { ImageEditor } from "./ImageEditor";
export const useImageEditor = function (userConfig) {
    const [originalImage, setOriginalImage] = useState(null);
    const [showEditor, setShowEditor] = useState(false);
    const [image, setImage] = useState(null);
    const [dimensions, setDimensions] = useState(Object.assign(Object.assign({}, DefaultDimensionState), { rotate: 0 }));
    const pickImage = createPickImageLibrary({ setOriginalImage, setShowEditor });
    const takePhoto = createTakePhotoCamera({ setOriginalImage, setShowEditor });
    const saveCroppedImage = createSaveCroppedImage({
        setDimensions,
        setImage,
        setShowEditor,
    });
    const onCancel = () => setShowEditor(false);
    const ImageEditorModal = () => (<Modal visible={showEditor} animationType="slide" onRequestClose={onCancel}>
      <ImageEditor image={originalImage} onCrop={saveCroppedImage} onCancel={onCancel} userConfig={userConfig}/>
    </Modal>);
    const calcAspectRatio = () => {
        const { width, height, rotate } = dimensions;
        const croppedDimensions = {
            width: (rotate % 180 === 90 ? height : width) || 150,
            height: (rotate % 180 === 90 ? width : height) || 150,
        };
        return croppedDimensions.width / croppedDimensions.height;
    };
    return {
        pickImage,
        image,
        aspectRatio: calcAspectRatio(),
        ImageEditorModal,
        takePhoto,
    };
};
//# sourceMappingURL=useImageEditor.js.map