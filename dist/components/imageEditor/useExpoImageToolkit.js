import { useState } from 'react';
import { Modal } from 'react-native';
import { DefaultDimensionState } from '../../constants';
import { createPickImageLibrary, createSaveCroppedImage, createTakePhotoCamera, } from '../../utils';
import { ImageEditor } from './ImageEditor';
export const useExpoImageToolkit = function (userConfig) {
    const [originalImage, setOriginalImage] = useState(null);
    const [showEditor, setShowEditor] = useState(false);
    const [image, setImage] = useState(null);
    const [dimensions, setDimensions] = useState(Object.assign(Object.assign({}, DefaultDimensionState), { rotate: 0 }));
    const pickImage = createPickImageLibrary({
        setOriginalImage,
        setShowEditor,
        setImage,
    });
    const takePhoto = createTakePhotoCamera({
        setOriginalImage,
        setShowEditor,
        setImage,
    });
    const saveCroppedImage = createSaveCroppedImage({
        setDimensions,
        setImage,
        setShowEditor,
    });
    const onCancel = () => {
        var _a;
        setShowEditor(false);
        setImage(null);
        (_a = userConfig === null || userConfig === void 0 ? void 0 : userConfig.onCancel) === null || _a === void 0 ? void 0 : _a.call(userConfig);
    };
    const onCrop = (props) => {
        var _a;
        saveCroppedImage(props);
        (_a = userConfig === null || userConfig === void 0 ? void 0 : userConfig.onSubmit) === null || _a === void 0 ? void 0 : _a.call(userConfig, props.uri);
    };
    const ImageEditorModal = () => (<Modal visible={showEditor} animationType="slide" onRequestClose={onCancel}>
      <ImageEditor image={originalImage} onCrop={onCrop} onCancel={onCancel} userConfig={userConfig}/>
    </Modal>);
    const { width, height, rotate } = dimensions;
    const croppedDimensions = {
        width: (rotate % 180 === 90 ? height : width) || 250,
        height: (rotate % 180 === 90 ? width : height) || 250,
    };
    const aspectRatio = width / height;
    return Object.assign({ pickImage,
        image,
        aspectRatio,
        ImageEditorModal,
        takePhoto }, croppedDimensions);
};
//# sourceMappingURL=useExpoImageToolkit.js.map