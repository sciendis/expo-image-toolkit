/// <reference types="react" />
export declare const useImageEditorContext: () => {
    config: import("../..").Config;
    image: string;
    setImage: import("react").Dispatch<import("react").SetStateAction<string>>;
    imageRef: import("react").RefObject<import("react-native").View>;
    boxScale: import("react-native-reanimated").SharedValue<import("../..").Position>;
    boxPosition: import("react-native-reanimated").SharedValue<import("../..").Position>;
    rotate: import("react-native-reanimated").SharedValue<number>;
    previousRotate: number;
    setPreviousRotate: import("react").Dispatch<import("react").SetStateAction<number>>;
    flipX: import("react-native-reanimated").SharedValue<number>;
    flipY: import("react-native-reanimated").SharedValue<number>;
    zoom: import("react-native-reanimated").SharedValue<number>;
    focalPoint: import("react-native-reanimated").SharedValue<import("../..").Position>;
    imagePosition: import("react-native-reanimated").SharedValue<import("../..").Position>;
    offset: import("../..").Position;
    setOffset: import("react").Dispatch<import("react").SetStateAction<import("../..").Position>>;
    containerLayout: import("../..").LayoutDimensions;
    setContainerLayout: import("react").Dispatch<import("react").SetStateAction<import("../..").LayoutDimensions>>;
    imageLayout: import("../..").LayoutDimensions;
    setImageLayout: import("react").Dispatch<import("react").SetStateAction<import("../..").LayoutDimensions>>;
    activeEditor: import("../../constants").EditorModes | null;
    setActiveEditor: import("react").Dispatch<import("react").SetStateAction<import("../../constants").EditorModes | null>>;
    isSaving: boolean;
    setIsSaving: import("react").Dispatch<import("react").SetStateAction<boolean>>;
    exactImageDimensions: import("../..").Dimensions;
    setExactImageDimensions: import("react").Dispatch<import("react").SetStateAction<import("../..").Dimensions>>;
};
//# sourceMappingURL=useImageEditorContext.d.ts.map