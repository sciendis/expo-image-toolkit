import {
  DefaultDimensionState,
  DefaultLayoutState,
  DefaultPositionState,
  EditorModes,
} from "@/constants";
import { Position } from "@/types";
import { ReactNode, useRef, useState } from "react";
import { useSharedValue } from "react-native-reanimated";
import { ImageEditorContext } from "./ImageEditorContext";

type Props = {
  image: string;
  children: ReactNode;
};

export const ImageEditorProvider = function ({
  image: initialImage,
  children,
}: Props) {
  const boxScale = useSharedValue<Position>(DefaultPositionState);
  const boxPosition = useSharedValue<Position>(DefaultPositionState);
  const zoom = useSharedValue(1);
  const rotate = useSharedValue(0);
  const flipX = useSharedValue(0);
  const flipY = useSharedValue(0);
  const focalPoint = useSharedValue({ x: 0, y: 0 });
  const imagePosition = useSharedValue<Position>({ x: 0, y: 0 });

  const [offset, setOffset] = useState(DefaultPositionState);
  const [image, setImage] = useState(initialImage);
  const imageRef = useRef(null);

  const [containerLayout, setContainerLayout] = useState(DefaultLayoutState);
  const [imageLayout, setImageLayout] = useState(DefaultLayoutState);

  const [previousRotate, setPreviousRotate] = useState(0);

  const [activeEditor, setActiveEditor] = useState<EditorModes | null>(null);

  const [isSaving, setIsSaving] = useState(false);

  const [exactImageDimensions, setExactImageDimensions] = useState(
    DefaultDimensionState
  );

  const value = {
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
