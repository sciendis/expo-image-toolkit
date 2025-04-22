import { useRef, useState } from 'react';
import { useSharedValue } from 'react-native-reanimated';
import { DefaultDimensionState, DefaultPositionState } from '../../constants';
import { ImageEditorContext } from '../../hooks/useImageEditorContext/ImageEditorContext';
import { getInitialEditor, setupConfig } from '../../utils';
export const ImageEditorProvider = function ({ image: initialImage, userConfig, children, }) {
    const boxScale = useSharedValue(DefaultPositionState);
    const boxPosition = useSharedValue(DefaultPositionState);
    const zoom = useSharedValue(1);
    const rotate = useSharedValue(0);
    const flipX = useSharedValue(0);
    const flipY = useSharedValue(0);
    const focalPoint = useSharedValue(DefaultPositionState);
    const imagePosition = useSharedValue(DefaultPositionState);
    const [image, setImage] = useState(initialImage);
    const imageRef = useRef(null);
    const config = setupConfig(userConfig);
    const defaultEditor = getInitialEditor(config);
    const [activeEditor, setActiveEditor] = useState(defaultEditor);
    const [previousRotate, setPreviousRotate] = useState(0);
    const [isSaving, setIsSaving] = useState(false);
    const [dimensions, setDimensions] = useState(DefaultDimensionState);
    const value = {
        config,
        image,
        setImage,
        imageRef,
        boxScale,
        boxPosition,
        rotate,
        previousRotate,
        setPreviousRotate,
        flipX,
        flipY,
        zoom,
        activeEditor,
        setActiveEditor,
        isSaving,
        setIsSaving,
        focalPoint,
        imagePosition,
        dimensions,
        setDimensions,
    };
    return (<ImageEditorContext.Provider value={value}>
      {children}
    </ImageEditorContext.Provider>);
};
//# sourceMappingURL=ImageEditorProvider.js.map