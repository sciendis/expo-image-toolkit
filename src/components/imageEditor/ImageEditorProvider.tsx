import {
  DefaultConfig,
  DefaultDimensionState,
  DefaultLayoutState,
  DefaultPositionState,
  EditorModes,
} from "@/constants";
import {
  Config,
  Dimensions,
  LayoutDimensions,
  Position,
  UserConfig,
} from "@/types";
import { ReactNode, useRef, useState } from "react";
import { useSharedValue } from "react-native-reanimated";
import { ImageEditorContext } from "./ImageEditorContext";
import { DE, EN } from "@/locales";

type Props = {
  image: string;
  userConfig?: UserConfig;
  children: ReactNode;
};

export const ImageEditorProvider = function ({
  image: initialImage,
  userConfig,
  children,
}: Props) {
  const boxScale = useSharedValue<Position>(DefaultPositionState);
  const boxPosition = useSharedValue<Position>(DefaultPositionState);
  const zoom = useSharedValue(1);
  const rotate = useSharedValue(0);
  const flipX = useSharedValue(0);
  const flipY = useSharedValue(0);
  const focalPoint = useSharedValue<Position>({ x: 0, y: 0 });
  const imagePosition = useSharedValue<Position>({ x: 0, y: 0 });

  const [offset, setOffset] = useState<Position>(DefaultPositionState);
  const [image, setImage] = useState(initialImage);
  const imageRef = useRef(null);

  const [containerLayout, setContainerLayout] =
    useState<LayoutDimensions>(DefaultLayoutState);
  const [imageLayout, setImageLayout] =
    useState<LayoutDimensions>(DefaultLayoutState);

  const [previousRotate, setPreviousRotate] = useState(0);

  const [activeEditor, setActiveEditor] = useState<EditorModes | null>(null);

  const [isSaving, setIsSaving] = useState(false);

  const [exactImageDimensions, setExactImageDimensions] = useState<Dimensions>(
    DefaultDimensionState
  );

  const locale = userConfig?.locale ?? DefaultConfig.locale;
  let labels = { ...DefaultConfig.labels };
  if (locale === "de") labels = { ...DE };
  const config: Config = { ...DefaultConfig, labels, ...userConfig };

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

  return (
    <ImageEditorContext.Provider value={value}>
      {children}
    </ImageEditorContext.Provider>
  );
};
