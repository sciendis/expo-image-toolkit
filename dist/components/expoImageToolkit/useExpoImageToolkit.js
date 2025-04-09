import { useState } from 'react';
import { DefaultDimensionState } from '../../constants';
import { createPickImageLibrary, createSaveCroppedImage, createTakePhotoCamera, } from '../../utils';
import { useExpoImageToolkitContext } from './useExpoImageToolkitContext';
export const useExpoImageToolkit = function (userConfig) {
    const [editedImageUri, setEditedImageUri] = useState(null);
    const [dimensions, setDimensions] = useState(Object.assign(Object.assign({}, DefaultDimensionState), { rotate: 0 }));
    const { showEditor, hideEditor } = useExpoImageToolkitContext();
    const saveCroppedImage = createSaveCroppedImage({
        setDimensions,
        onCrop: (editedUri) => {
            if (editedUri)
                setEditedImageUri(editedUri);
            hideEditor();
        },
    });
    const pickImage = createPickImageLibrary({
        acceptedFormats: userConfig === null || userConfig === void 0 ? void 0 : userConfig.acceptedFormats,
        onImageSelected: (originalUri) => {
            setEditedImageUri(null);
            showEditor(originalUri, saveCroppedImage, userConfig);
        },
    });
    const takePhoto = createTakePhotoCamera({
        onImageSelected: (originalUri) => {
            setEditedImageUri(null);
            showEditor(originalUri, saveCroppedImage, userConfig);
        },
    });
    const { width, height, rotate } = dimensions;
    const croppedDimensions = {
        width: (rotate % 180 === 90 ? height : width) || 250,
        height: (rotate % 180 === 90 ? width : height) || 250,
    };
    const aspectRatio = width / height;
    return Object.assign({ pickImage,
        editedImageUri,
        aspectRatio,
        takePhoto }, croppedDimensions);
};
//# sourceMappingURL=useExpoImageToolkit.js.map