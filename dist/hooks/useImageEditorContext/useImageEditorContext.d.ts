/// <reference types="react" />
export declare const useImageEditorContext: () => {
    config: import("../..").Config;
    image: string;
    setImage: import("react").Dispatch<import("react").SetStateAction<string>>;
    imageRef: import("react").RefObject<import("react-native").View>;
    dimensions: import("../..").Dimensions;
    setDimensions: import("react").Dispatch<import("react").SetStateAction<import("../..").Dimensions>>;
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
    activeEditor: import("../../constants").EditorModes;
    setActiveEditor: import("react").Dispatch<import("react").SetStateAction<import("../../constants").EditorModes>>;
    isSaving: boolean;
    setIsSaving: import("react").Dispatch<import("react").SetStateAction<boolean>>;
};
//# sourceMappingURL=useImageEditorContext.d.ts.map