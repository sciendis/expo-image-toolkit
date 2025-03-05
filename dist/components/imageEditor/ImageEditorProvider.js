import { useRef, useState } from "react";
import { useSharedValue } from "react-native-reanimated";
import { DefaultConfig, DefaultDimensionState, DefaultLayoutState, DefaultPositionState, } from "../../constants";
import { DE } from "../../locales";
import { ImageEditorContext } from "./ImageEditorContext";
export const ImageEditorProvider = function ({ image: initialImage, userConfig, children, }) {
    var _a;
    const boxScale = useSharedValue(DefaultPositionState);
    const boxPosition = useSharedValue(DefaultPositionState);
    const zoom = useSharedValue(1);
    const rotate = useSharedValue(0);
    const flipX = useSharedValue(0);
    const flipY = useSharedValue(0);
    const focalPoint = useSharedValue({ x: 0, y: 0 });
    const imagePosition = useSharedValue({ x: 0, y: 0 });
    const [offset, setOffset] = useState(DefaultPositionState);
    const [image, setImage] = useState(initialImage);
    const imageRef = useRef(null);
    const [containerLayout, setContainerLayout] = useState(DefaultLayoutState);
    const [imageLayout, setImageLayout] = useState(DefaultLayoutState);
    const [previousRotate, setPreviousRotate] = useState(0);
    const [activeEditor, setActiveEditor] = useState(null);
    const [isSaving, setIsSaving] = useState(false);
    const [exactImageDimensions, setExactImageDimensions] = useState(DefaultDimensionState);
    const locale = (_a = userConfig === null || userConfig === void 0 ? void 0 : userConfig.locale) !== null && _a !== void 0 ? _a : DefaultConfig.locale;
    let labels = Object.assign({}, DefaultConfig.labels);
    if (locale === "de")
        labels = Object.assign({}, DE);
    const mergedLabels = Object.assign(Object.assign({}, labels), ((userConfig === null || userConfig === void 0 ? void 0 : userConfig.labels) || {}));
    const config = Object.assign(Object.assign(Object.assign({}, DefaultConfig), userConfig), { labels: mergedLabels });
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