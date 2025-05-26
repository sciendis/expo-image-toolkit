import { useRef, useState } from 'react';
import { useSharedValue } from 'react-native-reanimated';
import { DefaultDimensionState, DefaultPositionState } from '../../constants';
import { ImageEditorContext } from '../../hooks/useImageEditorContext/ImageEditorContext';
import { getInitialEditor, setupConfig } from '../../utils';
import { useUndoRedoSnapshot } from '../../hooks';
/**
 * @description This provider is not related to `ExpoImageToolkitProvider`.
 * While `ExpoImageToolkitProvider` is used to wrap the app at root level,
 * `ImageEditorProvider` handles all internal state of the image editor, such as crop frame scale/position, rotation, flip, and zoom.
 *
 * @param props - An object containing:
 * - `image`: `string` – The initial/original source of the image to be edited.
 * - `userConfig`: `UserConfig` (optional) – Optional user configuration for editor settings.
 * - `children`: `ReactNode` – The nested components that render the active editor container.
 *
 * @returns React provider for sharing image editor state via context.
 */
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
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [dimensions, setDimensions] = useState(DefaultDimensionState);
    const imageEditorContextValues = {
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
        isLoading,
        setIsLoading,
    };
    const undoRedoActions = useUndoRedoSnapshot(Object.assign({}, imageEditorContextValues));
    const contextValue = Object.assign(Object.assign(Object.assign({}, imageEditorContextValues), undoRedoActions), { config });
    return (<ImageEditorContext.Provider value={contextValue}>
      {children}
    </ImageEditorContext.Provider>);
};
//# sourceMappingURL=ImageEditorProvider.js.map