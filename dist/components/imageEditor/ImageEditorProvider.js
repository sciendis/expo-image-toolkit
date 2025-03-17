import { useRef, useState } from 'react';
import { useSharedValue } from 'react-native-reanimated';
import { DefaultConfig, DefaultDimensionState, DefaultLayoutState, DefaultPositionState, } from '../../constants';
import { DE } from '../../locales';
import { ImageEditorContext } from './ImageEditorContext';
export const ImageEditorProvider = function ({ image: initialImage, userConfig, children, }) {
    var _a;
    const initialBoxPosition = useSharedValue(DefaultPositionState);
    const initialBoxScale = useSharedValue(DefaultPositionState);
    const boxScale = useSharedValue(DefaultPositionState);
    const boxPosition = useSharedValue(DefaultPositionState);
    const zoom = useSharedValue(1);
    const rotate = useSharedValue(0);
    const flipX = useSharedValue(0);
    const flipY = useSharedValue(0);
    const focalPoint = useSharedValue(DefaultPositionState);
    const imagePosition = useSharedValue(DefaultPositionState);
    const [offset, setOffset] = useState(DefaultPositionState);
    const [image, setImage] = useState(initialImage);
    const imageRef = useRef(null);
    const [containerLayout, setContainerLayout] = useState(DefaultLayoutState);
    const [imageLayout, setImageLayout] = useState(DefaultLayoutState);
    const [previousRotate, setPreviousRotate] = useState(0);
    const [activeEditor, setActiveEditor] = useState(null);
    const [isSaving, setIsSaving] = useState(false);
    const [exactImageDimensions, setExactImageDimensions] = useState(DefaultDimensionState);
    // locales
    const locale = (_a = userConfig === null || userConfig === void 0 ? void 0 : userConfig.locale) !== null && _a !== void 0 ? _a : DefaultConfig.locale;
    let labels = Object.assign({}, DefaultConfig.labels);
    if (locale === 'de')
        labels = Object.assign({}, DE);
    const mergedLabels = Object.assign(Object.assign({}, labels), ((userConfig === null || userConfig === void 0 ? void 0 : userConfig.labels) || {}));
    // colors
    const mergedColors = Object.assign(Object.assign({}, DefaultConfig.colors), ((userConfig === null || userConfig === void 0 ? void 0 : userConfig.colors) || {}));
    const config = Object.assign(Object.assign(Object.assign({}, DefaultConfig), userConfig), { labels: mergedLabels, colors: mergedColors });
    const value = {
        config,
        image,
        setImage,
        imageRef,
        initialBoxScale,
        initialBoxPosition,
        boxScale,
        boxPosition,
        rotate,
        previousRotate,
        setPreviousRotate,
        flipX,
        flipY,
        zoom,
        offset,
        setOffset,
        containerLayout,
        setContainerLayout,
        imageLayout,
        setImageLayout,
        activeEditor,
        setActiveEditor,
        isSaving,
        setIsSaving,
        focalPoint,
        imagePosition,
        exactImageDimensions,
        setExactImageDimensions,
    };
    return (<ImageEditorContext.Provider value={value}>
      {children}
    </ImageEditorContext.Provider>);
};
//# sourceMappingURL=ImageEditorProvider.js.map